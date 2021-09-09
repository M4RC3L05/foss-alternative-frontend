import { searchPropriataryUseCase } from "../../use-cases/search-proprietary.use-case";
import { debounce } from "../../utils/functions";
import { TState } from "../state";

const onSearch = async (state: TState, txt: string) => {
  const { data, error } = await searchPropriataryUseCase({ term: txt });

  if (!data || error) {
    state.results = [];
    return;
  }

  state.results = [...data];
};

const doSearchDebounce = debounce(onSearch, 250);

export const onInputChange = (state: TState) => (event: Event) => {
  const txt = (event.target as HTMLInputElement).value;

  state.searchQuery = txt;
};

export const onTerm = (state: TState) => (term: string) => {
  if (term) {
    void doSearchDebounce(state, term);
  }
};
