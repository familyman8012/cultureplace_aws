import { SearchForm } from "@components/layouts/styles";
import { css } from "@emotion/react";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface ISearchComForm {
  handlerSearch: (e: SyntheticEvent) => void;
  findKeyWord: string;
  setfindKeyWord: Dispatch<SetStateAction<string>>;
  className: string;
}

const common = css`
  display: flex;
  width: fit-content;
  margin-left: auto;

  .btn-search {
    left: auto;
    right: 1.2rem;
  }
  input[type="text"] {
    padding: 0 1rem 0 1.5rem;
    &:focus {
      border: 1px solid #40a9ff;
    }
  }
`;

function SearchComForm({
  handlerSearch,
  findKeyWord,
  setfindKeyWord
}: ISearchComForm) {
  return (
    <SearchForm
      onSubmit={e => handlerSearch(e)}
      css={css`
        ${common}
      `}
    >
      <span className="btn-search" onClick={handlerSearch}></span>
      <label className="hiddenZoneV" htmlFor="search-input">
        함께 하고 싶은 제목, 팀리더를 검색해보세요.
      </label>
      <input
        type="text"
        name="keyword"
        placeholder="제목, 작성자를 검색해보세요."
        maxLength={50}
        autoComplete="off"
        value={findKeyWord}
        onChange={e => setfindKeyWord(e.currentTarget.value)}
      />
    </SearchForm>
  );
}

export default SearchComForm;
