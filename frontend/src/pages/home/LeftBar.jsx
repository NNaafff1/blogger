import { Box, Button, Card, Dialog, Skeleton, TextField } from "@mui/material";
import GroupList from "../../components/groups/GroupList";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import GroupForm from "../../components/groups/GroupForm";
import useGetGroupsUserIn from "../../api/hooks/users/useGetGroupsUserIn";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

const LeftBar = () => {
  const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [groups, setGroups] = useState({
    count: 0,
    page_size: 10,
    page: 1,
    results: [],
  });

  const { user } = useAuth();

  const { data, isLoading, error, isError, refetch, isRefetching } =
    useGetGroupsUserIn({
      id: user?.user_id,
      options: {
        enabled: Boolean(user),
        page_size: groups.page_size,
      },
    });


   const handleViewMore = () => {
     setGroups((prev) => ({ ...prev, page_size: prev.page_size + 10 }));
   };


  useEffect(() => {
    refetch({
      id: user?.user_id,
      options: {
        enabled: Boolean(user),
        page_size: groups.page_size,
      },
    });
  }, [groups.page_size]);

  return (
    <>
      <Box width="100%" position="relative">
        <Card
          sx={{
            position: "fixed",
            top: "",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "5px",
            pt: "10px",
            gap: "10px",
          }}
          elevation={1}
        >
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setCreateGroupDialogOpen(true)}
          >
            create
          </Button>
          <TextField name="group" label="search" sx={{ padding: "5px" }} />
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "100px" }}
            />
          ) : (
            data?.data && <GroupList groups={data.data?.results} />
          )}
          {groups.count > groups.page_size && (
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
        </Card>
      </Box>
      <Dialog
        open={isCreateGroupDialogOpen}
        onClose={() => setCreateGroupDialogOpen(false)}
      >
        <GroupForm />
      </Dialog>
    </>
  );
};

export default LeftBar;
