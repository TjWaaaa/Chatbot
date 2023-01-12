import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { io } from 'socket.io-client';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import chatReducer from './store/reducers/Chatbot';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';

import AllChats from './pages/AllChats';
import ErrorPage from './pages/ErrorPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SocketHandler from './utils/socketApi';

export const socket = io('http://localhost:8000/', {
	reconnectionDelayMax: 10000,
	withCredentials: true,
});

const rootReducer = combineReducers({
	chatState: chatReducer,
});

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<SocketHandler>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<AllChats />} />
						<Route path="login" element={<SignIn />} />
						<Route path="register" element={<SignUp />} />
						<Route path="*" element={<ErrorPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</SocketHandler>
	</Provider>,
);
