import { readable } from "svelte/store";
import { writable } from 'svelte/store';

let user = localStorage.getItem("userUuid");

const votedQuestions = writable([]);
const votedAnswers = writable([]);

if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
}

export const userUuid = readable(user);
export { votedQuestions, votedAnswers }


