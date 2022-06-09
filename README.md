# Developer at Droppe - React refactoring task

## Following changes have been made

1. Provide app title in index.html because as per previous code initially the title appears to be React app before the scripts load in the browser then it changes to Droppe refractor app after script loaded.

2. Update Project structure 

3. Create Product interface explicitly in model.ts

4. Update fetch products api call

5. Optimize favClick function

6. Optimize onSubmit function

7. Destructure all required states and props

8. In className use dynamic string instead of join() as join use extra operation

9. Update props types in all components

10. Use of id as a key instead of index

11. Put ellipses if title is too long

12. Update target to es2015 from es5 to fix IterableIterator errors

13. Write test cases

## Available Scripts

To run the project first clone the repo by 

### `git clone https://github.com/mkpdev/droppe-refractor.git`

then install dependencies by 

### `yarn install`

Run the app in the development mode by 

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
