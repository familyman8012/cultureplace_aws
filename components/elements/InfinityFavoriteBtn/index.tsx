import { useMemo } from "react";
import { useSession } from "next-auth/client";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { FavoriteBtn } from "./styles";
import { IProduct } from "@src/typings/db";

export interface IFavoritebtn {
  data: IProduct;
  querykey: string;
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
        await queryClient.cancelQueries(querykey);
        const previousLoadDetail = queryClient.getQueryData<{
          pages: Ipages[];
          pageParams: number[];
        }>(querykey);
        const previousDetail = previousLoadDetail?.pages[0].products;

        const updateProduct = previousDetail?.filter(
          el => el._id === data?._id
        );
        if (previousDetail && updateProduct) {
          if (!favoriteChk) {
            updateProduct[0].favoriteduser = [
              String(...updateProduct[0].favoriteduser),
              String(session?.user.uid)
            ];
            queryClient.setQueryData(querykey, previousLoadDetail);
          } else {
            updateProduct[0].favoriteduser =
              updateProduct[0].favoriteduser.filter(
                el => el !== session?.user.uid
              );
            queryClient.setQueryData(querykey, previousLoadDetail);
          }
        }
      },
      // onSuccess: () => queryClient.invalidateQueries("detailViewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  return (
    <FavoriteBtn
      on={favoriteChk ? "on" : "off"}
      onClick={e => {
        e.preventDefault();
        favoriteMutation.mutate();
      }}
    />
  );
}

export default Index;
