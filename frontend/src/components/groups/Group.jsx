import { Avatar, Badge, Button,  Stack, Typography } from "@mui/material";

const Group = ({ id, image, name }) => {
  return (
    <Button key={id}>
      <Stack flexDirection="row" alignItems="center" width="200px" gap={1}>
        <Badge badgeContent={2} color="error">
          <Avatar src={image} alt={name} />
        </Badge>
        <Typography sx={{ textTransform: "none" }}>{name}</Typography>
      </Stack>
    </Button>
  );
};

export default Group;
