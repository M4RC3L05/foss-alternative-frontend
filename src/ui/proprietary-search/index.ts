import { onState, state } from "../state";
import { onInputChange, onTerm } from "./proprietary-search.controller";
import { searchInput } from "./proprietay-search.ui";

const onInputChangeBinded = onInputChange(state);
const onTermBinded = onTerm(state);

searchInput.addEventListener("input", onInputChangeBinded);

onState<string>("searchQuery", onTermBinded);
