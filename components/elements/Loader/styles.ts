import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const Loading = styled.div`
  @-webkit-keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }

  position: relative;
  top: -1rem;
  left: -4rem;

  > div:nth-of-type(1) {
    top: 2rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
  }
  > div:nth-of-type(2) {
    top: 1.3rem;
    left: 1.3rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
  }
  > div:nth-of-type(3) {
    top: 0;
    left: 2rem;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.6s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.6s infinite ease-in-out;
  }
  > div:nth-of-type(4) {
    top: -1.3rem;
    left: 1.3rem;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
  }
  > div:nth-of-type(5) {
    top: -2rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
  }
  > div:nth-of-type(6) {
    top: -1.3rem;
    left: -1.3rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
  }
  > div:nth-of-type(7) {
    top: 0;
    left: -2rem;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
  }
  > div:nth-of-type(8) {
    top: 1.363636rem;
    left: -1.363636rem;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
  }
  > div {
    background-color: #fff;
    width: 0.4rem;
    height: 3.5rem;
    border-radius: 0.2rem;
    margin: 0.2rem;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    width: 0.5rem;
    height: 1.5rem;
  }
`;
