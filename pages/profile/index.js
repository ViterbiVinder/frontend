import Router from "next/router";
import withAuth from "../../utils/withAuth";

const Profile = ({ isAuthenticated }) => {
  const doRedirect = () => {
    if (isAuthenticated) {
      const username = localStorage.getItem("vinder-username");
      if (JSON.parse(username)) {
        Router.push(`/profile/${JSON.parse(username)}`);
      } else {
        Router.push("/404");
      }
    } else {
      Router.push("/404");
    }
  };
  return <> {process.browser && doRedirect()}</>;
};

export default withAuth(Profile);
