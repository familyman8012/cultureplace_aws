import Link from "next/link";
import axios from "axios";
import { useMainimg } from "@src/hooks/api/useMainimg";
import { useMutation, useQueryClient } from "react-query";
import AdminLayout from "@components/layouts/Admin/layout";
import { WrapMainVis } from "./styles";

function Mainvis() {
  const queryClient = useQueryClient();
  const { status, data, error } = useMainimg();

  const delteImgMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/mainvisimg/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("mainimgData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  return (
    <AdminLayout>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <WrapMainVis>
          <Link href="/admin/mainvis/upload">
            <a>메인비쥬얼 이미지 업로드</a>
          </Link>
          {data?.map(img => {
            return (
              <div className="item" key={img._id}>
                <span>
                  <img src={img.pclocation} className="pcimg" alt={img.alt} />
                </span>
                <span>
                  <img src={img.molocation} className="moimg" alt={img.alt} />
                </span>
                <button onClick={() => delteImgMutation.mutate(img._id)}>
                  삭제
                </button>
              </div>
            );
          })}
        </WrapMainVis>
      )}
    </AdminLayout>
  );
}

export default Mainvis;
