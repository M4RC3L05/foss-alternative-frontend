import { TSoftware } from "../../domain/software/software";
import { searchPropriataryUseCase } from "../../use-cases/search-proprietary.use-case";
import { debounce } from "../../utils/functions";
import { TState } from "../state";
import { searchInput } from "./proprietay-search.ui";

export const onInputChange = (state: TState) => (event: Event) => {
  const txt = (event.target as HTMLInputElement).value;

  state.searchQuery = txt;
};

export const onTerm = (state: TState) =>
  debounce(async (term: string) => {
    if (term) {
      state.isSearching = true;
      state.isPerformingSearch = true;
      state.selectedProprietary = null;

      const { data, error } = await searchPropriataryUseCase({ term });

      state.results = !data || error ? [] : data;
      state.isPerformingSearch = false;
    } else {
      state.selectedProprietary = null;
    }
  }, 250);

export const disableIsSearching = (state: TState) => (term: string) => {
  if (!term) {
    state.isSearching = false;
  }
};

export const onInputFocus = (state: TState) => (event: FocusEvent) => {
  state.isSearching = Boolean(event.type === "focusin");
};

export const onCloseSearchResult = (state: TState) => (event: Event) => {
  const doNotClose =
    (event as any as { path: HTMLElement[] }).path.includes(searchInput) ||
    (event as any as { path: HTMLElement[] }).path.includes(
      document.querySelector("#proprietary-display")!
    );

  if (!doNotClose) {
    onInputFocus(state)({ type: "focusout" } as any);
  }
};

export const onSetInputValueToSearchQuery = (state: TState) => () => {
  if (state.selectedProprietary) {
    searchInput.value = state.searchQuery;
  }
};

export const onSetSearchValueToSeelectedResultName = ({
  searchQuery,
  isSearching,
  selectedProprietary,
}: {
  searchQuery: string;
  selectedProprietary: TSoftware | null;
  isSearching: boolean;
}) => {
  if (searchQuery && !isSearching && selectedProprietary !== null) {
    searchInput.value = selectedProprietary.name;
  }
};
