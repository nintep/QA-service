const encoder = new TextEncoder();
let controllers = new Set();


//send new question to all clients who are viewing the course page
const sendQuestion = async (question) => {
    console.log(question);
    
    const msg = encoder.encode(`data: ${JSON.stringify(question)}\n\n`);
    controllers.forEach((controller) => controller.enqueue(msg));
}

const handleControllerSetupRequest = async (request) => {
    let controller;

    const body = new ReadableStream({
        start(c) {
        controller = c;
        controllers.add(controller);
        },
        cancel() {
        controllers.delete(controller);
        },
    });

    return new Response(body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Access-Control-Allow-Origin": "*",
          "Connection": "keep-alive",
        },
      });
}

export { sendQuestion, handleControllerSetupRequest }