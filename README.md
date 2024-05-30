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

## Running end-to-end tests

Section in construction. More information soon.

## CI/CD Pipeline
CI/CD is being handle with GitHub Actions. The pipeline is triggered when a push is made to the main branch. 
 The pipeline is responsible for running the tests and deploying the application to the GitHub Pages.
 This option was chosen because it is a simple and free way to deploy the application, as well as being integrated with the repository.

 You can find the configuration of the pipeline in the file `.github/workflows/main.yml`.

 And you can find the deployed application in the link: [SocialFace](https://diegogarciaunosquare.github.io/social-face-project/)

 CI/CD pipeline runs: [runs](https://github.com/diegoGarciaUnosquare/social-face-project/actions/workflows/main.yml)