<script>
    export let id;

    import QuestionForm from "./QuestionForm.svelte";
    import QuestionList from "./QuestionList.svelte";

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

    const fetchCourseInfo = async () => {
        const response = await fetch(`http://localhost:7800/api/courses/${id}`);
        if (response.status === 404) {
            return;
        }
        const res = await response.json();
        return res;
    };

    let coursePromise = fetchCourseInfo();
    let votesPromise = fetchVotes();
</script>

<div class="mx-8">
    {#await coursePromise}
        <p>Loading course information...</p>
    {:then courseInfo}
        {#if !courseInfo}
            <p>Course not found</p>
        {:else}
            <h1 class="text-4xl text-gray-700 font-serif font-medium my-8">
                {courseInfo.course.name}
            </h1>
            <QuestionForm courseId={id} />
            {#await votesPromise}
                <p>Loading questions...</p>
            {:then votesInfo}
                <QuestionList questions={courseInfo.questions} courseId={id} />
            {/await}
        {/if}
    {/await}
</div>
