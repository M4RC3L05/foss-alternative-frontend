import { TAlternative } from "../../domain/alternative/alternative";
import { TSoftware } from "../../domain/software/software";
import { onState, state } from "../state";
import {
  onAlternatives,
  onProprietarySelected,
  onResults,
} from "./alternative-display.controller";

const onProprietarySelectedBinded = onProprietarySelected(state);
const onResultBinded = onResults(state);

onState<Array<TAlternative & { openSource: TSoftware }>>(
  "alternatives",
  onAlternatives
);
onState<TSoftware | null>("selectedProprietary", onProprietarySelectedBinded);
onState<TSoftware[]>("results", onResultBinded);
