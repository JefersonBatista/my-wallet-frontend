import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: ${({ height }) => (height ? height : "46px")};
  padding: 10px;
  border-radius: 5px;
  border-style: none;
  background-color: #a328d6;

  font-weight: bold;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "20px")};
  color: white;
`;

export default Button;