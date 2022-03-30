import styled from "@emotion/styled";

export const CardBadgewWrapper = styled.div`
  position: relative;
  .card-badge {
    position: absolute;
    top: 6px;
    left: -6px;
    width: 46px;
    height: 46px;
    padding: 5px 0;
    z-index: 2;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: -0.12px;
    color: #ffffff;
    &.sale {
      background-color: #f06182;
      .title:after {
        display: block;
        content: "SALE";
      }
    }
    &.startday {
      padding: 5px 0 !important;
      background: rgb(120, 77, 235);
      .title:after {
        display: block;
        content: "시작 임박";
      }
    }
    &.online {
      padding: 15px 0;
      background-color: #00ac83;
      .title:after {
        display: block;
        content: "Online";
      }
    }
    .title {
      word-break: keep-all;
    }
    .title,
    .card-badge__subtitle {
      font-size: 12px;
    }
    .card-badge__subtitle {
      font-weight: normal;
    }
  }
  .card-badge__tail {
    display: none;
    position: absolute;
    bottom: -6px;
    left: 0;
    border-style: solid;
    border-width: 0 6px 6px 0;
    border-color: transparent #a6435a transparent transparent;
    content: "";
  }
  .sale .card-badge__tail,
  .startday .card-badge__tail,
  .online .card-badge__tail {
    display: block;
  }
  .startday .card-badge__subtitle,
  .online .card-badge__subtitle {
    display: none;
  }
`;
