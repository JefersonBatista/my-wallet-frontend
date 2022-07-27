import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: ${({ height }) => (height ? "space-between" : "center")};

  width: 100%;
  height: ${({ height }) => (height ? height : "auto")};
  padding: 10px;
  border-radius: 5px;
  border-style: none;
  background-color: #a328d6;

  font-weight: bold;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "20px")};
  color: white;

  cursor: ${({ disabled }) => disabled || "pointer"};
`;

export default Button;
