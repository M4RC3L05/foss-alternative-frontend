import { TSoftware } from "../../domain/software/software";
import { state, TState } from "../state";
import { displayProprietaryEle, renderResults } from "./proprietary-display.ui";

const onSearchResultClick = (item: TSoftware) => {
  state.selectedProprietary = item;
  state.isSearching = false;
};

export const onSearchQuery = (state: TState) => (term: string) => {
  if (!term || term.length <= 0) {
    state.results = [];
  }
};

export const onRender = ({
  isPerformingSearch,
  isSearching,
  results,
  searchQuery,
}: {
  results: TSoftware[];
  isSearching: boolean;
  searchQuery: string;
  isPerformingSearch: boolean;
}) => {
  renderResults({
    isPerformingSearch,
    results,
    isSearching,
    searchQuery,
    onItemClick: onSearchResultClick,
  });
};

export const onIsSearching = (isSearching: boolean) => {
  displayProprietaryEle.style.display = isSearching ? "block" : "none";
};
