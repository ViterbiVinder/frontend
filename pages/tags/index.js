import React from "react";
import { TagCloud } from "react-tagcloud";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";

const TagsPage = () => {
  const [tags, setTags] = React.useState([]);

  const customRenderer = (tag, size, color) => {
    return (
      <Button
        color="primary"
        style={{ color, fontSize: size }}
        variant="text"
        key={tag.value}
      >
        {tag.value}
      </Button>
    );
  };

  React.useEffect(() => {
    const fetchTags = async () => {
      const result = await axios("/api/tags");

      const tagRes = [];
      if (!result.data.body.tags) {
        return <CircularProgress color="primary" />;
      }

      for (let i = 0; i < result.data.body.tags.length; i++) {
        if (result.data.body.tags[i].toString() == "") {
          continue;
        }
        tagRes.push({
          value: result.data.body.tags[i].toString().toUpperCase(),
          count: Math.random() * 100 + 1,
        });
      }

      setTags(tagRes);
    };

    fetchTags();
  }, []);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={3} style={{ width: 500 }}>
        <TagCloud
          minSize={18}
          maxSize={35}
          tags={tags}
          renderer={customRenderer}
          onClick={(tag) =>
            Router.push("/tags/[id]", `/tags/${tag.value.toLowerCase()}`)
          }
        />
      </Grid>
    </Grid>
  );
};

export default TagsPage;
