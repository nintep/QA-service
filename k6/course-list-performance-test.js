import http from "k6/http";

export const options = {
    duration: "5s",
    vus: 10,
    summaryTrendStats: ["avg", "p(99)"]
};

export default function () {
  //load main page
  http.get("http://localhost:7800");
}