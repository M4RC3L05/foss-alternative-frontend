import { html, render } from "lit-html";
import { TSoftware } from "../../domain/software/software";

const result = (
  software: TSoftware,
  onItemClick: (item: TSoftware) => void
) => html`
  <div
    @click=${() => {
      onItemClick(software);
    }}
  >
    <img .src=${software.iconLink!} .width=${50} .height=${60} />
    <p>${software.name}</p>
  </div>
`;

const results = (items: TSoftware[], onItemClick: (item: TSoftware) => void) =>
  html`${items.map((item) => result(item, onItemClick))}`;

export const renderResults = (
  items: TSoftware[],
  onItemClick: (item: TSoftware) => void
) => {
  render(
    results(items, onItemClick),
    document.querySelector<HTMLDivElement>("#proprietary-display")!
  );
};
