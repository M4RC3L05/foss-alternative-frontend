import { TAlternative } from "./domain/alternative/alternative";
import { getAlternativeTo } from "./domain/alternative/alternative-repository";
import { TSoftware } from "./domain/software/software";
import { searchProprietarySoftware } from "./domain/software/software-repository";
import { store } from "./infra/store";
import "./styles/main.scss";
import { debounce } from "./utils/functions";

const { state, onState } = store<{
  searchQuery: string;
  results: TSoftware[];
  selectedProprietary: TSoftware | null;
  alternatives: Array<TAlternative & { openSource: TSoftware }>;
}>({
  searchQuery: "",
  results: [],
  selectedProprietary: null,
  alternatives: [],
});

const searchInput = document.querySelector<HTMLInputElement>(
  "#alternative-search"
)!;
const searchResultsDisplay = document.querySelector<HTMLDivElement>(
  "#proprietary-display"
)!;
const alternativeDisplay = document.querySelector<HTMLDivElement>(
  "#alternatives-display"
)!;

/// logic

const doSearch = async (txt: string) => searchProprietarySoftware(txt);
const onSearch = async (txt: string) => {
  const { data, error } = await doSearch(txt);

  if (!data || error) {
    state.results = [];
    return;
  }

  state.results = [...data];
};

const doSearchDebounce = debounce(onSearch, 250);

const getAlternatives = async (proprietaryId: string) =>
  getAlternativeTo(proprietaryId);

const onProprietarySelected = async (item: TSoftware) => {
  const { data } = await getAlternatives(item.id);

  state.alternatives = data ?? [];
};

const onSearchResultClick = (item: TSoftware) => {
  state.selectedProprietary = item;
};

searchInput.addEventListener("input", (event) => {
  const txt = (event.target as HTMLInputElement).value;

  state.searchQuery = txt;
});

onState<string>("searchQuery", (x) => {
  if (x) {
    void doSearchDebounce(x);
  } else {
    state.results = [];
  }
});

/// results
const renderResults = (data: TSoftware[], to: HTMLElement) => {
  while (to?.firstChild) to.firstChild.remove();

  for (const item of data) {
    renderResult(item, to);
  }
};

const renderResult = (software: TSoftware, to: HTMLElement) => {
  const root = document.createElement("div");
  root.addEventListener("click", () => {
    onSearchResultClick(software);
  });

  const logo = document.createElement("img");
  logo.setAttribute("src", software.iconLink ?? "");
  logo.setAttribute("width", "50");
  logo.setAttribute("height", "50");

  const title = document.createElement("p");
  title.textContent = software.name;

  root.append(logo);
  root.append(title);

  to.append(root);
};

onState<TSoftware[]>("results", (results) => {
  renderResults(results, searchResultsDisplay);

  if (state.alternatives.length > 0) {
    console.log("clear alt");
    state.alternatives = [];
  }
});

const renderAlternatives = (
  alternatives: Array<TAlternative & { openSource: TSoftware }>,
  to: HTMLElement
) => {
  while (to?.firstChild) to.firstChild.remove();

  for (const item of alternatives) {
    renderAlternative(item, to);
  }
};

const renderAlternative = (
  item: TAlternative & { openSource: TSoftware },
  to: HTMLElement
) => {
  const root = document.createElement("div");

  const logo = document.createElement("img");
  logo.setAttribute("src", item.openSource.iconLink ?? "");
  logo.setAttribute("width", "50");
  logo.setAttribute("height", "50");

  const title = document.createElement("p");
  title.textContent = item.openSource.name;

  root.append(logo);
  root.append(title);

  to.append(root);
};

onState<Array<TAlternative & { openSource: TSoftware }>>(
  "alternatives",
  (alternatives) => {
    renderAlternatives(alternatives, alternativeDisplay);
  }
);

onState<TSoftware | null>("selectedProprietary", (item) => {
  if (item) {
    void onProprietarySelected(item);
  } else {
    state.alternatives = [];
  }
});
