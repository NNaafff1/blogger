import { Stack } from "@mui/material";
import Post from "./Post";


function PostList({posts}) {


  
  

  return (
    <Stack gap={5}>
      {posts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </Stack>
  );
}

export default PostList;
