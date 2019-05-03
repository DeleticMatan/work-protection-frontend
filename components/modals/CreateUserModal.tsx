import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { Tooltip, IconButton } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import { RegisterComponent, UsersDocument } from "../../generated/apolloComponents";
import { Formik, Field } from "formik";
import { InputField } from "../fields/InputField";
import styled from "styled-components";
import { deepOrange } from "@material-ui/core/colors";

const StyledIconButton = styled(IconButton as any)`
  color: white;
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

const CreateUserModal = (props: any) => {
  const { fullScreen } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Dodaj" placement="bottom-start">
        <StyledIconButton aria-label="Dodaj" onClick={handleClickOpen}>
          <Add />
        </StyledIconButton>
      </Tooltip>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <Title>
          Kreiraj korisnika
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
        <RegisterComponent>
          {register => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  const response = await register({
                    variables: {
                      data,
                    },
                    awaitRefetchQueries: true,
                    refetchQueries: result => {
                      return [{ query: UsersDocument, variables: { id: result.data.register.id } }];
                    },
                    // @ts-ignore
                    update: (store, { data: { register } }) => {
                      const data = store.readQuery({ query: UsersDocument });
                      // @ts-ignore
                      data.users.push(register);
                      store.writeQuery({ query: UsersDocument, data });
                    },
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
                firstName: "",
                lastName: "",
                companyName: "",
                email: "",
                password: "",
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Field name="firstName" placeholder="Ime" component={InputField} />
                    <Field name="lastName" placeholder="Prezime" component={InputField} />
                    <Field name="companyName" placeholder="Kompanija" component={InputField} />
                    <Field name="email" placeholder="E-mail" component={InputField} />
                    <Field name="password" placeholder="Lozinka" type="password" component={InputField} />
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" color="primary" type="submit">
                      Potvrdi
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          )}
        </RegisterComponent>
      </Dialog>
    </>
  );
};

CreateUserModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(CreateUserModal);
