import { html, render } from "lit-html";
import { TAlternative } from "../../domain/alternative/alternative";
import { TSoftware } from "../../domain/software/software";

const alternative = (item: TAlternative & { openSource: TSoftware }) => html`
  <div>
    <img .src=${item.openSource.iconLink!} .width=${50} .height=${50} />
    <p>${item.openSource.name}</p>
  </div>
`;

const alternatives = (items: Array<TAlternative & { openSource: TSoftware }>) =>
  html`${items.map((item) => alternative(item))}`;

export const renderAlternatives = (
  items: Array<TAlternative & { openSource: TSoftware }>
) => {
  render(
    alternatives(items),
    document.querySelector<HTMLDivElement>("#alternatives-display")!
  );
};
