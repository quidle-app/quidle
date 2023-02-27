import styled from "styled-components";

export const Card = styled.div`
  width: 95vw;
  max-width: 1000px;
  
  background-color: #e4e4e4;
  margin: 10px 10px 30px;
  border-radius: 7px;

  h4 {
    margin: 0;
  }

  .question {
    background-color: var(--bg-secondary);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    padding: 10px;
    margin-bottom: 5px;
    text-align: left;
  }

  .correct {
    color: var(--accent-color);
  }

  ul {
    margin: 0;
    padding-left: 10px;

    li {
      list-style-type: none;
      text-align: left;
      margin-bottom: 10px;
    }

    li:before {
      display: inline-block;
      content: "-";
      width: 10px;
    }
  }
`;
