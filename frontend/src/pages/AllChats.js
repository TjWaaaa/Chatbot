import React, { useState, useLayoutEffect, useEffect } from 'react';

import ChatsDesktop from '../components/ChatsDesktop';
import ChatsMobile from '../components/ChatsMobile';

import { chatData } from '../demoData/chatDemo';
import { isAuthenticated } from '../utils/api';
import NotSignedInPage from './NotSignedInPage';

async function checkIsAuthenticated() {
	try {
		let response = await isAuthenticated();
		console.log(response);
		return response.status;
	} catch (e) {
		const errorMessage = e.response.data;
		console.log(errorMessage);
		return 401;
	}
}

function Index() {
	const [isMobile, setIsMobile] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(undefined);

	useLayoutEffect(() => {
		document.body.style.overflow = 'hidden';
		function updateSize() {
			setIsMobile(window.innerWidth <= 800);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	useEffect(() => {
		checkAccess();
	}, []);
	async function checkAccess() {
		const status = await checkIsAuthenticated();
		console.log(status);
		if (status === 200) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
			window.location.href = window.location.href + 'login';
		}
	}
	if (isLoggedIn === undefined) {
		return <p>Loading</p>;
	} else if (isLoggedIn) {
		return <>{isMobile ? <ChatsMobile chatData={chatData} /> : <ChatsDesktop chatData={chatData} />}</>;
	} else {
		return <></>
	}
}

export default Index;
