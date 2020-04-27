import Post from "../../components/posts/post";
import SimpleNavigation from "../../components/posts/navbar";
import React from "react";
import fetch from "node-fetch";
import Container from "@material-ui/core/Container";

import { DEPLOYMENT } from "../../components/constants";

const PostsPage = ({ posts, error }) => {
  if (!posts) {
    return (
      <Container style={{ left: "45%", position: "relative" }}>
        <h3>🤔</h3> <h4>There's no posts right now.</h4>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ margin: "0 auto", width: 400 }}>
        All posts made on Vinder sorted by most recent
      </div>
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
    </Container>
  );
};

// This gets called on every request
export async function getServerSideProps({ params }) {
  const res = await fetch(`${DEPLOYMENT}api/posts?_now_no_cache=1`);
  const body = await res.json();

  if (body.error) {
    return { props: { error: body.error } };
  }
  const posts = body.body.posts;

  return { props: { posts } };
}

export default PostsPage;
