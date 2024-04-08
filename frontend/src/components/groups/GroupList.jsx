import { Stack } from "@mui/material";
import Group from "./Group";

const GroupList = ({ groups }) => {
  // const {id} =
  console.log(groups)
  return (
    <Stack padding={3} width="100%">
      {groups.map((group) => {
        return <Group {...group} key={group.id} />;
      })}
    </Stack>
  );
};

export default GroupList;
