import Router, { useRouter } from "next/router";
import fetch from "node-fetch";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PostComp from "../../components/posts/post";
import { DEPLOYMENT } from "../../components/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Tag({ posts }) {
  const router = useRouter();
  const classes = useStyles();
  if (!posts.body) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h3>
            No posts were found with{" "}
            <Button variant="contained" color="primary">
              {router.query.id}
            </Button>{" "}
            :(
          </h3>
        </div>
      </Container>
    );
  }
  if (posts.body.Error) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h3>{posts.body.Error}</h3>
        </div>
      </Container>
    );
  }

  const postObjs = posts.body.posts.reverse();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h5" style={{ marginLeft: 24 }}>
        Posts with the tag{" "}
        <Button variant="contained" color="primary">
          {router.query.id}
        </Button>
      </Typography>
      {postObjs.reverse().map((e) => (
        <PostComp
          key={e.id}
          date={e.date}
          name={e.AuthorName}
          text={e.Content}
          tags={e.tags}
        />
      ))}
    </Container>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${DEPLOYMENT}api/tags?name=${params.id}&_now_no_cache=1`
  );
  const posts = await res.json();

  return { props: { posts } };
}
