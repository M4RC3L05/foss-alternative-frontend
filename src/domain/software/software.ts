export enum ESoftwareLicenceType {
  PROPRIETARY = "proprietary",
  OPEN_SOURCE = "open source",
}

export enum ESoftwareMonetaryType {
  PAID = "paid",
  FREEMIUM = "freemium",
  FREE = "free",
}

export type TSoftware = {
  id: string;
  name: string;
  isSugestion: boolean;
  lead?: string;
  description?: string;
  licenceType: ESoftwareLicenceType;
  monetaryType: ESoftwareMonetaryType;
  licence?: string;
  iconLink?: string;
  repoLink?: string;
  websiteLink?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TSoftwareRaw = {
  id: string;
  name: string;
  lead?: string;
  isSugestion: boolean;
  description?: string;
  licenceType: ESoftwareLicenceType;
  monetaryType: ESoftwareMonetaryType;
  licence?: string;
  iconLink?: string;
  repoLink?: string;
  websiteLink?: string;
  createdAt: string;
  updatedAt: string;
};

export const newSoftware = (raw: TSoftwareRaw | TSoftware): TSoftware => ({
  ...raw,
  createdAt: new Date(raw.createdAt),
  updatedAt: new Date(raw.updatedAt),
});

export const toSoftwareDomain = (raw: TSoftwareRaw): TSoftware => ({
  ...raw,
  createdAt: new Date(raw.createdAt),
  updatedAt: new Date(raw.updatedAt),
});

export const toSoftwarePersistant = (software: TSoftware): TSoftwareRaw => ({
  ...software,
  createdAt: software.createdAt.toISOString(),
  updatedAt: software.updatedAt.toISOString(),
});
