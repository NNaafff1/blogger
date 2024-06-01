import { Dialog, DialogContent, Typography } from "@mui/material";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import useCreateComment from "../../api/hooks/comments/useCreateComment";
import useListBlogComments from "../../api/hooks/comments/useListBlogComments";

const CommentDialog = ({
  isCommentDialogOpen,
  setCommentDialogOpen,
  blog_id,
}) => {
  console.log(blog_id);
  const { data, isLoading, isError } = useListBlogComments({ blog_id });
  return (
    <Dialog
      open={isCommentDialogOpen}
      onClose={() => setCommentDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <CommentForm blog_id={blog_id} />
      <DialogContent>
        {isLoading ? (
          <></>
        ) : data?.data?.results.length > 0 ? (
          <CommentList comments={data?.data?.results} />
        ) : (
          <Typography sx={{textAlign:"center"}}>No comments yet</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
