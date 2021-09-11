import { TAlternative } from "../domain/alternative/alternative";
import { TSoftware } from "../domain/software/software";
import { store } from "../infra/store";

export type TState = {
  searchQuery: string;
  results: TSoftware[];
  selectedProprietary: TSoftware | null;
  alternatives: Array<TAlternative & { openSource: TSoftware }>;
  isSearching: boolean;
  isPerformingSearch: boolean;
  isSearchQueryInFocus: boolean;
};

export const { state, onState, notifyAll } = store<TState>({
  searchQuery: "",
  results: [],
  selectedProprietary: null,
  alternatives: [],
  isSearching: false,
  isPerformingSearch: false,
  isSearchQueryInFocus: false,
});
