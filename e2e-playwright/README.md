# Running end-to-end tests

The playwright end to end tests can be run with the command (while the development build is running)
`docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf`