import Router from 'next/router';

const Signout = () => {
	const doSignout = () => {
		if (process.browser) {
			localStorage.setItem("vinder-auth", false);
			localStorage.setItem("vinder-name", "");
			localStorage.setItem("vinder-username", "");
			Router.push('/')
		}
	}
	return <> { doSignout() }</>
}

export default Signout;