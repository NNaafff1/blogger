import { Box, Button, Card, Container, Grid, TextField, useTheme } from "@mui/material";
import GroupList from "../../components/groups/GroupList";
import PostList from "../../components/posts/PostList";
import {
} from "../../layout/Navbar";
import AddIcon from "@mui/icons-material/Add";
const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container gap={1}>
        <Grid item xs={3} position="relative">
          <Box width="100%" position="relative">
            <Card
              sx={{
                position: "fixed",
                top: "",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding:'5px',
                pt:'10px',
                gap:'10px'
              }}
              elevation={1}
            >
              <Button startIcon={<AddIcon/>} variant="contained" >create</Button>
              <TextField name="group" label="search" sx={{padding:'5px'}}/>
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

export default Home;
