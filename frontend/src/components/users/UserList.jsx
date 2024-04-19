import { Avatar, Button, Skeleton, Stack, Typography } from "@mui/material";
import useGetGroupUsers from "../../api/hooks/users/useGetGroupUsers";
import { Link, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";


const UserList = () => {
  const { groupId } = useParams();
  const [members, setMembers] = useState({
    count: 0,
    page_size: 10,
    page: 1,
    results: [],
  });

  const { data, isLoading, error, isError, isRefetching } = useGetGroupUsers({
    id: groupId,
    params: {
      page_size: members.page_size,
    },
  });

  const handleViewMore = () => {
    // refetch({
    //   id: user?.user_id,
    //   options: {
    //     enabled: Boolean(user),
    //     page_size: members.page_size + 10,
    //   },
    // });
    setMembers((prev) => ({ ...prev, page_size: prev.page_size + 10 }));
  };

  return (
    <Stack padding={3} width="100%">
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "100px" }}
        />
      ) : (
        data.data.results.map(({ id, first_name, image,last_name }) => {
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
                  {first_name + " " + last_name}
                </Typography>
              </Stack>
            </Button>
          );
        })
      )}
      {members.count > members.page_size && (
        <LoadingButton
          loading={isRefetching}
          type="submit"
          variant="outlined"
          fullWidth
          onClick={handleViewMore}
        >
          show more
        </LoadingButton>
      )}
    </Stack>
  );
};

export default UserList;
