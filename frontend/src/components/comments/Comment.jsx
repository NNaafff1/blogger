import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const Comment = ({ text, create_at ,user}) => {
  dayjs.extend(relativeTime);

  return (
    <Stack flexDirection="row" gap={1}>
      <Box>
        <Avatar />
      </Box>
      <Paper sx={{ pl: 1, width: "100%" }}>
        <Stack justifyContent="space-between">
          <Box  pt={1} maxWidth="md">
            <Typography
              width="large"
              sx={{ wordWrap: "break-word", wordBreak: "break-all",fontWeight:"600" }}
            >
              {user.username}
            </Typography>
          </Box>
          <Box pr={2} pl={0} pt={0} maxWidth="md">
            <Typography
              width="md"
              sx={{ wordWrap: "break-word", wordBreak: "break-all" }}
            >
              {text}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize="12px">{dayjs(create_at).fromNow()}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Comment;
