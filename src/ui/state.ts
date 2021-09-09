import { TAlternative } from "../domain/alternative/alternative";
import { TSoftware } from "../domain/software/software";
import { store } from "../infra/store";

export type TState = {
  searchQuery: string;
  results: TSoftware[];
  selectedProprietary: TSoftware | null;
  alternatives: Array<TAlternative & { openSource: TSoftware }>;
};

export const { state, onState } = store<TState>({
  searchQuery: "",
  results: [],
  selectedProprietary: null,
  alternatives: [],
});
