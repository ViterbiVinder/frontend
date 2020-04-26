import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";

export default function Index() {
  if (process.browser) Router.push("/posts");
  return <div />;
}
