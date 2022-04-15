import { useMemo } from "react";
import { useSession } from "next-auth/client";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { IinfinityProduct, IProduct, IProductList } from "@src/typings/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { css } from "@emotion/react";

export interface IFavoritebtn {
  data: IProduct;
  querykey?: string;
}

export interface Ipages {
  is_last: boolean;
  products: IProduct[];
}

export interface IinfinityFavorite {
  pageParams: number[];
  pages: Ipages;
}

function Index({ data, querykey }: IFavoritebtn) {
  const queryClient = useQueryClient();

  const [session] = useSession();
  const favoriteChk = useMemo(
    () => data?.favoriteduser?.includes(String(session?.user.uid)),
    [data?.favoriteduser, session?.user.uid]
  );
  const variables = {
    _id: data?._id,
    favorite: favoriteChk,
    userid: session?.user?.uid
  };

  const favoriteMutation = useMutation(
    () => axios.post("/api/favorite", variables),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("list");

        let newQuerykey: string[] = [];
        if (querykey?.indexOf("-1")) {
          newQuerykey = querykey?.split(",");
        }

        const previousDetail = queryClient.getQueryData<
          IProductList | IinfinityProduct
        >(newQuerykey.length ? ["list", ...newQuerykey] : ["list", querykey]);

        let updateProduct: any[] = [];
        if (previousDetail && "pages" in previousDetail) {
          previousDetail?.pages.forEach(function (item: any) {
            let selItem;
            if (updateProduct.length === 0 && item.products.length !== 0) {
              selItem = item.products.filter((el: any) => el._id === data?._id);
              updateProduct = [...selItem];
            }
          });
        } else if (previousDetail) {
          updateProduct = previousDetail?.products?.filter(
            (el: any) => el._id === data?._id
          );
        }

        if (previousDetail && updateProduct) {
          if (!favoriteChk) {
            updateProduct[0].favoriteduser = [
              String(...updateProduct[0].favoriteduser),
              String(session?.user.uid)
            ];
            queryClient.setQueryData("list", { ...previousDetail });
          } else {
            updateProduct[0].favoriteduser =
              updateProduct[0].favoriteduser.filter(
                (el: string) => el !== session?.user.uid
              );
            queryClient.setQueryData("list", { ...previousDetail });
          }
        }
        return { previousDetail };
      },
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      },
      onSettled: () => {
        queryClient.refetchQueries(["list"]);
      }
    }
  );

  return (
    // <FavoriteBtn
    //   on={favoriteChk ? "on" : "off"}
    //   onClick={e => {
    //     e.preventDefault();
    //     favoriteMutation.mutate();
    //   }}
    // />
    <FontAwesomeIcon
      css={css`
        position: absolute;
        z-index: 100;
        top: 6px;
        right: 13px;
        font-size: 21px;
        width: 37px;
        height: 37px;
        color: #fff;
        ${favoriteChk ? "color:#fd3049" : "color:#fff"}
      `}
      onClick={e => {
        e.preventDefault();
        favoriteMutation.mutate();
      }}
      icon={favoriteChk ? faHeart : farHeart}
    ></FontAwesomeIcon>
  );
}

export default Index;
