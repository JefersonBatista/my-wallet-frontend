import styled from "styled-components";

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;

  margin-top: 28px;
  margin-bottom: 32px;
  width: 100%;

  .button-text {
    align-self: center;
  }
`;

const SignUpPage = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto 0;

  width: 100%;
`;

export { SignUpForm, SignUpPage };