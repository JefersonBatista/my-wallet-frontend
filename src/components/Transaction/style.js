import styled from "styled-components";

export const TransactionItem = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 17px;

  .date-and-description {
    display: flex;
    align-items: center;
  }

  .date {
    margin-right: 10px;

    color: #c6c6c6;
  }

  .description {
    color: black;

    cursor: pointer;
  }

  .incoming {
    margin-left: 10px;
    color: #03ac00;
  }

  .outgoing {
    margin-left: 10px;
    color: #c70000;
  }

  .delete {
    margin-left: 10px;

    color: #c6c6c6;

    cursor: pointer;
  }
`;
