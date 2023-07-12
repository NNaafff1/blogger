import { Stack } from "@mui/material";
import Group from "./Group";

const groups = [
  {
    image: "player.jpg",
    name: "soccer",
    id: 1,
  },
  {
    image: "player.jpg",
    name: "soccer",
    id: 1,
  },
  {
    image: "player.jpg",
    name: "soccer",
    id: 1,
  },
];

const GroupList = () => {
  return (
    <Stack padding={3} width="100%">
      {groups.map((group) => {
        return <Group {...group} key={group.id} />;
      })}
    </Stack>
  );
};

export default GroupList;
