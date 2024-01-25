<script>
    import { userUuid } from "../../stores/stores.js";

    export let questionId;

    let answerText = "";

    const submitAnswer = async () => {
        if (answerText.trim() === "") {
            return;
        }

        const data = {
            questionId: questionId,
            text: answerText.trim(),
            user: $userUuid,
        };

        const response = await fetch("http://localhost:7800/api/answers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 400) {
            alert(
                "Submission failed!\n(You must wait 60 seconds between submissions)"
            );
            return;
        }

        answerText = "";
    };
</script>

<div>
    <h2 class="text-2xl text-gray-700 font-serif font-medium mt-8 mb-2">
        Add an answer
    </h2>
    <div class="relative max-w-[600px]">
        <textarea
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px]
    px-3 py-2.5 font-sans text-sm font-normal
    text-emerald-700 outline outline-0
    border-2 border-emerald-200
    focus:border-emerald-300
    bg-slate-50"
            placeholder="Type your answer here"
            bind:value={answerText}
        />
        <button
            on:click={submitAnswer}
            class="bg-emerald-400 my-2 px-2 py-2 rounded-[4px] text-white"
        >
            Submit
        </button>
    </div>
</div>
