# Finding Gustavo

## Local Setup

*Finding Gustavo* is a static HTML web-app, so it doesn't include a web server. To run the game locally, you can use any HTTP server, such as the one bundled with Python:

```sh
cd ./via-gustavo # or whatever directory the code's in
cd web
python -m http.server # the game will be served at https://localhost:8000
```

To develop the JavaScript code, you can run the development build, which will automatically rebuild the JS bundles when the source code changes:

```sh
npm run dev
```