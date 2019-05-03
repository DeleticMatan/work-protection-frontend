import { Typography, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { deepOrange, yellow } from "@material-ui/core/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: dashed ${yellow[700]} 1px;
`;

type Props = {
  text: string;
  answers: string[];
};

const Question: React.FunctionComponent<Props> = ({ text, answers }) => {
  return (
    <Wrapper>
      <Typography>{text}</Typography>
      <br />
      <RadioGroup>
        {answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            value={`${index}`}
            control={<Radio style={{ padding: "4px", paddingRight: "12px" }} />}
            label={answer}
          />
        ))}
      </RadioGroup>
    </Wrapper>
  );
};

export default Question;
