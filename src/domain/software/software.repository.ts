import { PostgrestResponse, PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../infra/supabase";
import {
  ESoftwareLicenceType,
  toSoftwareDomain,
  TSoftware,
  TSoftwareRaw,
} from "./software";

const query = () => supabase.from<TSoftwareRaw>("softwares");

export const getSugestions = async (): Promise<{
  original: PostgrestResponse<TSoftwareRaw>;
  data?: TSoftware[];
  count: number | null;
  error: PostgrestError | null;
}> =>
  query()
    .select()
    .eq("isSugestion", true)
    .then((data) => ({
      original: data,
      data: data.data?.map((item) => toSoftwareDomain(item)),
      count: data.count,
      error: data.error,
    }));

export const searchProprietarySoftware = async (
  term: string
): Promise<{
  original: PostgrestResponse<TSoftwareRaw>;
  data?: TSoftware[];
  count: number | null;
  error: PostgrestError | null;
}> =>
  query()
    .select()
    .eq("licenceType", ESoftwareLicenceType.PROPRIETARY)
    .ilike("name", `%${term}%`)
    .limit(10)
    .then((data) => ({
      original: data,
      data: data.data?.map((item) => toSoftwareDomain(item)),
      count: data.count,
      error: data.error,
    }));
