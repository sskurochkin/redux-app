import React from "react";
import { render } from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'
import thunk from "redux-thunk";
import { sagaWatcher } from "./redux/sagas";
import App from "./App";
import { spamWordsMiddleware } from "./redux/middleware";

const saga = createSagaMiddleware()

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(spamWordsMiddleware, thunk, saga),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

saga.run(sagaWatcher)

render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
