import { Box, Card, Container, Grid } from "@mui/material";
import GroupList from "../../components/groups/GroupList";
import PostList from "../../components/posts/PostList";
import UserInfo from "./UserInfo";
import useGetGroupsUserIn from "../../api/hooks/users/useGetGroupsUserIn";
import useGetUserInfo from "../../api/hooks/users/useGetUserInfo";
import { useParams } from "react-router-dom";
import useGetUserBlogs from "../../api/hooks/groups/useGetUserBlogs";
const Profile = () => {
  const { userId } = useParams();

  const {
    data: userInfo,
    isError: isUserInfoError,
    isLoading: isUserInfoLoading,
  } = useGetUserInfo({id:userId,config:{}});

  const {
    data: groups,
    isError: isGroupsError,
    isLoading: isGroupsLoading,
  } = useGetGroupsUserIn({ id: userId, options: {} });
  const {
    data: blogs,
    isError: isBlogsError,
    isLoading: isBlogsLoading,
  } = useGetUserBlogs({ id: userId, options: {} });

  return (
    <Container maxWidth="lg">
      <Grid container gap={1}>
        <Grid item xs={12}>
          {isUserInfoLoading ? (
            <>Loading...</>
          ) : (
            <UserInfo userInfo={userInfo.data} />
          )}
        </Grid>
        <Grid item xs={3} position="relative">
          <Box width="100%" position="relative">
            <Card sx={{ position: "fixed", top: "" }} elevation={1}>
              {isGroupsLoading ? (
                <>loading...</>
              ) : (
                <GroupList groups={groups.data.results} />
              )}
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {isBlogsLoading ? (
            <>loading...</>
          ) : (
            <PostList posts={blogs.data.results} />
          )}
        </Grid>
        <Box height="1000px"></Box>
      </Grid>
    </Container>
  );
};

export default Profile;
