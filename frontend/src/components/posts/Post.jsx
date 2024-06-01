import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommentDialog from "../comments/CommentDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/UpdateOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useDeleteBlog from "../../api/hooks/blogs/useDeleteBlog";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
const Post = ({ id, text, create_at, image, user, group }) => {
  dayjs.extend(relativeTime);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isCommentDialogOPen, setCommentDialogOpen] = useState(false);

  const { mutate, isLoading: isDeleteBlogLoading, error } = useDeleteBlog();

  const handleDeleteBlog = () => {
    mutate(id);
  };

  return (
    <>
      <Card key={id} >
        <CardHeader
          to={`/profile/${user.id}`}
          sx={{
            textTransform: "none",
            textDecoration: "none",
            color: theme.palette.primary.main,
          }}
          title={
            <Stack flexDirection="row" gap={1}>
              <Link
                to={`/profile/${user.id}`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.info.main,
                }}
              >
                <Typography>{user.username}</Typography>
              </Link>
              <KeyboardArrowRightIcon />
              <Link
                to={`/groups/${group.id}`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.info.main,
                }}
              >
                <Typography>{group.name}</Typography>
              </Link>
            </Stack>
          }
          avatar={
            <Link
              to={`/profile/${user.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Avatar src={user.image} alt={user.username}>
                vds
              </Avatar>
            </Link>
          }
          subheader={dayjs(create_at).fromNow()}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <LoadingButton startIcon={<UpdateIcon />}>
                    Update
                  </LoadingButton>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <LoadingButton
                    startIcon={<DeleteIcon color="error" />}
                    color="error"
                    loading={isDeleteBlogLoading}
                    onClick={handleDeleteBlog}
                  >
                    Delete
                  </LoadingButton>
                </MenuItem>
              </Menu>
            </>
          }
        />
        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>
        <CardMedia component="img" image={image} />
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button fullWidth onClick={() => setCommentDialogOpen(true)}>
            comment
          </Button>
          {/* <Button fullWidth>react</Button> */}
        </CardActions>
      </Card>
      <CommentDialog
        isCommentDialogOpen={isCommentDialogOPen}
        setCommentDialogOpen={setCommentDialogOpen}
        blog_id={id}
      />
    </>
  );
};

export default Post;
