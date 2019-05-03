import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Formik, Field } from "formik";
import Router from "next/router";
import { InputField } from "../fields/InputField";
import { LoginComponent, MeQuery } from "../../generated/apolloComponents";
import { meQuery } from "../../graphql/User/queries/me";
import { isBrowser } from "../../lib/isBrowser";
import styled from "styled-components";
import { deepOrange } from "@material-ui/core/colors";

const Title = styled(DialogTitle as any)`
  padding: 8px !important;
  background-color: ${deepOrange[700]};
  text-align: center;
  text-transform: uppercase;
`;

type Props = {
  handleClose: any;
  fullScreen: any;
};

const LoginModal: React.FunctionComponent<Props> = (props: any) => {
  const { fullScreen, handleClose } = props;

  return (
    <div>
      <LoginComponent>
        {login => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors, resetForm }) => {
              try {
                const response = await login({
                  variables: data,
                  update: (cache, { data }) => {
                    if (!data || !data.login) {
                      return;
                    }

                    cache.writeQuery<MeQuery>({
                      query: meQuery,
                      data: {
                        __typename: "Query",
                        me: data.login,
                      },
                    });
                  },
                });
                if (isBrowser) {
                  response && response.data && localStorage.setItem("id", response.data.login.id);
                  response && response.data && localStorage.setItem("name", response.data.login.name);
                  response && response.data && localStorage.setItem("isAdmin", `${response.data.login.isAdmin}`);
                }
                resetForm();
                if (response && response.data && response.data.login.isAdmin) {
                  Router.push("/admin");
                  handleClose();
                } else {
                  Router.push("/lessons");
                  handleClose();
                }
              } catch (err) {
                setErrors({
                  email: "Invalid credentials",
                  password: "Invalid credentials",
                });
                resetForm();
              }
            }}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, isSubmitting, resetForm }) => (
              <Dialog fullScreen={fullScreen} open={props.open} aria-labelledby="responsive-dialog-title">
                <Title>
                  Prijava
                  <IconButton
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    onClick={() => {
                      resetForm();
                      handleClose();
                    }}
                  >
                    <Close />
                  </IconButton>
                </Title>

                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Field name="email" placeholder="E-mail" label="E-mail" component={InputField} />
                    <Field
                      name="password"
                      placeholder="Lozinka"
                      label="Password"
                      type="password"
                      component={InputField}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">
                      Potvrdi
                      {/*isSubmitting ? <CircularProgress disableShrink={true} /> : "Potvrdi"*/}
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            )}
          </Formik>
        )}
      </LoginComponent>
    </div>
  );
};

// @ts-ignore
export default withMobileDialog()(LoginModal);
