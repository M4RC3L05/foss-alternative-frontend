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

    if (typeof target[key as string] === "object") {
      return new Proxy(
        target[key as string] as Record<string, unknown>,
        handler(`${[previousKey, key].filter((x) => x).join(".")}`, onSet)
      );
    }

    return target[key as string];
  },
});

export const store = <T extends Record<string, unknown>>(initial: T) => {
  const __state: T = initial;
  const listeners = new Map<string, Array<TListener<any>>>();

  const onState = <T>(stateKey: string, fn: TListener<T>) => {
    if (!listeners.has(stateKey)) {
      listeners.set(stateKey, []);
    }

    listeners.get(stateKey)?.push(fn);
  };

  const state = new Proxy<T>(
    __state,
    handler("", (key, value, previous) => {
      if (previous !== value && listeners.has(key)) {
        for (const listener of listeners.get(key)!) {
          listener(value);
        }
      }
    })
  );

  return {
    state,
    onState,
  };
};
