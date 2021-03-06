import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

import LinkedinIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";

import Post from "../../components/posts/post";

import { DEPLOYMENT } from "../../components/constants";
import fetch from "node-fetch";

const Profile = (props) => {
  return <ProfileView {...props} />;
};

const personalViewStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: 14,
    width: 50,
    height: 50,
    color: theme.palette.primary.main,
  },
  header: {
    fontSize: 48,
    marginBottom: 4,
    color: theme.palette.secondary.main,
  },
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 240,
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 200,
  },
  socialWrapper: {
    listStyleType: "none",
    margin: 0,
  },
  social: {
    borderTop: `1px solid ${theme.palette.secondary.main}`,
    marginTop: 4,
  },
}));

const ProfileView = ({ posts, profile }) => {
  const classes = personalViewStyles();

  if (!posts && !profile) {
    return (
      <div className={classes.root}>
        <main
          style={{ margin: "0 auto", transform: "scale(2)", marginTop: 50 }}
        >
          <CircularProgress color="primary" />
        </main>
      </div>
    );
  }
  const {
    name = "Max Leiter",
    username = "maxattack",
    bio = "I like my 201 team, gaming, baseball, and long walks on the beach (when it's not shelter in place)",
    avatar,
  } = profile.body;

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <h1 className={classes.header}>@{username}</h1>
                <Typography
                  style={{ maxWidth: "80%", marginLeft: 10, fontSize: 18 }}
                  variant="p"
                >
                  {bio}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Avatar
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                  src={avatar}
                ></Avatar>
                <Typography variant="h6" style={{ margin: "0 auto" }}>
                  {name}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {!posts.length && "You haven't posted yet!"}
                {posts.map((e) => (
                  <Post
                    key={e.id}
                    name={e.AuthorName}
                    date={e.date}
                    text={e.Content}
                    tags={e.tags}
                    avatar={e.Avatar}
                  />
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${DEPLOYMENT}api/posts_by_user?username=${params.id}`
  );
  const data = await res.json();

  let posts;
  if (!data.body) {
    posts = [];
  } else {
    posts =
      data.body.posts && data.body.posts.length
        ? data.body.posts.reverse()
        : data.body.posts;
  }

  const profileRes = await fetch(
    `${DEPLOYMENT}api/profile?username=${params.id}&_now_no_cache=1`
  );

  const profile = await profileRes.json();
  return { props: { posts, profile } };
}

export default Profile;
