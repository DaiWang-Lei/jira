import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: Object) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    //@ts-ignore
    const value = res[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete res[key];
    }
  });
  return res;
};

export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(array: T[]) => {
  debugger;
  const [value, setValue] = useState(array);
  const clear = () => setValue([]);
  const add = (params: T) => setValue([...value, params]);
  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.slice(index, 1);
    setValue(copy);
  };
  return { value, setValue, clear, add, removeIndex };
};
