import { searchPropriataryUseCase } from "../../use-cases/search-proprietary.use-case";
import { debounce } from "../../utils/functions";
import { TState } from "../state";

export const onInputChange = (state: TState) => (event: Event) => {
  const txt = (event.target as HTMLInputElement).value;

  state.searchQuery = txt;
};

export const onTerm = (state: TState) =>
  debounce(async (term: string) => {
    if (term) {
      const { data, error } = await searchPropriataryUseCase({ term });

      state.results = !data || error ? [] : data;
    }
  }, 250);
