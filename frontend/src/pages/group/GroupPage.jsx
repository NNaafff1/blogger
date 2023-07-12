import { Box, Card, Container, Grid } from "@mui/material";
import PostList from "../../components/posts/PostList";
import UserList from "../../components/users/UserList";
import PostForm from "../../components/posts/PostForm";

const GroupPage = () => {
  return (
    <Container maxWidth="lg">
      <PostForm/>
      <Grid container gap={1}>
        <Grid item xs={3} position="relative">
          <Box width="100%" position="relative">
            <Card sx={{ position: "fixed", top: "" }} elevation={1}>
              <UserList />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <PostList />
        </Grid>
        <Box height="1000px"></Box>
      </Grid>
    </Container>
  );
};

export default GroupPage;
