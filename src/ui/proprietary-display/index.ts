import { TSoftware } from "../../domain/software/software";
import { onState, state } from "../state";
import {
  onProprietaryResults,
  onSearchQuery,
} from "./proprietary-display.controller";

const onSearchQueryBinded = onSearchQuery(state);

onState<string>("searchQuery", onSearchQueryBinded);
onState<TSoftware[]>("results", onProprietaryResults);
