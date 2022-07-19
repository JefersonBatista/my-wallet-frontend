import styled from "styled-components";
import { Link } from "react-router-dom";

const PageLink = styled(Link)`
  align-self: center;

  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  color: white;

  cursor: ${({ to }) => to !== "#" || "default"};
`;

export default PageLink;
