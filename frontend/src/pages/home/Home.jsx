import { Box, Button, Card, Container, Grid, TextField } from "@mui/material";
import GroupList from "../../components/groups/GroupList";
import PostList from "../../components/posts/PostList";
import {} from "../../layout/Navbar";
import AddIcon from "@mui/icons-material/Add";
import LeftBar from "./LeftBar";
import useGetUserHomeBlogs from "../../api/hooks/blogs/useGetUserHomeBlogs";
// import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState({
    count: 0,
    page_size: 10,
    page: 1,
    results: [],
  });

  const { data, isError, isLoading, error, isRefetching } = useGetUserHomeBlogs(
    {
      params: {
        page_size: blogs.page_size,
      },
    
    }
  );

  const handleViewMore = () => {
    setBlogs((prev) => ({ ...prev, page_size: prev.page_size + 10 }));
  };

  return (
    <Container maxWidth="lg">
      <Grid container gap={1}>
        <Grid item xs={3} position="relative">
          <LeftBar /> 
        </Grid>
        <Grid item xs={6}>
         {isLoading ? <>Loading...</> : <PostList posts={data.data.results} />}
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

export default Home;
