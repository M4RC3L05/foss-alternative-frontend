import { TAlternative } from "../../domain/alternative/alternative";
import { TSoftware } from "../../domain/software/software";
import { getAlternativesToProprietaryUseCase } from "../../use-cases/get-alternatives-to-proprietary.use-cases";
import { TState } from "../state";
import { renderAlternatives } from "./alternative-display.ui";

const getAlternativesToProprietary = async (state: TState, item: TSoftware) => {
  const { data } = await getAlternativesToProprietaryUseCase({
    proprietary: item,
  });

  state.alternatives = data ?? [];
};

export const onAlternatives = (
  alternatives: Array<TAlternative & { openSource: TSoftware }>
) => {
  renderAlternatives(alternatives);
};

export const onProprietarySelected =
  (state: TState) => (item: TSoftware | null) => {
    if (item) {
      void getAlternativesToProprietary(state, item);
    } else {
      state.alternatives = [];
    }
  };

export const onResults = (state: TState) => () => {
  if (state.alternatives.length > 0) {
    state.alternatives = [];
  }
};
