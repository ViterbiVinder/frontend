import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from 'next/link';

import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs({ activePage }) {
  const classes = useStyles();
  const router = useRouter();

  const value = router.pathname === '/signup' ? 0 : 1;

  return (
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Link href="/signup"><Tab label="Sign up"></Tab></Link>
        <Link href="/signin"><Tab label="Sign in"></Tab></Link>
      </Tabs>
  );
}