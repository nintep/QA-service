var recentSubmissions = {};

//how many seconds a user has to wait after submittin a question or answer before subitting again
const submitTimeout = 60;

const submissionMade = (user) => {
    recentSubmissions[user] = Date.now();
}

const checkIfCanSubmit = (user) => {
    const latestTime = recentSubmissions[user];
    if (!latestTime) {
        return true;
    }

    var secondsSinceSubmission = (Date.now() - latestTime) / 1000;
    if (secondsSinceSubmission <= submitTimeout) {
        return false;
    }

    return true;
}

export { submissionMade, checkIfCanSubmit }