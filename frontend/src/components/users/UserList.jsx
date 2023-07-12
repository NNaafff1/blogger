import { Avatar,  Button, Stack, Typography } from "@mui/material";

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
  return (
    <Stack padding={3} width="100%">
      {users.map(({ id, name, image }) => {
        return (
          <Button key={id}>
            <Stack
              flexDirection="row"
              alignItems="center"
              width="200px"
              gap={1}
            >
              <Avatar src={image} alt={name} />
              <Typography sx={{ textTransform: "none" }}>{name}</Typography>
            </Stack>
          </Button>
        );
      })}
    </Stack>
  );
}

export default UserList
