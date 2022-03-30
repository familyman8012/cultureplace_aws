import styled from "@emotion/styled";

export const WrapQuillText = styled.div`
  margin: 0 auto;
  .box_quill {
    overflow-y: scroll;
    height: 75vh;
    .ql-container {
      height: auto;
      padding: 10px 0;
      &.ql-snow {
        border: none;
      }
    }
  }
  .area_template_select {
    display: flex;
    margin-bottom: 15px;
    p {
      margin-right: 10px;
      color: #fff;
    }
  }
`;

export const AdminBoxBtn = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: flex-end;
  button {
    padding: 13px 10px;
    color: #d7fff1;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);

    &:first-of-type {
      margin-right: 10px;
      color: #d7fff1;
      background-color: #77af9c;
    }
    &:last-child {
      color: #6e6e6e;
      background-color: #fce205;
    }
  }
`;

export const QuillStyle = styled.div`
  .ql-container {
    height: 300px;
  }
  background: #fff;
`;
