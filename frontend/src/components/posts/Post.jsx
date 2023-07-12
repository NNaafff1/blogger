import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommentDialog from "../comments/CommentDialog";

const Post = ({ id, text, create_at, image, user }) => {
  const theme = useTheme();
  const [isCommentDialogOPen, setCommentDialogOpen] = useState(false);
  return (
    <>
      <Card key={id}>
        <CardHeader
          component={Link}
          to="/profile/1"
          sx={{
            textTransform: "none",
            textDecoration: "none",
            color: theme.palette.primary.main,
          }}
          title={<Typography>{user.username}</Typography>}
          avatar={
            <Avatar src={user.image} alt={user.username}>
              vds
            </Avatar>
          }
          subheader={create_at}
        />
        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>
        <CardMedia component="img" image={image} />
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button fullWidth onClick={() => setCommentDialogOpen(true)}>
            comment
          </Button>
          <Button fullWidth>react</Button>
        </CardActions>
      </Card>
      <CommentDialog
        isCommentDialogOpen={isCommentDialogOPen}
        setCommentDialogOpen={setCommentDialogOpen}
      />
    </>
  );
};

export default Post;
