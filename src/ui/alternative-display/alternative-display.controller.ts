import { TAlternative } from "../../domain/alternative/alternative";
import { TSoftware } from "../../domain/software/software";
import { getAlternativesToProprietaryUseCase } from "../../use-cases/get-alternatives-to-proprietary.use-cases";
import { TState } from "../state";
import { renderAlternatives } from "./alternative-display.ui";

export const onAlternatives = (
  alternatives: Array<TAlternative & { openSource: TSoftware }>
) => {
  renderAlternatives(alternatives);
};

export const onProprietarySelected =
  (state: TState) => async (item: TSoftware | null) => {
    if (item) {
      const { data } = await getAlternativesToProprietaryUseCase({
        proprietary: item,
      });

      state.alternatives = data;
    } else {
      state.alternatives = [];
    }
  };

export const onResults = (state: TState) => () => {
  if (state.alternatives.length > 0) {
    state.alternatives = [];
  }
};
