import { Box, Card, Container, Grid } from "@mui/material";
import PostList from "../../components/posts/PostList";
import UserList from "../../components/users/UserList";
import PostForm from "../../components/posts/PostForm";
import { useParams } from "react-router-dom";
import useGetGroupBlogs from "../../api/hooks/blogs/useGetGroupBlogs";

const GroupPage = () => {
  const { groupId } = useParams();
  const { data, isLoading, error } = useGetGroupBlogs(groupId);

  return (
    <Container maxWidth="lg">
      <PostForm />
      <Grid container gap={1}>
        <Grid item xs={3} position="relative">
          <Box width="100%" position="relative">
            <Card sx={{ position: "fixed", top: "" }} elevation={1}>
              <UserList />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {data?.data && <PostList posts={data?.data} />}
        </Grid>
        <Box height="1000px"></Box>
      </Grid>
    </Container>
  );
};

export default GroupPage;
