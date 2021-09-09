import { searchProprietarySoftware } from "../domain/software/software.repository";

export const searchPropriataryUseCase = async ({ term }: { term: string }) =>
  searchProprietarySoftware(term);
