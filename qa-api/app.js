import * as qaService from "./services/qaService.js"
import * as userSubmissionTimeService from "./services/userSubmissionTimeService.js"
import * as testDataService from "./services/testDataService.js"
import * as questionSseUtil from "./util/questionSseUtil.js"
import * as answerSseUtil from "./util/answerSseUtil.js"

import { serve } from "./deps.js";

let testDataInserted = false;

//how many questions and answers are fetched at once
const questionFetchAmount = 20;
const answerFetchAmount = 20;

const handleRequest = async (request) => {

  //insert test data if there are no courses in the database
  if (!testDataInserted) {
    const courses = await qaService.findCourses();
    if (courses.length === 0) {
      await testDataService.addTestData();
      testDataInserted = true;
    }
  }

  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  return await mapping.fn(request, mappingResult);
};

const getLLMAnswer = async(question) => {

  const data = {
    question: question.text,
  }

  const llmResponse = await fetch("http://llm-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const llmData = await llmResponse.json();

  const answer = {
    questionId: question.id,
    user: -1,
    text: llmData[0].generated_text,
  }

  const addResult = await qaService.addAnswer(answer)

  //Answer data that will be sent to clients
  const clientAnswerData = {
    id: addResult[0].id,
    question_id: question.id,
    answer_text: llmData[0].generated_text,
    last_updated: addResult[0].last_updated,
    upvotes: 0
  }

  answerSseUtil.sendAnswer(clientAnswerData);

  return new Response("OK", { status: 200 });
}

//temp
const initTestData = async (request) => {
  await testDataService.addTestData();
  return new Response("OK", { status: 200 });
} 

const handleGetCourseList = async (request) => {
  const courses = await  qaService.findCourses();

  return Response.json(courses);
}

//fetch twenty latest questions
const handleGetCourseQuestions = async (request, urlPatternResult) => {

  const courseId = urlPatternResult.pathname.groups.course;

  //find course
  const course = await qaService.findCourse(courseId);
  if (course.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  //find questions
  let questions = await qaService.findLatestQuestionsForCourse(courseId, questionFetchAmount, null);

  //remove extra info, such as user ids, before sending to client
  const filteredQuestions = questions.map(({user_uuid, ...question}) => question);

  const response = {
    course: course[0],
    questions: filteredQuestions
  }

  return Response.json(response);
}

const handleGetQuestionsWithTimestamp = async (request, urlPatternResult) => {

  const courseId = urlPatternResult.pathname.groups.course;
  const timestampData = await request.json();

  if (!timestampData.timestamp) {
    return new Response("Bad Request", { status: 400 });
  }

  //find course
  const course = await qaService.findCourse(courseId);
  if (course.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  //find next set of questions
  let questions = await qaService.findLatestQuestionsForCourse(courseId, questionFetchAmount, timestampData.timestamp);

  //remove extra info, such as user ids, before sending to client
  const filteredQuestions = questions.map(({user_uuid, ...question}) => question);

  const response = {
    questions: filteredQuestions
  }

  return Response.json(response);
  
}

//fetch question and twenty latest answers
const handleGetQuestionInfo = async (request, urlPatternResult) => {

  const questionId = urlPatternResult.pathname.groups.question;

  //find question
  const question = await qaService.findQuestion(questionId)
  if (question.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  //find answers
  let answers = await await qaService.findLatestAnswersForQuestion(questionId, answerFetchAmount, null);
  answers.sort((a,b) => {
    return b.last_updated - a.last_updated;
  })

  const filteredAnswers = answers.map(({user_uuid, ...answer}) => answer);

  const response = {
    question: question[0],
    answers: filteredAnswers
  }

  return Response.json(response);
}

const handleGetAnswersWithTimestamp = async (request, urlPatternResult) => {

  const questionId = urlPatternResult.pathname.groups.question;
  const timestampData = await request.json();

  if (!timestampData.timestamp) {
    return new Response("Bad Request", { status: 400 });
  }

  //find course
  const course = await qaService.findQuestion(questionId);
  if (course.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  //find next set of questions
  let answers = await qaService.findLatestAnswersForQuestion(questionId, answerFetchAmount, timestampData.timestamp);

  //remove extra info, such as user ids, before sending to client
  const filteredAnswers = answers.map(({user_uuid, ...answer}) => answer);

  const response = {
    answers: filteredAnswers
  }

  return Response.json(response);
  
}

const handleAddQuestion = async (request) => {

  const questionData = await request.json();

  if (!questionData.courseId || !questionData.text || !questionData.user) {
    return new Response("Bad Request", { status: 400 });
  }

  //check if user is allowed to make a submission
  const submissionAllowed = userSubmissionTimeService.checkIfCanSubmit(questionData.user);
  if (!submissionAllowed) {
    console.log("Tried to submit too soon!");
    return new Response("Bad Request", { status: 400 });
  }
  
  const addResult = await qaService.addQuestion(questionData);
  userSubmissionTimeService.submissionMade(questionData.user);
  
  const response = {
    id: addResult[0].id
  }

  //question data that will be sent to clients
  const clientQuestionData = {
    id: addResult[0].id,
    courseId: questionData.courseId,
    question_text: questionData.text,
    last_updated: addResult[0].last_updated,
    upvotes: 0
  }

  //generate 3 llm answers to the question
  getLLMAnswer({...questionData, id: addResult[0].id});
  getLLMAnswer({...questionData, id: addResult[0].id});
  getLLMAnswer({...questionData, id: addResult[0].id});

  //send question as a server-sent event
  questionSseUtil.sendQuestion(clientQuestionData)

  return Response.json(response);
}

const handleAddAnswer = async (request) => {

  const answerData = await request.json();

  if (!answerData.questionId || !answerData.text || !answerData.user) {
    return new Response("Bad Request", { status: 400 });
  }

  //check if user is allowed to make a submission
  const submissionAllowed = userSubmissionTimeService.checkIfCanSubmit(answerData.user);
  if (!submissionAllowed) {
    console.log("Tried to submit too soon!");
    return new Response("Bad Request", { status: 400 });
  }
  
  const addResult = await qaService.addAnswer(answerData);
  userSubmissionTimeService.submissionMade(answerData.user);
  
  const response = {
    id: addResult[0].id
  }

  //Answer data that will be sent to clients
  const clientAnswerData = {
    id: addResult[0].id,
    question_id: answerData.questionId,
    answer_text: answerData.text,
    last_updated: addResult[0].last_updated,
    upvotes: 0
  }

  answerSseUtil.sendAnswer(clientAnswerData);

  return Response.json(response);
}

const handleUpvoteQuestion = async (request) => {

  const questionData = await request.json();
  if (!questionData.id || !questionData.user) {
    return new Response("Bad Request", { status: 400 });
  }

  const upvoteResult = await qaService.upvoteQuestion(questionData.id, questionData.user);

  if (upvoteResult) {
    return new Response("OK", { status: 200 });
  } else {
    return new Response("Bad Request", { status: 400 });
  }
}

const handleUpvoteAnswer = async (request) => {

  const answerData = await request.json();
  if (!answerData.id || !answerData.user) {
    return new Response("Bad Request", { status: 400 });
  }

  const upvoteResult = await qaService.upvoteAnswer(answerData.id, answerData.user);

  if (upvoteResult) {
    return new Response("OK", { status: 200 });
  } else {
    return new Response("Bad Request", { status: 400 });
  }
}

const handleGetUpvotesForUser = async (request, urlPatternResult) => {

  const userId = urlPatternResult.pathname.groups.user;

  const voteData = await qaService.findUpvotesForUser(userId);

  return Response.json(voteData);
}

const urlMapping = [
  { //reset database
    method: "GET",
    pattern: new URLPattern({ pathname: "/init" }),
    fn: initTestData,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses" }),
    fn: handleGetCourseList,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:course" }),
    fn: handleGetCourseQuestions,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/courses/:course" }),
    fn: handleGetQuestionsWithTimestamp,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/questions" }),
    fn: handleAddQuestion,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/questions/upvote" }),
    fn: handleUpvoteQuestion,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/questions/:question" }),
    fn: handleGetQuestionInfo,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/questions/:question" }),
    fn: handleGetAnswersWithTimestamp,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/answers" }),
    fn: handleAddAnswer,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/answers/upvote" }),
    fn: handleUpvoteAnswer,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/upvotes/:user" }),
    fn: handleGetUpvotesForUser,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/question-sse" }),
    fn: questionSseUtil.handleControllerSetupRequest,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/answer-sse" }),
    fn: answerSseUtil.handleControllerSetupRequest,
  },
];


const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);