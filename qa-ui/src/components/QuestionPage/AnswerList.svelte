<script>
    import { onMount } from "svelte";

    import AnswerListItem from "./AnswerListItem.svelte";
    import { votedAnswers } from "../../stores/stores.js";

    import { infiniteScroll } from "../../util/infiniteScroll.js";

    export let answers = [];
    export let questionId;

    let pageNumber = 0;
    let loading = false;
    let oldestAnswerFetched = false;

    let eventSource;

    //prepend newly added questions that are sent from the server
    onMount(() => {
        eventSource = new EventSource("/api/answer-sse");
        eventSource.onmessage = (event) => {
            const newAnswer = JSON.parse(event.data);
            if (newAnswer.question_id == questionId) {
                answers = [newAnswer, ...answers];
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
    const fetchMoreAnswers = async () => {
        //Don't try infinite scroll if no questions have been loaded yet, or the oldest question was aleady fetched
        if (answers.length === 0 || oldestAnswerFetched) {
            return;
        }

        try {
            loading = true;
            const data = {
                timestamp: answers[answers.length - 1].last_updated,
            };

            const response = await fetch(
                `http://localhost:7800/api/questions/${questionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const jsonData = await response.json();

            answers = answers.concat(jsonData.answers);
            loading = false;

            if (jsonData.answers.length === 0) {
                oldestAnswerFetched = true;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const load = () => {
        setTimeout(() => {
            pageNumber = pageNumber + 1;
            fetchMoreAnswers();
        }, 300);
    };

    let elementRef = null;
    $: {
        if (elementRef) {
            infiniteScroll({ fetch: load, element: elementRef });
        }
    }
</script>

<h2 class="text-2xl text-gray-700 font-serif font-medium mt-8 mb-2">Answers</h2>
{#if answers.length === 0}
    <p>No answers yet!</p>
{:else}
    <ul>
        {#each answers as answer}
            <li>
                <AnswerListItem
                    {answer}
                    showVoteButton={!$votedAnswers.includes(answer.id)}
                />
            </li>
        {/each}
    </ul>
    <div class="box-shawdow text-base my-8">
        {#if loading}
            <h1>Loading more answers...</h1>
        {/if}
        <!-- ELEMENT OBSERVER -->
        {#if loading === false}
            {#if oldestAnswerFetched}
                <p bind:this={elementRef}>End of answers</p>
            {:else}
                <p bind:this={elementRef}>Loading more answers...</p>
            {/if}
        {/if}
    </div>
{/if}
