import { Avatar, Box, Grid, Stack, Typography, useTheme } from "@mui/material";

const UserInfo = () => {
  const theme = useTheme();
  return (
    <Stack
      flexDirection="row"
      mb="20px"
      alignItems="center"
      gap={5}
      
    >
      <Stack alignItems="center" justifyContent="center">
        <Avatar sx={{ width: 200, height: 200 }} />
      </Stack>
      <Stack gap={2}>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>
            username :
          </small>
          <Typography>AhmedGham</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>
            first name :
          </small>
          <Typography>Ahmed</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>
            last name :
          </small>
          <Typography>Ghamdhan</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <small style={{ color: theme.palette.primary.main }}>email :</small>
          <Typography>ahmed@gmail.com</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
