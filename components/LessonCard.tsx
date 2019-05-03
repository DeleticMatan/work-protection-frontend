import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Schedule, Beenhere, School, PlayCircleFilled } from "@material-ui/icons";
import styled from "styled-components";
import { green } from "@material-ui/core/colors";

// @ts-ignore
import Router from "../server/routes";

const StyledCard = styled(Card as any)`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  min-height: 200px;
  @media (max-width: 540px) {
    min-height: 500px;
    flex-direction: column;
  }
`;

const StyledDetails = styled(CardActionArea as any)`
  width: 100%;
`;

const StyledMedia = styled(CardMedia as any)`
  height: auto;
  width: 400px;
  @media (max-width: 540px) {
    height: 250px;
    width: 100%;
  }
`;

const StyledContent = styled(CardContent as any)`
  min-width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 540px) {
    min-height: 250px;
  }
`;

const InlineElements = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const IconWrapperRight = styled.div`
  margin-right: 5px;
`;

const IconWrapperLeft = styled.div`
  margin-left: 5px;
`;

const StyledTitle = styled(Typography as any)`
  text-transform: uppercase;
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlayButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  transition: opacity 0.25s ease-in;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const LessonCard = (props: any) => {
  const [getImageHover, setImageHover] = React.useState(false);

  const renderStatus = (status: string) => {
    if (status === "PASSED") {
      return (
        <InlineElements>
          <Typography style={{ color: green[500] }} variant="subtitle2" component="p">
            POLOŽENO
          </Typography>
          <IconWrapperLeft>
            <School style={{ color: green[500] }} />
          </IconWrapperLeft>
        </InlineElements>
      );
    } else if (status === "WATCHED") {
      return (
        <InlineElements>
          <Typography color="secondary" variant="subtitle2" component="p">
            ODGLEDANO
          </Typography>
          <IconWrapperLeft>
            <Beenhere color="secondary" />
          </IconWrapperLeft>
        </InlineElements>
      );
    } else {
      return null;
    }
  };

  return (
    <StyledCard
      onMouseEnter={() => setImageHover(true)}
      onMouseLeave={() => setImageHover(false)}
      onClick={() => Router.pushRoute("videos", { id: props.id, vimeoId: props.vimeoId })}
    >
      <StyledMedia image={props.thumbnail} title={props.title}>
        <PlayButtonWrapper style={{ opacity: getImageHover ? 1 : 0 }}>
          <PlayCircleFilled color="action" style={{ fontSize: "100px" }} />
        </PlayButtonWrapper>
      </StyledMedia>
      <StyledDetails>
        <StyledContent>
          <StyledTitle gutterBottom variant="h6" component="h2">
            {props.title}
          </StyledTitle>

          <Typography component="p">{props.description}</Typography>
          <br />
          <BottomWrapper>
            <InlineElements>
              <IconWrapperRight>
                <Schedule color="primary" />
              </IconWrapperRight>

              <Typography color="primary" variant="subtitle2" component="p">
                {props.duration}
              </Typography>
            </InlineElements>
            {renderStatus(props.status)}
          </BottomWrapper>
        </StyledContent>
      </StyledDetails>
    </StyledCard>
  );
};

// @ts-ignore
export default LessonCard;
