import Router from 'next/router'

const Signout = async () => {
	localStorage.setItem("vinder-auth", false);
	Router.push('/')

	return <></>
}

export default Signout;