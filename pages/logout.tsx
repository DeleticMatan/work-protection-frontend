import * as React from "react";
import { logoutMutation } from "../graphql/User/mutations/logout";
import { isBrowser } from "../lib/isBrowser";
import { withApollo } from "react-apollo";
import Router from "next/router";
import { CircularProgress, Typography } from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressWrapper = styled.div`
  margin-bottom: 20px;
`;

type Props = {
  client: any;
};

class Logout extends React.Component<Props> {
  componentDidMount = async () => {
    const { client } = this.props;

    await client.mutate({ mutation: logoutMutation });
    await client.resetStore();

    isBrowser && localStorage.clear();

    Router.push("/");
  };

  render() {
    return (
      <Wrapper>
        <ProgressWrapper>
          <CircularProgress disableShrink={true} />
        </ProgressWrapper>
        <Typography color="primary" variant="subtitle2" component="p">
          Odjava u toku...
        </Typography>
      </Wrapper>
    );
  }
}

export default withApollo(Logout);
