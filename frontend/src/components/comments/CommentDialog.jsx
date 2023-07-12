import { Dialog } from "@mui/material";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const CommentDialog = ({ isCommentDialogOpen, setCommentDialogOpen }) => {
  return (
    <Dialog
      open={isCommentDialogOpen}
      onClose={() => setCommentDialogOpen(false)}
      maxWidth='md'
    >
      <CommentForm/>
      <CommentList/>
    </Dialog>
  );
};

export default CommentDialog;
