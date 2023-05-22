# ZEPZ Frontend Task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Design Decisions

1. Separation of Concerns: The code is organized into different files and components, following a modular approach. This improves readability, maintainability, and reusability of the code.

2. Custom Hook: The useFetchData hook is created to handle the data fetching logic. It checks if the user data is available in the local storage and fetches it from the API if not. It also caches the data in local storage for future use. This approach optimizes performance by reducing unnecessary API calls.

3. Error Handling: The hook and components handle errors gracefully. If there is an error during data fetching, an error message is displayed. This improves the user experience by providing feedback in case of failures.

4. State Management: The useState hook is used to manage the state of user status (followed or blocked) and the selected user for the modal. This allows for efficient rendering and tracking of user actions.

5. Modal Component: The UserModal component is implemented using the react-modal library. It displays detailed user information in a modal window when a user's profile image is clicked. This enhances the user interface by providing a convenient way to view user details.

# Due to time constraints, there might be some improvements or additional features that could be implemented. For example:

1. Pagination: Currently, the app fetches a fixed number of users (pagesize=20) from the Stack Exchange API. Implementing pagination would allow loading and displaying more users as the user scrolls or on-demand.

2. Sorting and Filtering: Adding sorting and filtering options would enhance the user's ability to explore and find specific users based on reputation, location, or other criteria.
