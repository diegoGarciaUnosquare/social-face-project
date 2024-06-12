# SocialFaceProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running Cypress - E2E tests
In order to run the E2E tests, you need to run the following command:
 `npx cypress run`

This command will run all the cypress tests. If you want to run a specific test, you can use the following command:
 `npx cypress open`
This command will open the cypress interface, where you can select the browser upon the test will be run, along with
selecting the test that you want to run.

## Backend
The backend for this project is being mocked. This project implements "json-placeholder" as the backend. The data is being fetched from the following link: [json-placeholder](https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/)
[json-placeholder-feed-mock-backend](https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-feed-user-mock-backend)

## CI/CD Pipeline
CI/CD is being handle with GitHub Actions. The pipeline is triggered when a push is made to the main branch. 
 The pipeline is responsible for running the tests and deploying the application to the GitHub Pages.
 This option was chosen because it is a simple and free way to deploy the application, as well as being integrated with the repository.

 You can find the configuration of the pipeline in the file `.github/workflows/main.yml`.

 And you can find the deployed application in the link: [SocialFace](https://diegogarciaunosquare.github.io/social-face-project/)

 CI/CD pipeline runs: [runs](https://github.com/diegoGarciaUnosquare/social-face-project/actions/workflows/main.yml)

 ## Design
The UI Design for this app, has been made with Figma. You can find the design in the following link: [Figma Design](https://www.figma.com/design/tp9ugpTxLEOVx32KXj4FOx/social-face-project?node-id=11-1833&t=DnOaM1fxUYRI0QUv-0)