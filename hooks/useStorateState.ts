import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Params<T> {
  storageKey: string;
  defaultValue: T;
}

export const useStorageState = <T>(
  params: Params<T>
): [T, Dispatch<SetStateAction<T>>] => {
  const { storageKey, defaultValue } = params;

  const [value, setValue] = useState<T>((): T => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === null) return defaultValue;
    return JSON.parse(stored) as T;
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
