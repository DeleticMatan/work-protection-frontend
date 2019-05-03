import * as React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: calc(50% - 70px);
  left: calc(50% - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressWrapper = styled.div`
  margin-bottom: 20px;
`;

const Loading = () => {
  return (
    <Wrapper>
      <ProgressWrapper>
        <CircularProgress disableShrink={true} />
      </ProgressWrapper>
      <Typography color="primary" variant="subtitle2" component="p">
        Učitavanje u toku..
      </Typography>
    </Wrapper>
  );
};

export default Loading;
