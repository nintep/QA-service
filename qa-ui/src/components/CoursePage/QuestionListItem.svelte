<script>
    export let question;
    export let showVoteButton;

    import { userUuid } from "../../stores/stores.js";

    const upvote = async () => {
        const data = {
            id: question.id,
            user: $userUuid,
        };

        const response = await fetch(
            "http://localhost:7800/api/questions/upvote",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        showVoteButton = false;
        question.upvotes += 1;
    };
</script>

<div
    class="border-2 rounded my-4 max-w-[800px] border-emerald-300 flex flex-row"
>
    <div
        class="bg-emerald-300 basis-1/12 flex flex-row text-4xl font-serif text-white items-center justify-center"
    >
        <a href="/questions/{question.id}">&#62;</a>
    </div>
    <p class="my-4 ml-3 basis-8/12">
        <a href="/questions/{question.id}">{question.question_text}</a>
    </p>
    <span
        class="flex flex-row text-base items-center justify-end mx-2 basis-3/12"
    >
        {#if showVoteButton}
            <button
                on:click={upvote}
                class="bg-emerald-400 my-2 mr-1 px-1 py-1 rounded-[4px] text-white"
            >
                Vote
            </button>
        {/if}
        ({question.upvotes} votes)
    </span>
</div>
