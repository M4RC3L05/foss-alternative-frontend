import get from "lodash.get";
import pick from "lodash.pick";

export type TListener<T> = (data: T) => void;

const handler = <T extends Record<string, unknown>>(
  previousKey: string,
  onSet: (key: string, value: unknown, previous: unknown) => void
): ProxyHandler<T> => ({
  set(target, key, value) {
    if (!(key in target)) {
      throw new Error(`"${key as string}" do not exists on object`);
    }

    const previous = target[key as string];
    // @ts-expect-error: ok
    target[key as string] = value as unknown;

    const listenerKey = [previousKey, key].filter((x) => x).join(".");

    onSet(listenerKey, value, previous);

    return true;
  },
  get(target, key) {
    if (!(key in target)) {
      throw new Error(`"${key as string}" do not exists on object`);
    }

    if (
      typeof target[key as string] === "object" &&
      !Array.isArray(target[key as string]) &&
      target[key as string] !== null &&
      target[key as string] !== undefined &&
      typeof target[key as string] !== "symbol"
    ) {
      return new Proxy(
        target[key as string] as Record<string, unknown>,
        handler(`${[previousKey, key].filter((x) => x).join(".")}`, onSet)
      );
    }

    return target[key as string];
  },
});

const isString = (x: any): x is string => typeof x === "string";

export const store = <T extends Record<string, unknown>>(initial: T) => {
  const __state: T = initial;
  const listeners = new Map<string, Array<TListener<any>>>();

  const onState = <T>(stateKey: string | string[], fn: TListener<T>) => {
    if (isString(stateKey)) {
      stateKey = [stateKey];
    }

    stateKey = stateKey.toString();

    if (!listeners.has(stateKey)) {
      listeners.set(stateKey, []);
    }

    listeners.get(stateKey)?.push(fn);
  };

  const state = new Proxy<T>(
    __state,
    handler("", (key, value, previous) => {
      const listenersKeys = [...listeners.keys()];
      const matchingKeys = listenersKeys.filter((lkey) =>
        lkey.split(",").includes(key)
      );
      if (previous !== value && matchingKeys.length > 0) {
        for (const lkey of matchingKeys) {
          for (const listener of listeners.get(lkey)!) {
            listener(pickState(lkey));
          }
        }
      }
    })
  );

  const pickState = (key: string) => {
    const keys = key.split(",");

    if (keys.length === 1) {
      return get(__state, key) as unknown;
    }

    return pick(__state, keys);
  };

  const notifyAll = () => {
    for (const [key, subs] of listeners.entries()) {
      const state = pickState(key);

      for (const sub of subs) {
        sub(state);
      }
    }
  };

  return {
    state,
    onState,
    notifyAll,
  };
};
