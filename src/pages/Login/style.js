import styled from "styled-components";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;

  margin-top: 24px;
  margin-bottom: 36px;
  width: 100%;

  .button-text {
    align-self: center;
  }
`;

const LoginPage = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto 0;

  width: 100%;
`;

export { LoginForm, LoginPage };
