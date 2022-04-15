import Link from "next/link";
import Layout from "@components/layouts";
import {
  ListItem,
  WrapCategory,
  WrapCategoryList
} from "@components/pageComp/category/style";
import { CategoryLink } from "@components/layouts/Head";

function Category() {
  return (
    <Layout>
      <WrapCategory>
        <div className="inner">
          <h1>카테고리</h1>
          <div>
            <WrapCategoryList>
              {CategoryLink.map((cat, i) => (
                <Link
                  href={`${
                    cat.title !== "1Day" &&
                    cat.title !== "1Month" &&
                    cat.title !== "VOD"
                      ? `/view/${cat.url}`
                      : `${cat.url}`
                  }`}
                  key={i}
                >
                  <a>
                    <ListItem index={i}>
                      <div className="dimm" />
                      <div className="dimm_gradient" />
                      <span className="txt">{cat.title}</span>
                    </ListItem>
                  </a>
                </Link>
              ))}
            </WrapCategoryList>
          </div>
        </div>
      </WrapCategory>
    </Layout>
  );
}

export default Category;
