import { Avatar, Box,  IconButton, Stack, TextField } from "@mui/material";
import { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
const CommentForm = () => {
  const commentRef = useRef();

  const sendComment = () => {
    console.log(commentRef.current.value);
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
      </Stack>
      <Stack alignItems="end">
        <Box>
          <IconButton onClick={sendComment}>
            <SendIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CommentForm;
