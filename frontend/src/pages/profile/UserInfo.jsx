import { Avatar, Box, Grid, Stack, Typography, useTheme } from "@mui/material";

const UserInfo = ({userInfo}) => {
  const theme = useTheme();
  return (
    <Stack flexDirection="row" mb="20px" alignItems="center" gap={5}>
      <Stack alignItems="center" justifyContent="center">
        <Avatar sx={{ width: 200, height: 200 }} />
      </Stack>
      <Stack gap={2}>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>
            username :
          </small>
          <Typography>{userInfo?.username}</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>
            first name :
          </small>
          <Typography>{userInfo?.first_name}</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>
            last name :
          </small>
          <Typography>{userInfo?.last_name}</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>email :</small>
          <Typography>{userInfo?.email}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
