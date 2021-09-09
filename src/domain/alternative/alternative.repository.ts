import { supabase } from "../../infra/supabase";
import { TSoftware } from "../software/software";
import {
  TAlternative,
  TAlternativeRaw,
  toAlternativeDomain,
} from "./alternative";

const query = () => supabase.from<TAlternativeRaw>("alternatives");

export const getAlternativeTo = (id: string) =>
  query()
    .select("*, openSource:openSourceId(*)")
    .eq("proprietaryId", id)
    .then((result) => ({
      original: result,
      data: result.data?.map((item) => toAlternativeDomain(item)) as Array<
        TAlternative & { openSource: TSoftware }
      >,
    }));
