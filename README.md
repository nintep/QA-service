# QA service
*A fullstack project created for the Designing and Building Scalable Web Applications course.* 

## Project description

The project contains an application for a question-answer service that can be used for various courses. Using the application, the users can post questions and answers for specific courses as well as upvote posted questions and answers. Additionally, answers are automatically generated when users post new questions. 

The application is divided into two main parts: qa-api and qa-ui. The project also contains an llm-api for automatically generating answers to user's questions. The llm-api was provided by the course, and not set up by me.

### Tools used

The project uses the following tools:
- Docker Compose for handling backend and frontend systems in multiple containers
- Deno and PostgreSQL for managing the backend (qa-api)
- Flyway for database migrations
- k6 to test API performance
- NGINX for load balancing
- Astro, Svelte, and Tailwind CSS for building the frontend application (qa-ui)
- Playwright for end-to-end testing

### qa-api

The qa-api is the backend of the application, which manages information stored and generated on the server. It has the following properties:

- Database:
qa-api manages the storage of courses, questions, answers and information about upvotes. This information is stored in a PostgreSQL database, with which the api communicates using a database service. Test data is loaded into the database when the first request is made to the api.

- Llm-api:
When new questions are posted, qa-api asynchronically requests 3 automatically generated answers from a separate api, the llm-api. After receiving these answers, qa-api stores them in the database.

- Server-sent events:
When users are viewing course or question pages, new questions and answers get automatically added to the page without reloading, if other users post this content while the user is viewing the relevant page. This functionality is implemented as server-sent events.

- Limiting submissions:
One user can only submit a question or answer once every 60 seconds. The api keeps track of when users have made submissions, and rejects a submission if it is made too soon.

### qa-ui

The qa-ui manages the webpages the user uses to interact with the application. The qa-ui has the following pages:

- Main page:
Lists available courses and provides links to individual course pages.

- Course page:
Shows the name of the course, a form for posting new questions, and a list of questions for that course. Questions show their number of upvotes, and clicking a question moves the user to the question's page. Additionally, if the user has not voted for that question yet, each question has a 'vote' button.

- Question page:
Shows the question text, a form for posting new answers, and a list of answers for that course. Answers show their number of upvotes, and a 'vote' button the the user has not upvoted that answer yet.

Design decisions / general functionality:

- Questions and answers are ordered from most recently interacted with (time of creation or most recent upvote) to least recently interacted with. However, the question/answer lists are not resorted when the user upvotes an item, as this might make reading the list confusing

- Only twenty items fetched from qa-api at a time, and a new items are fetched from the server whenever the user scrolls to the bottom of the list (infinite scroll). Newly posted items from any users are automatically added to the top of the list without having to refresh the page. 

### Project confiqurations

The project has both a development and a production configuration. Currently, the production confiquration for qa-ui users a copy of the development dockerfile, as the UI uses server side rendering, the production configuration of which presented some difficulties.

## Running

The development build can be started with the commands 
`docker compose up`

The production build can be started with the command
`docker compose -f docker-compose.prod.yml up -d` 
and removed with the command
`docker compose down`

When it's running, the application can be accessed at http://localhost:7800/

The playwright end to end tests can be run with the command (while the development build is running)
`docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf`

The k6 performance tests can be run with the following commands in the /k6 folder:
`k6 run course-list-performance-test.js`
`k6 run course-page-performance-test.js`
`k6 run submit-question-performance-test.js`
`k6 run question-page-performance-test.js`
`k6 run submit-answer-performance-test.js`

