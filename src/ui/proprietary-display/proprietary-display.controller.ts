import { TSoftware } from "../../domain/software/software";
import { state, TState } from "../state";
import { renderResults } from "./proprietary-display.ui";

const onSearchResultClick = (item: TSoftware) => {
  state.selectedProprietary = item;
};

export const onProprietaryResults = (results: TSoftware[]) => {
  renderResults(results, onSearchResultClick);
};

export const onSearchQuery = (state: TState) => (term: string) => {
  if (!term) {
    state.results = [];
  }
};
