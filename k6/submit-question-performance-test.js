import http from "k6/http";

export const options = {
    duration: "5s",
    vus: 10,
    summaryTrendStats: ["avg", "p(99)"]
};

export default function () {

  //load main page
  http.get("http://localhost:7800");

  //load course page -- Note: when running the test, ensure that the database has a course with this id
  http.get("http://localhost:7800/courses/1");

  const data = {
    courseId: 1,  //Note: when running the test, ensure that the database has a course with this id
    user: Math.floor(Math.random() * 100),
    text: 'To be or not to be??'
  };

  //submit question
  http.post(
    "http://localhost:7800/api/questions",
    JSON.stringify(data))
}