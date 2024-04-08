import { Avatar, Button, Skeleton, Stack, Typography } from "@mui/material";
import useGetGroupUsers from "../../api/hooks/users/useGetGroupUsers";
import { Link, useParams } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "ahmed",
    image: "player.jpg",
  },
  {
    id: 2,
    name: "ahmed",
    image: "player.jpg",
  },
];

const UserList = () => {
  const { groupId } = useParams();
  const { data, isLoading, error, isError } = useGetGroupUsers(groupId);
  console.log(data);

  return (
    <Stack padding={3} width="100%">
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "100px" }}
        />
      ) : (
        data.data.map(({ id, first_name, image }) => {
          return (
            <Button key={id} component={Link} to={`/users/${id}`}>
              <Stack
                flexDirection="row"
                alignItems="center"
                width="200px"
                gap={1}
              >
                <Avatar src={image} alt={first_name} />
                <Typography sx={{ textTransform: "none" }}>
                  {first_name}
                </Typography>
              </Stack>
            </Button>
          );
        })
      )}
    </Stack>
  );
};

export default UserList;
