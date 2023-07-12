import { Box, Card, Container, Grid } from "@mui/material";
import GroupList from "../../components/groups/GroupList";
import PostList from "../../components/posts/PostList";
import UserInfo from "./UserInfo";
const Profile = () => {
  return (
    <Container maxWidth="lg">
      <Grid container gap={1}>
        <Grid item xs={12}>
          <UserInfo/>
        </Grid>
        <Grid item xs={3} position="relative">
          <Box width="100%" position="relative">
            <Card sx={{ position: "fixed", top: "" }} elevation={1}>
              <GroupList />
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

export default Profile;
