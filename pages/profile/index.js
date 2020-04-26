import Router from 'next/router';

const Profile = () => {
	const doRedirect = () => {
		if (process.browser) {
			const username = localStorage.getItem("vinder-username")
			if (JSON.parse(username)) {
				Router.push(`/profile/${JSON.parse(username)}`)
			} else {
				Router.push('/404');
			}
		}
	}
	return <> { doRedirect() }</>
}

export default Profile;