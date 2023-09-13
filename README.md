# Adomas Server List for the homework assignment

The App contains a Login, Logout and Server List pages. It's using these technologies for the most part:
* React 
* React Router 
* Redux Toolkit 
* RTK query 
* Tailwind 
* Vite 
* Vitest 
* Cypress 

Development is heavily opnionated so we can happily discuss the choices later on ;).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Starts the development server using Vite. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production using TypeScript Compiler (tsc) followed by Vite build. The built files will be in the `dist` directory.

### `npm run lint`

Lints the project using ESLint, checking all `.ts` and `.tsx` files. It reports unused disable directives and fails on any warnings.

### `npm run preview`

Allows you to preview the built project locally, mimicking a production setup.

### `npm run format`

Formats the codebase using Prettier, writing the changes directly to the files.

### `npm run format:check`

Checks the codebase's formatting with Prettier, ensuring consistency across the codebase without making any changes.

### `npm run test`

Runs the tests using Vite's test runner, Vitest.

### `npm run test:coverage`

Runs the tests using Vitest and also produces a coverage report.

## Cypress Testing

To run Cypress tests, you can use the following command:

### `npx cypress open`

This will open the Cypress Test Runner, where you can run your Cypress tests interactively.

You will have to run `npm run dev` on a seperate terminal.

If you aren't familiar with cypress, when opened, select 'E2E testing' and then Electron, then test suites should appear and you can watch them through the Cypress client

## Installing Dependencies

Before running any of the above scripts, make sure to install the necessary dependencies by running:

```sh
npm install
```

## Improvements

Software can always be improved the main parts I would focus on:

* Unit/Component tests should have some wrapper for the stores and routes.
* Login form leaves a lot to be desired, I moved out from being tied to the <form> but it turned out a bit worse.
* Server List currently has no paging or endless scroll, i think this could be up next.
* The routing seems a bit weird, I didn't want the login as the '/' route, but i think making a redirect isn't great for SEO.
* The design can definitely be polished a bit more, adding some configuration for primary or secondary colors.
* I tried out 100% test coverage, i think it is unsustainable.
* Right now `cleanup()` is needed for most of the tests, i know it should be called by default, so didn't get to the bottom of this issue.
