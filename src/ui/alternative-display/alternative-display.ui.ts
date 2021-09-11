import { html, render } from "lit-html";
import { TAlternative } from "../../domain/alternative/alternative";
import { TSoftware } from "../../domain/software/software";
import styles from "./alternative-display.module.css";

const alternative = (item: TAlternative & { openSource: TSoftware }) => html`
  <div
    .className=${styles.alternative__display__item}
    @click=${() => window.open(item.openSource.websiteLink ?? "", "_blank")}
  >
    <img
      .className=${styles.alternative__display__item__icon}
      .src=${item.openSource.iconLink!}
      .width=${50}
      .height=${50}
    />
    <p .className=${styles.alternative__display__item__name}>
      ${item.openSource.name}
    </p>
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
