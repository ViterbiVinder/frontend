import Router, { useRouter } from 'next/router'
import fetch from 'node-fetch'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from 'next/link'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PostComp from '../../components/posts/post'
import { DEPLOYMENT } from "../../components/constants"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


export default function Post({ posts }) {
  const router = useRouter()
  const classes = useStyles()
  const postObjs = posts.body.posts

  if (posts.body.Error) {
  	return <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
  		<h3>{posts.body.Error}</h3>
      </div>
    </Container>
  }

  return <Container component="main" maxWidth="xs">
      <CssBaseline />
      {postObjs.map((e) =>
      	<PostComp key={e.id} date={e.date} name={e.AuthorName} text={e.Content} tags={e.Tags} />
      )}

    </Container>
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  const res = await fetch(`${DEPLOYMENT}api/posts_by_user?username=${params.id}`);
  const posts = await res.json() 

  return { props: { posts } }
}

