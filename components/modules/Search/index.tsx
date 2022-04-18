import { useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { searchStore } from "@src/mobx/store";
import {
  Content,
  FilterFindWrap,
  MobileLayerHead,
  ResultBtnWrap,
  SearchInputWrap,
  SearchWrap
} from "./style";
import { CloseBtn } from "@components/elements/CloseBtn/style";

const filterFindList = [
  {
    title: "장소",
    option: ["강남", "신촌", "홍대", "이태원", "대학로", "종로", "온라인"],
    optionName: [""]
  },
  {
    title: "요일",
    option: [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일"
    ],
    optionName: [""]
  },
  {
    title: "관심분야",
    option: [
      "healing",
      "theater",
      "art",
      "music",
      "food",
      "movie",
      "fashion",
      "wisdom"
    ],
    optionName: [
      "힐링산책",
      "공연",
      "미술",
      "뮤직",
      "미식",
      "사진, 영상",
      "패션",
      "지식"
    ]
  }
];

function Index({
  pageNum,
  refetch,
  className,
  filterView,
  handlerFilterView
}: {
  pageNum: number;
  refetch: () => void;
  className: string;
  filterView: boolean;
  handlerFilterView: (status: boolean) => void;
}) {
  const handlerReset = useCallback(() => {
    searchStore.onInit(filterFindList);
    searchStore.onReset(pageNum);
    refetch();
  }, [pageNum, refetch]);

  const handlerApply = useCallback(() => {
    searchStore.onApply(pageNum);
    refetch();
    if (filterView) {
      const ApplyTime = setTimeout(() => {
        handlerFilterView(false);
        clearTimeout(ApplyTime);
      }, 1000);
    }
  }, [filterView, handlerFilterView, pageNum, refetch]);

  const submitApply = (e: React.FormEvent) => {
    e.preventDefault();
    handlerApply();
  };

  useEffect(() => {
    searchStore.onInit(filterFindList);
    return () => {
      handlerReset();
    };
  }, [handlerReset]);

  return (
    <SearchWrap className={className} onSubmit={submitApply}>
      <MobileLayerHead>
        <CloseBtn onClick={() => handlerFilterView(false)} />
        <h1>필터</h1>
      </MobileLayerHead>
      {/* <Loader /> */}
      <Content>
        <FilterFindWrap>
          {filterFindList.map((item, i: number) => {
            return (
              <li key={i}>
                <div className="title">
                  {i === 0 && "지역"}
                  {i === 1 && "요일"}
                  {i === 2 && "카테고리"}
                </div>
                <div className="box_item">
                  {item.option.map((el, j) => (
                    <div key={el}>
                      <input
                        type="checkbox"
                        id={el}
                        value={el}
                        checked={
                          searchStore.filterFind.every(
                            (el: string[]) => el.length === 0
                          )
                            ? false
                            : searchStore.filterFind[i].includes(el)
                        }
                        onChange={e =>
                          searchStore.onCheckboxChange(
                            i,
                            String(e.target.value)
                          )
                        }
                      />
                      {i !== 2 ? (
                        <label htmlFor={el}>{el}</label>
                      ) : (
                        <label htmlFor={el}>{item.optionName[j]}</label>
                      )}
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </FilterFindWrap>
        <SearchInputWrap>
          <div className="title">키워드</div>
          <input
            type="text"
            name="searchInput"
            placeholder="함께 하고 싶은 제목,  팀리더를 검색해보세요."
            value={searchStore.searchInput}
            onChange={e => searchStore.onsearchInput(e)}
          />
        </SearchInputWrap>
        <ResultBtnWrap>
          <div className="title">조합검색</div>
          <div className="box_btn">
            <button className="onSubmit" onClick={handlerApply}>
              적용
            </button>
            <button className="onReset" onClick={handlerReset}>
              검색조건초기화
            </button>
          </div>
        </ResultBtnWrap>
        <p className="txt_notice">
          * 조합하고 싶은 항목들을 선택해 검색하실 수 있습니다.
          <br /> (지역, 요일, 카테고리, 키워드 검색 중 1개~4개 항목선택가능)
        </p>
      </Content>
    </SearchWrap>
  );
}

export default observer(Index);
