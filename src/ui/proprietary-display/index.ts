import { TSoftware } from "../../domain/software/software";
import { onState, state } from "../state";
import {
  onSearchQuery,
  onRender,
  onIsSearching,
} from "./proprietary-display.controller";

const onSearchQueryBinded = onSearchQuery(state);

onState<string>("searchQuery", onSearchQueryBinded);
onState<boolean>("isSearching", onIsSearching);
onState<{
  searchQuery: string;
  results: TSoftware[];
  isSearching: boolean;
  isPerformingSearch: boolean;
}>(["isSearching", "isPerformingSearch", "results", "searchQuery"], onRender);
