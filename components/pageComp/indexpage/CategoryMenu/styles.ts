import styled from "@emotion/styled";
import { mq } from "@components/mq";

export const CategoryMenu = styled.div`
  padding: 4rem 1.5rem;
  text-align: center;

  ${mq[0]} {
    display: grid;
    padding: 20px;
    gap: 10px 3px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const IcoLink = styled.a<{ num?: number }>`
  margin-left: 1.6rem;
  padding: 0.6rem 1.6rem;
  font-size: 1.4rem;
  color: #4c57fd;
  border-radius: 1.7rem;
  box-shadow: 0 0.2rem 0.8rem 0 rgb(0 0 0 / 12%);
  background-color: #ffffff;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.05);
  }
  &:nth-of-type(n) {
    color: #4c57fd;
    &:hover,
    &:focus {
      color: #3d46ca;
    }
  }
  &:nth-of-type(2n) {
    color: #6053f8;
    &:hover,
    &:focus {
      color: #4d42c6;
    }
  }
  &:nth-of-type(3n) {
    color: #744ff3;
    &:hover,
    &:focus {
      color: #5d3fc2;
    }
  }
  &:nth-of-type(4n) {
    color: #884bee;
    &:hover,
    &:focus {
      color: #6d3cbe;
    }
  }
  &:nth-of-type(5n) {
    color: #9d45e8;
    &:hover,
    &:focus {
      color: #7e37ba;
    }
  }
  ${mq[0]} {
    margin-left: 0;
    padding: 67px 0 0 0;
    font-size: 12px;
    color: rgb(170, 170, 170) !important;
    box-shadow: none;
    &:nth-of-type(${({ num }) => Number(num) + 1}) {
      background: url("/images/ico_catmenu${({ num }) => Number(num) + 1}.png")
        no-repeat center top;
      background-size: 60px 60px;
    }
  }
`;
