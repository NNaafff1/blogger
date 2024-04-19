import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateBlog from "../../api/hooks/blogs/useCreateBlog";
import { useParams } from "react-router-dom";
import { QueryClient, useQueryClient } from "react-query";

const postSchema = yup.object({
  text: yup.string().required(),
  image: yup
    .mixed()
    .test("is-image", "File must be an image", function (value) {
      if (this.parent.type === "file") {
        const fileType = value.type;
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        return validImageTypes.includes(fileType);
      }
      return true;
    })
    .test("is-max-size", "File must be less than 10MB", function (value) {
      if (this.parent.type === "file") {
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        return value.size <= maxSize;
      }
      return true;
    }),
});

const PostForm = () => {
  const postRef = useRef();
  const { groupId } = useParams();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const { data, mutate, isError, isLoading, isSuccess, error } = useCreateBlog({
    groupId,
  });

  const handleCreate = (data) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        // queryClient.setQueryData();
        queryClient.invalidateQueries(["group", groupId, "blogs", 10]);
      },
    });
  };

  return (
    <Container sx={{ marginBottom: 3 }}>
      <Stack gap={1} width={{ xs: "50%" }} margin="auto">
        <Controller
          control={control}
          name="text"
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              fullWidth
              inputRef={postRef}
              maxRows={5}
              minRows={3}
              multiline
              error={invalid}
              helperText={error?.message}
              label="Do you have any idea ?"
            />
          )}
        />

        <Stack justifyContent="flex-end" flexDirection="row" gap={2}>
          <Controller
            control={control}
            name="image"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                onChange={(e) => field.onChange(e.target.files[0])}
                type="file"
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <LoadingButton
            startIcon={<SendIcon />}
            loading={isLoading}
            variant="contained"
            onClick={handleSubmit(handleCreate)}
          >
            create
          </LoadingButton>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PostForm;
