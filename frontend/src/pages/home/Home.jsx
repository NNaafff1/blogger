import { Box, Button, Card, Container, Grid, TextField } from "@mui/material";
import GroupList from "../../components/groups/GroupList";
import PostList from "../../components/posts/PostList";
import {} from "../../layout/Navbar";
import AddIcon from "@mui/icons-material/Add";
import LeftBar from "./LeftBar";
import useGetUserHomeBlogs from "../../api/hooks/blogs/useGetUserHomeBlogs";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  // const { data, isError, isLoading, error } = useGetUserHomeBlogs();
  return (
    <Container maxWidth="lg">
      <Grid container gap={1}>
        <Grid item xs={3} position="relative">
          <LeftBar />
        </Grid>
        <Grid item xs={6}>
          {/* {isLoading ? <>Loading...</> : <PostList posts={data.data} />} */}
        </Grid>
        <Box height="1000px"></Box>
      </Grid>
    </Container>
  );
};

export default Home;
