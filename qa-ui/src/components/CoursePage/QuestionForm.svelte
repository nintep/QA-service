<script>
    import { userUuid } from "../../stores/stores.js";

    export let courseId;

    let questionText = "";

    const submitQuestion = async () => {
        if (questionText.trim() === "") {
            return;
        }

        const data = {
            courseId: courseId,
            text: questionText.trim(),
            user: $userUuid,
        };

        const response = await fetch("http://localhost:7800/api/questions", {
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

        questionText = "";
    };
</script>

<div>
    <h2 class="text-2xl text-gray-700 font-serif font-medium mt-8 mb-2">
        Ask a question
    </h2>
    <div class="relative max-w-[600px]">
        <textarea
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px]
    px-3 py-2.5 font-sans text-sm font-normal
    text-emerald-700 outline outline-0
    border-2 border-emerald-200
    focus:border-emerald-300
    bg-slate-50"
            placeholder="Type your question here"
            bind:value={questionText}
        />
        <button
            on:click={submitQuestion}
            class="bg-emerald-400 my-2 px-2 py-2 rounded-[4px] text-white"
        >
            Submit
        </button>
    </div>
</div>
