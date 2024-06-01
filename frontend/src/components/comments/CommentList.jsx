import { Stack } from "@mui/material";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  console.log(comments)
  return (
    <Stack padding={3} gap={2}>
      {comments.map((comment) => {
        return <Comment {...comment} />;
      })}
    </Stack>
  );
};

export default CommentList;
