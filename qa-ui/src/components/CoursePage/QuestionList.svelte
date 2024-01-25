<script>
    import { onMount } from "svelte";

    import QuestionListItem from "./QuestionListItem.svelte";
    import { votedQuestions } from "../../stores/stores.js";

    import { infiniteScroll } from "../../util/infiniteScroll.js";

    export let questions = [];
    export let courseId;

    let pageNumber = 0;
    let loading = false;
    let oldestQuestionFetched = false;

    let eventSource;

    //prepend newly added questions that are sent from the server
    onMount(() => {
        eventSource = new EventSource("/api/question-sse");
        eventSource.onmessage = (event) => {
            const newQuestion = JSON.parse(event.data);
            if (newQuestion.courseId == courseId) {
                questions = [newQuestion, ...questions];
            }
        };

        eventSource.onerror = (event) => {
            console.log(event);
        };

        return () => {
            if (eventSource.readyState === 1) {
                eventSource.close();
            }
        };
    });

    //fetch older questions with autoscroll
    const fetchMoreQuestions = async () => {
        //Don't try infinite scroll if no questions have been loaded yet, or the oldest question was aleady fetched
        if (questions.length === 0 || oldestQuestionFetched) {
            return;
        }

        try {
            loading = true;
            const data = {
                timestamp: questions[questions.length - 1].last_updated,
            };

            const response = await fetch(
                `http://localhost:7800/api/courses/${courseId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const jsonData = await response.json();
            questions = questions.concat(jsonData.questions);
            loading = false;

            if (jsonData.questions.length === 0) {
                oldestQuestionFetched = true;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const load = () => {
        setTimeout(() => {
            pageNumber = pageNumber + 1;
            fetchMoreQuestions();
        }, 300);
    };

    let elementRef = null;
    $: {
        if (elementRef) {
            infiniteScroll({ fetch: load, element: elementRef });
        }
    }
</script>

<h2 class="text-2xl text-gray-700 font-serif font-medium mt-8 mb-2">
    Questions
</h2>
{#if questions.length === 0}
    <p>No questions yet!</p>
{:else}
    <ul>
        {#each questions as question}
            <li>
                <QuestionListItem
                    {question}
                    showVoteButton={!$votedQuestions.includes(question.id)}
                />
            </li>
        {/each}
    </ul>
    <div class="box-shawdow text-base my-8">
        {#if loading}
            <h1>Loading more questions...</h1>
        {/if}
        <!-- ELEMENT OBSERVER -->
        {#if loading === false}
            {#if oldestQuestionFetched}
                <p bind:this={elementRef}>End of questions</p>
            {:else}
                <p bind:this={elementRef}>Loading more questions...</p>
            {/if}
        {/if}
    </div>
{/if}
