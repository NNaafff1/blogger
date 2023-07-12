import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";

const PostForm = () => {
    const postRef = useRef();


    const post = ()=>{

    }

  return (
    <Stack  gap={1} justifyContent="center" pb={0}>
      <Stack flexDirection="column" gap={1}>
        {/* <Typography>Do you have any idea ?</Typography> */}
        <TextField
          name="comment"
          fullWidth
          inputRef={postRef}
          maxRows={5}
          minRows={3}
          multiline
          label="Do you have any idea ?"
        />
      </Stack>
      <Stack alignItems="end">
        <Button startIcon={<SendIcon />} variant="contained">
          create
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostForm;
