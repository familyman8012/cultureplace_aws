import React, { useRef, Fragment } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { css } from "@emotion/react";

const fetchAnime = async (page: number) => {
  const client_id = "4mB0CC1xdwTfTQGjF1v1uO9vS2Z8ubzBPd4X0B86IEU";
  const res = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${client_id}&query=code&page=${page}`
  );
  // @ts-ignore
  return res.data.results;
};

export default function Home() {
  const page = useRef(1);

  const { data, fetchNextPage } = useInfiniteQuery(
    "top",
    async ({ pageParam = page.current }) => {
      const res = await fetchAnime(pageParam);
      page.current = page.current + 1;
      return res;
    },
    {
      getNextPageParam() {
        return page.current;
      }
    }
  );

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        padding: 5rem;

        .App {
          flex-direction: column;
        }
        .image {
          width: 363px;
          border-radius: 5px;
          height: 240px;
        }
        .container {
          border-radius: 5px;
          margin: 5px;
          padding: 15px;
          box-shadow: 0 10px 40px -10px rgb(0 64 128 / 10%);
          border: 1px solid #eee;
          background: #f9fafc;
        }
        h4 {
          font-weight: 400;
        }
        .flex {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .main {
          width: 100%;
          height: 100%;
          flex-wrap: wrap;
        }
        input {
          padding: 10px;
          box-shadow: 0 10px 40px -10px rgb(0 64 128 / 10%);
          border: 1px solid #ddd;
          background: #f9fafc;
          width: 40%;
          margin: 15px 0;
        }
      `}
    >
      {(data?.pages || []).map((group, i) => (
        <Fragment key={i}>
          {group.map(
            (
              data: {
                urls: { small: string | undefined };
                alt_description: string | undefined;
                user: {
                  name:
                    | string
                    | number
                    | boolean
                    | {}
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactNodeArray
                    | React.ReactPortal
                    | null
                    | undefined;
                };
              },
              key: React.Key | null | undefined
            ) => (
              <div className="container" key={key}>
                <Link href="/detail/1">
                  <a>
                    <img
                      src={data.urls.small}
                      className="image"
                      alt={data.alt_description}
                    />
                  </a>
                </Link>
                <h4>Photo by {data.user.name} 📸</h4>
              </div>
            )
          )}
        </Fragment>
      ))}
      <div>111</div>
      <InView as="div" onChange={() => fetchNextPage()} rootMargin="500px">
        <span></span>
      </InView>
    </div>
  );
}
