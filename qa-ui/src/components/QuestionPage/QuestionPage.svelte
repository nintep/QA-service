<script>
    export let id;

    import AnswerForm from "./AnswerForm.svelte";
    import AnswerList from "./AnswerList.svelte";

    import {
        votedQuestions,
        votedAnswers,
        userUuid,
    } from "../../stores/stores.js";

    //if user's votes have not been fetched yet, fetch them from API
    const fetchVotes = async () => {
        if ($votedQuestions.length !== 0) {
            return -1;
        }

        const response = await fetch(
            `http://localhost:7800/api/upvotes/${$userUuid}`
        );

        if (response.status === 404) {
            return;
        }

        const data = await response.json();

        //save -1 as first item to mark that initial data has been fetched
        $votedQuestions = [-1, ...data.questions.map((q) => q.question_id)];
        $votedAnswers = [-1, ...data.answers.map((a) => a.answer_id)];
    };

    const fetchQuestionInfo = async () => {
        const response = await fetch(
            `http://localhost:7800/api/questions/${id}`
        );

        if (response.status === 404) {
            return;
        }

        const res = await response.json();
        return res;
    };

    let questionPromise = fetchQuestionInfo();
    let votesPromise = fetchVotes();
</script>

<div class="mx-8">
    {#await questionPromise}
        <p>Loading question information...</p>
    {:then questionInfo}
        {#if !questionInfo}
            <p>Question not found</p>
        {:else}
            <div class="text-emerald-400 my-2">
                <a href="/courses/{questionInfo.question.course_id}"
                    >&#60; Back to course</a
                >
            </div>
            <h1 class="text-4xl text-gray-700 font-serif font-medium mb-8 mt-6">
                Question
            </h1>
            <p class="text-base">
                {questionInfo.question.question_text}
            </p>
            <AnswerForm questionId={id} />
            {#await votesPromise}
                <p>Loading answers...</p>
            {:then votesInfo}
                <AnswerList answers={questionInfo.answers} questionId={id} />
            {/await}
        {/if}
    {/await}
</div>
