import * as React from "react";
import Layout from "../components/Layout";
import { withRouter } from "next/router";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Schedule } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { CoursesComponent, CoursesVariables } from "../generated/apolloComponents";
import Router from "next/router";
import { deepOrange } from "@material-ui/core/colors";
import TestModal from "../components/modals/TestModal";
import Loading from "../components/Loading";

const InnerPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  margin: 25px 0 25px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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

const IconWrapperRight = styled.div`
  margin-right: 5px;
`;

const InlineElements = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DescriptionWrapper = styled.div`
  max-width: 960px;
`;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
`;

const PlayerWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
`;

const StyledReactPlayer = styled(ReactPlayer as any)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type Props = {
  id?: string;
  vimeoId?: string;
};

class Videos extends React.Component<Props> {
  static async getInitialProps({ query }: any) {
    return { id: query.id };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
    };
  }

  componentDidMount = () => {
    const { id } = this.props;
    if (!id) {
      return Router.push("/lessons");
    }
  };

  render() {
    const { id } = this.props;
    // @ts-ignore
    const { title } = this.state;

    return (
      <Layout title={`${title}`}>
        <CoursesComponent variables={{ id: id } as CoursesVariables}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return `Error! ${error.message}`;

            return (
              <>
                {data && (
                  <>
                    <StyledTitle variant="h4">{data.courses[0].title}</StyledTitle>
                    <PageWrapper>
                      <InnerPlayerWrapper>
                        <PlayerWrapper>
                          <StyledReactPlayer
                            onProgress={(progress: any) => console.log(progress)}
                            config={{
                              vimeo: {
                                playerOptions: {
                                  color: "E64A19",
                                },
                              },
                            }}
                            onEnded={() => alert("Video ended, lesson ready!")}
                            url={`https://vimeo.com/${data.courses[0].vimeoId}`}
                            width="100%"
                            height="100%"
                          />
                        </PlayerWrapper>
                        <TitleWrapper>
                          <TestModal title={data.courses[0].title} />
                          <InlineElements>
                            <IconWrapperRight>
                              <Schedule color="primary" />
                            </IconWrapperRight>
                            <Typography color="primary" variant="subtitle2" component="p">
                              {data.courses[0].duration}
                            </Typography>
                          </InlineElements>
                        </TitleWrapper>
                        <DescriptionWrapper>
                          <Typography component="p">{data.courses[0].description}</Typography>
                        </DescriptionWrapper>
                      </InnerPlayerWrapper>
                    </PageWrapper>
                  </>
                )}
              </>
            );
          }}
        </CoursesComponent>
      </Layout>
    );
  }
}

export default withRouter(Videos);
