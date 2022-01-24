import { call, put, takeEvery } from "redux-saga/effects";
import { hideLoader, showLoader } from "./actions";
import { FETCH_POSTS, REQUEST_POSTS } from "./types";

export function* sagaWatcher() {
	yield takeEvery(REQUEST_POSTS, sagaWorker);
}

export function* sagaWorker() {
	yield put(showLoader());
    const payload = yield call(fetchPosts)
    yield put({type: FETCH_POSTS, payload})
    yield put(hideLoader())
}

async function fetchPosts() {
	const res = await fetch(
		"https://jsonplaceholder.typicode.com/posts?_limit=5"
	);
	return await res.json();
}
