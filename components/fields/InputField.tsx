import React, { DetailedHTMLProps } from "react";
import { FieldProps } from "formik";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 70px;
  @media (min-width: 600px) {
    min-width: 350px;
  }
`;

type InputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField = ({ field, form: { errors, touched }, ...props }: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <Wrapper>
      <TextField
        fullWidth
        {...field}
        name={field.name}
        type={props.type}
        placeholder={props.placeholder}
        label={props.placeholder}
      />
      {errorMessage && (
        <Typography variant="subtitle1" color="error">
          {errorMessage}
        </Typography>
      )}
    </Wrapper>
  );
};
