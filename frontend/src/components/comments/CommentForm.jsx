import { Avatar, Box, IconButton, Stack, TextField } from "@mui/material";
import { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import useCreateComment from "../../api/hooks/comments/useCreateComment";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";
// import EmojiPicker from "emoji-picker-react";
const CommentForm = ({ blog_id }) => {
  const commentRef = useRef();
  const queryClient = useQueryClient()
  const { isLoading, mutate, isError } = useCreateComment();

  const sendComment = () => {
    mutate(
      {
        blog_id: blog_id,
        data: {
          text: commentRef.current.value,
        },
      },
      {
        onSuccess: (data, variables, context) => {
          commentRef.current.value = "";
          queryClient.invalidateQueries(["comments", blog_id]);
        },
      }
    );
  };

  return (
    <Stack padding={3} justifyContent="end" pb={0}>
      <Stack flexDirection="row" gap={1} alignItems="center">
        <Box>
          <Avatar />
        </Box>
        <TextField
          name="comment"
          fullWidth
          inputRef={commentRef}
          maxRows={5}
          multiline
        />
        {/* <EmojiPicker /> */}
      </Stack>
      <Stack alignItems="end">
        <Box>
          <LoadingButton
            startIcon={<SendIcon />}
            loading={isLoading}
            onClick={sendComment}
          ></LoadingButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CommentForm;
