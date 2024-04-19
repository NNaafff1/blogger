import { Box, Card, Container, Grid, Skeleton } from "@mui/material";
import PostList from "../../components/posts/PostList";
import UserList from "../../components/users/UserList";
import PostForm from "../../components/posts/PostForm";
import { useParams } from "react-router-dom";
import useGetGroupBlogs from "../../api/hooks/blogs/useGetGroupBlogs";
import { useState } from "react";

const GroupPage = () => {
  const { groupId } = useParams();
  const [blogs, setBlogs] = useState({
    count: 0,
    page_size: 10,
    page: 1,
    results: [],
  });

  const { data, isLoading, error, isRefetching } = useGetGroupBlogs({
    id: groupId,
    params: {
      page_size: blogs.page_size,
    },
  });

  const handleViewMore = () => {
    setBlogs((prev) => ({ ...prev, page_size: prev.page_size + 10 }));
  };

  console.log(data?.data)

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
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "100px" }}
            />
          ) : (
            data?.data && <PostList posts={data?.data.results} />
            
          )}
          {blogs.count > blogs.page_size && (
            <LoadingButton
              loading={isRefetching}
              type="submit"
              variant="outlined"
              fullWidth
              onClick={handleViewMore}
            >
              show more
            </LoadingButton>
          )}
        </Grid>
        <Box height="1000px"></Box>
      </Grid>
    </Container>
  );
};

export default GroupPage;
