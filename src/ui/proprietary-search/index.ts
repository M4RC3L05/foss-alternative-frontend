import { TSoftware } from "../../domain/software/software";
import { onState, state } from "../state";
import {
  disableIsSearching,
  onInputChange,
  onInputFocus,
  onTerm,
  onCloseSearchResult,
  onSetInputValueToSearchQuery,
  onSetSearchValueToSeelectedResultName,
} from "./proprietary-search.controller";
import { searchInput } from "./proprietay-search.ui";

const onInputChangeBinded = onInputChange(state);
const onTermBinded = onTerm(state);
const disableIsSearchingBinded = disableIsSearching(state);
const onInputFocusBinded = onInputFocus(state);
const onCloseSearchResultBinded = onCloseSearchResult(state);
const onSetInputValueToSearchQueryBinded = onSetInputValueToSearchQuery(state);

searchInput.addEventListener("input", onInputChangeBinded);
searchInput.addEventListener("focusin", onInputFocusBinded);
window.addEventListener("click", onCloseSearchResultBinded);
searchInput.addEventListener("focusin", onSetInputValueToSearchQueryBinded);
onState<string>("searchQuery", onTermBinded);
onState<string>("searchQuery", disableIsSearchingBinded);
onState<{
  searchQuery: string;
  selectedProprietary: TSoftware | null;
  isSearching: boolean;
}>(
  ["selectedProprietary", "searchQuery", "isSearching"],
  onSetSearchValueToSeelectedResultName
);
