import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const FilterBtn = styled.div`
  display: none;
  ${mq[0]} {
    display: block;
    width: 200px;
    margin: 10px auto;
    padding: 6px 0;
    font-size: 12px;
    color: #ff005a;
    text-align: center;
    border: 1px solid #ff005a;
    border-radius: 4px;

    span {
      padding-left: 18px;
      background: url("https://front-img.taling.me/Content/Images/icon_filter_on.png")
        no-repeat 0 center;
      background-size: 13px auto;
    }
  }
`;

export const WrapInfinityPage = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  border-top: 1px solid #cfd0d4;
  ${mq[0]} {
    width: 100%;
  }
  ${mq[1]} {
    padding: 10px 20px;
  }
`;

export const InfinityCardwrap = styled.div<{ type?: string }>`
  display: grid;
  gap: 22px 27px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  ${({ type }) => type === "other" && " grid-template-columns: 1fr 1fr 1fr;"};
  ${({ type }) => type === "event" && " grid-template-columns: 1fr 1fr 1fr;"};

  ${mq[0]} {
    display: block;
    div[type="basic"],
    div[type="other"] {
      margin-bottom: 0;
      border-radius: 0;
      border-bottom: 10px solid #e3e3e3;
      .imgbox {
        height: auto;
      }

      .txtbox {
        padding: 10px;
        dt {
          paddin-top: 0;
        }
        dd.title {
          height: auto;
        }
        dd {
          &.wrap_price {
            border-top: 1px solid #f8f8f8;
            padding-top: 5px;
            margin-top: 5px;
            .priceNum {
              align-items: center;
              .price {
                font-size: 13px;
              }
              .period {
                font-size: 11px;
              }
            }
          }
        }
      }
    }
    div[type="other"] {
      .txtbox {
        padding: 15px 10px;
      }
    }
  }
`;

export const LinkCard = styled.span`
  display: contents;
  margin: 12px;
`;
