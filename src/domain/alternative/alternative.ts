import {
  toSoftwareDomain,
  TSoftware,
  TSoftwareRaw,
} from "../software/software";

export type TAlternative = {
  id: string;
  proprietaryId?: string;
  proprietary?: TSoftware;
  openSourceId?: string;
  openSource?: TSoftware;
};

export type TAlternativeRaw = {
  id: string;
  proprietaryId?: string;
  proprietary?: TSoftwareRaw;
  openSourceId?: string;
  openSource?: TSoftwareRaw;
};

export const toAlternativeDomain = (raw: TAlternativeRaw): TAlternative => ({
  ...raw,
  proprietary: raw.proprietary ? toSoftwareDomain(raw.proprietary) : undefined,
  openSource: raw.openSource ? toSoftwareDomain(raw.openSource) : undefined,
});
