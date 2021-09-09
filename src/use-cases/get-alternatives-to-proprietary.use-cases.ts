import { getAlternativeTo } from "../domain/alternative/alternative.repository";
import { TSoftware } from "../domain/software/software";

export const getAlternativesToProprietaryUseCase = async ({
  proprietary,
}: {
  proprietary: TSoftware;
}) => getAlternativeTo(proprietary.id);
