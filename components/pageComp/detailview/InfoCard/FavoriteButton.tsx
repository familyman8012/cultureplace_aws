import { IProduct } from "@src/typings/db";
import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient, focusManager } from "react-query";
import { FavoriteState } from "./style";

function FavoriteButton({ _id, data }: { _id: string; data: IProduct }) {
  const [session] = useSession();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(
      data !== undefined &&
        data.favoriteduser.includes(String(session?.user?.uid))
    );
  }, [data, session?.user?.uid]);

  const variables = {
    _id: data?._id,
    favorite,
    userid: session?.user?.uid
  };
  const queryClient = useQueryClient();
  const favoriteMutation = useMutation(
    () => axios.post("/api/favorite", variables),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("detail");
        const previousDetail = queryClient.getQueryData<IProduct>("detail");
        console.log("previousDetail", previousDetail);
        if (previousDetail) {
          if (!favorite && session) {
            queryClient.setQueryData<IProduct>("detail", {
              ...previousDetail,
              favoriteduser: [...previousDetail.favoriteduser, session.user.uid]
            });
          } else {
            queryClient.setQueryData<IProduct>("detail", {
              ...previousDetail,
              favoriteduser: previousDetail.favoriteduser.filter(
                el => el !== session?.user.uid
              )
            });
          }
        }
        return { previousDetail };
      },
      onSuccess: () => {
        focusManager.setFocused(false);
        setTimeout(() => {
          queryClient.refetchQueries(["list"]);
        }, 500);
      },
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );
  return (
    <FavoriteState
      favorite={favorite}
      onClick={() => {
        session === null
          ? alert("로그인 후 즐겨찾기 가능합니다.")
          : favoriteMutation.mutate();
      }}
    />
  );
}

export default FavoriteButton;
