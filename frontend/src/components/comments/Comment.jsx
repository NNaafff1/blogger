import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

const Comment = () => {
  return (
    <Stack flexDirection="row" gap={1}>
      <Box>
        <Avatar />
      </Box>
      <Paper sx={{ pl: 1 }}>
        <Stack justifyContent="space-between">
          <Box padding={2} pl={0} pt={1} maxWidth="md" >
            <Typography width="md" sx={{wordWrap:'break-word',wordBreak:'break-all'}} >
              messi is the best player
              everff efcsx bvecdsxa bvfceds bvfcds bvecd bvfcedwsa vecdw bvecfds vfdcsx brvfdcsx bgrvfdcs bgvfdcsxjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkk 
            </Typography>
          </Box>
          <Box>
            <small>18:12am</small>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Comment;
