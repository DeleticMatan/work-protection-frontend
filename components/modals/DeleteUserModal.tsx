import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { Tooltip, IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import styled from "styled-components";
import { DeleteUserComponent, UsersDocument } from "../../generated/apolloComponents";
import { deepOrange } from "@material-ui/core/colors";

const StyledIconButton = styled(IconButton as any)`
  background-color: green;
  @media (max-width: 959px) {
    display: none !important;
  }
  &:hover {
    color: ${deepOrange[700]};
  }
`;

type Props = {
  user: any;
  fullScreen: any;
};

const DeleteUserModal: React.FC<Props> = ({ user, fullScreen }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip onClick={handleClickOpen} title="Obriši" placement="bottom-start">
        <StyledIconButton aria-label="Obriši">
          <Delete />
        </StyledIconButton>
      </Tooltip>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <Typography>{`Da li ste sigurni da želite da obrišete korisnika ${user[1]} ${user[2]} (${
            user[3]
          })?`}</Typography>
        </DialogContent>
        <DialogActions>
          <DeleteUserComponent>
            {deleteUser => (
              <Button
                color="primary"
                onClick={async () => {
                  try {
                    const response = await deleteUser({
                      variables: {
                        id: user[0],
                      },

                      awaitRefetchQueries: true,

                      // @ts-ignore
                      update: (cache, { data: { deleteUser } }) => {
                        // @ts-ignore
                        const { users } = cache.readQuery({ query: UsersDocument });
                        cache.writeQuery({
                          query: UsersDocument,
                          data: { users: users.filter((user: any) => user.id !== deleteUser.id) },
                        });
                      },
                    });
                    handleClose();
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Da, obriši
              </Button>
            )}
          </DeleteUserComponent>
          <Button onClick={handleClose} color="secondary">
            Otkaži
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// @ts-ignore
export default withMobileDialog()(DeleteUserModal);
