export const isPromise = (x: any): x is Promise<any> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof x?.then === "function";
