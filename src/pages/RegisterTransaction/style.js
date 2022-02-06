import styled from "styled-components";

export const Page = styled.section`
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;

  width: 100%;
  height: 96px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;

  width: 100%;

  .button-text {
    align-self: center;
  }
`;
