import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Stepper, Step, StepButton, StepContent } from "@material-ui/core";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { Tooltip, IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styled from "styled-components";
import Question from "../Question";
import { deepOrange } from "@material-ui/core/colors";
import SwipeableViews from "react-swipeable-views";

const StyledIconButton = styled(IconButton as any)`
  background-color: green;
  @media (max-width: 959px) {
    display: none !important;
  }
`;

const Title = styled(DialogTitle as any)`
  padding: 8px !important;
  background-color: ${deepOrange[700]};
  text-align: center;
  text-transform: uppercase;
`;

type Props = {
  fullScreen: any;
  title: string;
};

const DeleteUserModal: React.FC<Props> = ({ fullScreen, title }) => {
  const [open, setOpen] = React.useState(false);
  const [getStep, setStep] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant="contained" color="primary">
        Radi Test
      </Button>
      <Dialog fullScreen={fullScreen} open={open} aria-labelledby="responsive-dialog-title">
        <Title>
          {title}
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
        <DialogContent>
          <Stepper activeStep={getStep}>
            <Step
              style={{
                paddingLeft: "8px",
                paddingRight: 0,
              }}
            >
              <StepButton onClick={() => setStep(0)} />
            </Step>
            <Step
              style={{
                paddingLeft: "8px",
                paddingRight: 0,
              }}
            >
              <StepButton onClick={() => setStep(1)} />
            </Step>
            <Step
              style={{
                paddingLeft: "8px",
                paddingRight: 0,
              }}
            >
              <StepButton onClick={() => setStep(2)} />
            </Step>
          </Stepper>

          <SwipeableViews axis={"x"} index={getStep} onChangeIndex={(step: number) => setStep(step)} enableMouseEvents>
            <div
              style={{
                margin: "0 10px",
              }}
            >
              {" "}
              <Question
                text="1. Ies, but also the leap into electronic typesetting, remaining essenaset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
                answers={["asd", "sdf", "dfg"]}
              />
              <Question
                text="2. Tin literature from 45 BC, making it over 2000 yeactetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ips"
                answers={["asd", "sdf", "dfg"]}
              />
              <Question
                text="3. Arrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repunks as necessary, making"
                answers={["asd", "sdf", "dfg"]}
              />
            </div>
            <div
              style={{
                margin: "0 10px",
              }}
            >
              {" "}
              <Question
                text="4. Ies, but also the leap into electronic typesetting, remaining essenaset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
                answers={["asd", "sdf", "dfg"]}
              />
              <Question
                text="5. Tin literature from 45 BC, making it over 2000 yeactetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ips"
                answers={["asd", "sdf", "dfg"]}
              />
              <Question
                text="6. Arrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repunks as necessary, making"
                answers={["asd", "sdf", "dfg"]}
              />
            </div>
            <div
              style={{
                margin: "0 10px",
              }}
            >
              {" "}
              <Question
                text="7. Ies, but also the leap into electronic typesetting, remaining essenaset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
                answers={["asd", "sdf", "dfg"]}
              />
              <Question
                text="8. Tin literature from 45 BC, making it over 2000 yeactetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ips"
                answers={["asd", "sdf", "dfg"]}
              />
            </div>
          </SwipeableViews>
        </DialogContent>

        <DialogActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button disabled={getStep === 0} onClick={() => setStep(getStep - 1)} variant="contained">
            Nazad
          </Button>

          <Button
            onClick={() => {
              if (getStep !== 2) {
                setStep(getStep + 1);
              } else {
                handleClose();
                setStep(0);
              }
            }}
            variant="contained"
            color="primary"
          >
            {getStep === 2 ? "Završi" : "Napred"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// @ts-ignore
export default withMobileDialog()(DeleteUserModal);
