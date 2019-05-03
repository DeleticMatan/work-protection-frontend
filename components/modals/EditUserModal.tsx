import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { Tooltip, IconButton, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import { Edit, Close } from "@material-ui/icons";
import { UsersDocument, UpdateUserComponent } from "../../generated/apolloComponents";
import { Formik, Field } from "formik";
import { InputField } from "../fields/InputField";
import styled from "styled-components";
import { deepOrange } from "@material-ui/core/colors";

const StyledIconButton = styled(IconButton as any)`
  color: white;
  @media (max-width: 959px) {
    display: none !important;
  }
  &:hover {
    color: ${deepOrange[700]};
  }
`;

const Title = styled(DialogTitle as any)`
  padding: 8px !important;
  background-color: ${deepOrange[700]};
  text-align: center;
  text-transform: uppercase;
`;

type Props = {
  user: any;
  fullScreen: any;
};

const EditUserModal: React.FC<Props> = ({ user, fullScreen }) => {
  const [open, setOpen] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);

  const handleClickOpen = () => {
    setChangePassword(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Izmeni" placement="bottom-start">
        <StyledIconButton aria-label="Izmeni" onClick={handleClickOpen}>
          <Edit />
        </StyledIconButton>
      </Tooltip>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <Title>
          Izmeni podatke korisnika
          <IconButton
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Title>
        <UpdateUserComponent>
          {updateUser => (
            <Formik
              enableReinitialize={true}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  if (!changePassword) {
                    delete data.password;
                  }
                  const response = await updateUser({
                    variables: {
                      id: user[0],
                      data,
                    },
                    awaitRefetchQueries: true,
                    refetchQueries: result => {
                      return [{ query: UsersDocument, variables: { id: result.data.updateUser.id } }];
                    },
                    // @ts-ignore
                  });
                  handleClose();
                } catch (err) {
                  const errors: { [key: string]: string } = {};
                  err.graphQLErrors[0].extensions.exception.validationErrors.forEach((validationError: any) => {
                    Object.values(validationError.constraints).forEach((message: any) => {
                      errors[validationError.property] = message;
                    });
                  });

                  setErrors(errors);
                }
              }}
              initialValues={{
                firstName: user[1],
                lastName: user[2],
                companyName: user[3],
                email: user[4],
                isActive: user[5],
                password: "",
              }}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Field name="firstName" placeholder="Ime" component={InputField} />
                    <Field name="lastName" placeholder="Prezime" component={InputField} />
                    <Field name="companyName" placeholder="Kompanija" component={InputField} />
                    <Field name="email" placeholder="E-mail" component={InputField} />
                    <FormControl
                      style={{
                        width: "100%",
                        marginBottom: "15px",
                      }}
                    >
                      <InputLabel>Status</InputLabel>
                      <Select
                        fullWidth
                        value={values.isActive ? "aktivan" : "neaktivan"}
                        onChange={e => {
                          let newValue = e.target.value === "aktivan" ? true : false;
                          setFieldValue("isActive", newValue);
                        }}
                        name="isActive"
                      >
                        <MenuItem value={"aktivan"}>Aktivan</MenuItem>
                        <MenuItem value={"neaktivan"}>Neaktivan</MenuItem>
                      </Select>
                    </FormControl>
                    {!changePassword ? (
                      <div
                        style={{
                          margin: "17px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button color="primary" onClick={() => setChangePassword(true)}>
                          Promeni lozinku
                        </Button>
                      </div>
                    ) : (
                      <Field name="password" placeholder="Nova Lozinka" type="password" component={InputField} />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" color="primary" type="submit">
                      Izmeni
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          )}
        </UpdateUserComponent>
      </Dialog>
    </>
  );
};

// @ts-ignore
export default withMobileDialog()(EditUserModal);
