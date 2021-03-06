import styled, { css } from "styled-components";
import { shade } from "polished";

interface FormProps {
  hasError: boolean;
}

export const Error = styled.span`
  color: red;
  margin-top: 10px;
  display: block;
  font-family: Roboto, sans-serif;
`;
export const Title = styled.h1`
  font-size: 40px;
  color: black;
  max-width: 450px;
  margin-top: 80px;
  line-height: 56px;
`;

export const Form = styled.form<FormProps>`
  max-width: 700px;
  margin-top: 40px;

  display: flex;

  input {
    flex: 1;
    height: 50px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border:2px solid #ffff;
    border-right:0;

    ${(props) =>
      props.hasError &&
      css`
        border-color: red;
      `}

   
    &::placeholder {
      color: #e3e3e3;
    }
  }

  button {
    width: 210px;
    height: 50px;
    border: 0;
    border-radius: 0px 5px 5px 0px;
    background-color: #c70039;
    color: #ffff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, "#c70039")};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #ffffff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
