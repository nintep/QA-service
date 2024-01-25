import { votedQuestions, votedAnswers, userUuid } from "../stores/stores";

const fetchVotes = async () => {

    const response = await fetch(
        `http://localhost:7800/api/upvotes/${$userUuid}`
    );
  
    const data = await response.json();
  
    console.log(data);
  
    //save -1 as first item to mark that initial data has been fetched
    $votedQuestions = [-1, ...data.questions];
    $votedAnswers = [-1, ...data.answers];
}

export { fetchVotes }
  