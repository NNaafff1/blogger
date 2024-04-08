import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography, useTheme } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateGroup from "../../api/hooks/groups/useCreateGroup";
import { useNavigate } from "react-router-dom";

const groupSchema = yup.object({
  name: yup
    .string()
    .required()
    .max(100, "name of group should not be more than 100 symbol")
    .min(3, "name of group should not be less than 3 symbol"),
});

const GroupForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(groupSchema),
  });

  // TODO handle errors

  const { isLoading, mutate, reset, data, isSuccess } = useCreateGroup();

  const handleCreateGroup = (data) => {
    mutate(data);
  };

  if (isSuccess) {
    reset();

    navigate(`/groups/${data.data.id}`);
  }

  return (
    <Stack
      sx={{
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography sx={{ color: theme.palette.primary.main, fontSize: "28px" }}>
        create group
      </Typography>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            {...field}
            label="name"
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
      <LoadingButton
        loading={isLoading}
        onClick={handleSubmit(handleCreateGroup)}
        variant="contained"
      >
        create
      </LoadingButton>
    </Stack>
  );
};

export default GroupForm;
