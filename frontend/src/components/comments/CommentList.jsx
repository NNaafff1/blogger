import { Stack } from "@mui/material"
import Comment from "./Comment";

const CommentList = () => {
  return (
    <Stack padding={3} gap={2}>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Stack>
  );
}

export default CommentList