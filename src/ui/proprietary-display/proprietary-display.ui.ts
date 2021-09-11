import { html, render } from "lit-html";
import { TSoftware } from "../../domain/software/software";
import styles from "./proprietary-display.module.css";

export const displayProprietaryEle = document.querySelector<HTMLDivElement>(
  "#proprietary-display"
)!;

const searchResult = ({
  software,
  onItemClick,
}: {
  software: TSoftware;
  onItemClick: (item: TSoftware) => void;
}) => html`
  <div
    .className=${styles.search__results__item}
    @click=${() => {
      onItemClick(software);
    }}
  >
    <img .src=${software.iconLink!} .width=${50} .height=${60} />
    <div .className=${styles.search__results__item__info}>
      <p>${software.name}</p>
    </div>
  </div>
`;

const searchResults = ({
  results,
  isSearching,
  searchQuery,
  onItemClick,
  isPerformingSearch,
}: {
  results: TSoftware[];
  isSearching: boolean;
  searchQuery: string;
  isPerformingSearch: boolean;
  onItemClick: (item: TSoftware) => void;
}) =>
  html`
    ${searchQuery.length <= 0 &&
    isSearching &&
    !isPerformingSearch &&
    results.length <= 0
      ? html`<span style="color: #949494; margin-left: 20px"
          >Search results will appear here.</span
        >`
      : isSearching && !isPerformingSearch && results.length <= 0
      ? html`<span style="color: #949494; margin-left: 20px"
          >No results found.</span
        >`
      : isSearching && isPerformingSearch
      ? html`<span style="color: #949494; margin-left: 20px"
          >Searching...</span
        >`
      : results.map((item) => searchResult({ software: item, onItemClick }))}
  `;

export const renderResults = ({
  results,
  isPerformingSearch,
  isSearching,
  searchQuery,
  onItemClick,
}: {
  results: TSoftware[];
  isSearching: boolean;
  isPerformingSearch: boolean;
  searchQuery: string;
  onItemClick: (item: TSoftware) => void;
}) => {
  render(
    searchResults({
      results,
      isSearching,
      searchQuery,
      isPerformingSearch,
      onItemClick,
    }),
    displayProprietaryEle
  );
};
