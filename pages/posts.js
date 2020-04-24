import Posts from "../components/posts/"
import SimpleNavigation from "../components/posts/navbar";
import SearchBar from "../components/tags/searchbar";
import React from "react";

const PostsPage = () => {
	return <> <SearchBar/> <SimpleNavigation /> <Posts /> </>
}

export default PostsPage;