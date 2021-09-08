import { isPromise } from "./types";

export const debounce = <
  T extends
    | ((...args: any[]) => unknown)
    | ((...args: any[]) => Promise<unknown>)
>(
  fn: T,
  ms: number
) => {
  let tid: number;

  return async (
    ...args: Parameters<T>
  ): // @ts-expect-error: ok
  T extends (...args: any[]) => Promise<unknown>
    ? ReturnType<T>
    : T extends (...args: any[]) => unknown
    ? Promise<ReturnType<T>>
    : Promise<unknown> => {
    clearTimeout(tid);
    return new Promise<ReturnType<T>>((resolve, reject) => {
      tid = window.setTimeout(() => {
        try {
          const promise = fn(...args);

          if (isPromise(promise)) {
            promise
              .then((x) => {
                resolve(x);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            resolve(promise as any);
          }
        } catch (error: unknown) {
          reject(error);
        }
      }, ms);
    });
  };
};

export const wait = async (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
