import * as React from "react";
import Layout from "../components/Layout";
import LessonCard from "../components/LessonCard";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { CoursesComponent } from "../generated/apolloComponents";
import { deepOrange } from "@material-ui/core/colors";
import Loading from "../components/Loading";

const StyledTitle = styled(Typography as any)`
  max-width: max-content;
  text-transform: uppercase;
  border-bottom: solid 3px ${deepOrange[700]};
  @media (max-width: 600px) {
    margin-top: 90px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
`;

export default class Lessons extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      mounted: true,
    });
  };

  renderQuery = () => {
    return (
      <CoursesComponent>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error! ${error.message}`;

          return (
            <>
              <StyledTitle variant="h4">Lekcije</StyledTitle>
              <br />
              {data &&
                data.courses.map((lesson, index) => {
                  return <LessonCard {...lesson} key={index} />;
                })}
            </>
          );
        }}
      </CoursesComponent>
    );
  };

  render() {
    // @ts-ignore
    const { mounted } = this.state;
    return <Layout title="Lekcije">{mounted ? this.renderQuery() : <Loading />}</Layout>;
  }
}
