import { sql } from "../database/database.js";

const clearAll = async () => {
    console.log("Clearing all database tables");
    await sql`DELETE FROM answer_upvotes`;
    await sql`DELETE FROM question_upvotes`;
    await sql`DELETE FROM answers`;
    await sql`DELETE FROM questions`;
    await sql`DELETE FROM courses`;
}

//Courses
/* 
TABLE courses (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);
 */

const findCourse = async (id) => {
    return await sql`SELECT * FROM courses WHERE id = ${id};`;
}

const findCourses = async () => {
    return await sql`SELECT * FROM courses;`;
}

const addCourse = async (course) => {
    //console.log(`qaService -- Adding course ${course.name}`);
    return await sql`INSERT INTO courses (name) VALUES (${course.name}) RETURNING id;`
}

//Questions

/* 
TABLE questions (
	id SERIAL PRIMARY KEY,
	course_id INTEGER REFERENCES courses(id),
	question_text TEXT NOT NULL,
	user_uuid TEXT NOT NULL,
	upvotes INTEGER NOT NULL DEFAULT 0,
	last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 
*/

const findQuestion = async (id) => {
    return await sql`SELECT * FROM questions WHERE id = ${id};`;
}

const findQuestions = async () => {
    return await sql`SELECT * FROM questions;`;
}

const findQuestionsForCourse = async (courseId) => {
    return await sql`SELECT * FROM questions WHERE course_id = ${courseId};`;
}

const findLatestQuestionsForCourse = async (courseId, questionAmount, mostRecentTimestamp) => {
    if (!mostRecentTimestamp) {
        return await sql`SELECT * FROM questions 
                        WHERE course_id = ${courseId} AND last_updated < NOW()
                        ORDER BY last_updated DESC
                        LIMIT ${questionAmount};`;
    }

    return await sql`SELECT * FROM questions 
                        WHERE course_id = ${courseId} AND last_updated < ${mostRecentTimestamp}
                        ORDER BY last_updated DESC
                        LIMIT ${questionAmount};`;
}

const addQuestion = async (question) => {
    return await sql`INSERT INTO questions (course_id, question_text, user_uuid) VALUES (${question.courseId}, ${question.text}, ${question.user}) RETURNING id, last_updated;`
}

//Answers
/* 
TABLE answers (
	id SERIAL PRIMARY KEY,
	question_id INTEGER REFERENCES questions(id),
	answer_text TEXT NOT NULL,
	user_uuid TEXT NOT NULL,
	upvotes INTEGER NOT NULL DEFAULT 0,
	last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()	
);
 */

const findAnswer = async (id) => {
    return await sql`SELECT * FROM answers WHERE id = ${id};`;
}

const findAnswers = async () => {
    return await sql`SELECT * FROM answers;`;
}

const findAnswersForQuestion = async (questionId) => {
    return await sql`SELECT * FROM answers WHERE question_id = ${questionId};`;
}

const findLatestAnswersForQuestion = async (questionId, answerAmount, mostRecentTimestamp) => {
    if (!mostRecentTimestamp) {
        return await sql`SELECT * FROM answers 
                        WHERE question_id = ${questionId} AND last_updated < NOW()
                        ORDER BY last_updated DESC
                        LIMIT ${answerAmount};`;
    }

    return await sql`SELECT * FROM answers 
                        WHERE question_id = ${questionId} AND last_updated < ${mostRecentTimestamp}
                        ORDER BY last_updated DESC
                        LIMIT ${answerAmount};`;
}

const addAnswer = async (answer) => {
    return await sql`INSERT INTO answers (question_id, answer_text, user_uuid) VALUES (${answer.questionId}, ${answer.text}, ${answer.user}) RETURNING id, last_updated;`
}

//upvotes
/* 
TABLE question_upvotes (
	question_id INTEGER REFERENCES questions(id),
	user_uuid TEXT NOT NULL,
	upvote_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	PRIMARY KEY (answer_id, user_uuid)	
);

TABLE answer_upvotes (
	answer_id INTEGER REFERENCES answers(id),
	user_uuid TEXT NOT NULL,
	upvote_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	PRIMARY KEY (answer_id, user_uuid)
);
*/

const upvoteQuestion = async (id, userId) => {

    //check if user has already voted for this question
    const existingVote = await sql`SELECT * FROM question_upvotes WHERE question_id = ${id} AND user_uuid = ${userId};`;

    if (existingVote.length !== 0) {
        return false;
    }

    await sql`INSERT INTO question_upvotes (question_id, user_uuid) VALUES (${id}, ${userId});`

    await sql`UPDATE questions 
                      SET upvotes = upvotes + 1,
                        last_updated = NOW()
                      WHERE id = ${id}`

    return true;
}

const upvoteAnswer = async (id, userId) => {

    await sql`INSERT INTO answer_upvotes (answer_id, user_uuid) VALUES (${id}, ${userId});`

    return await sql`UPDATE answers
                      SET upvotes = upvotes + 1,
                        last_updated = NOW()
                      WHERE id = ${id}`
}

const findUpvotesForUser = async (userId) => {
    const questions = await sql`SELECT question_id FROM question_upvotes WHERE user_uuid = ${userId};`;
    const answers = await sql`SELECT answer_id FROM answer_upvotes WHERE user_uuid = ${userId};`;

    const res = {
        questions: questions,
        answers: answers
    }

    return res;
}

export { findCourse, findCourses, addCourse,
            findQuestion, findQuestions, findQuestionsForCourse, addQuestion, findLatestQuestionsForCourse,
            findAnswer, findAnswers, findAnswersForQuestion, addAnswer, findLatestAnswersForQuestion,
            upvoteQuestion, upvoteAnswer, findUpvotesForUser,
            clearAll }


