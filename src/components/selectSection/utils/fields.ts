import { useEffect, useRef } from "react";

export const getRandomInt = (min: number, max: number) => {
  const maxNum = Math.floor(Math.max(min, max));
  const minNum = Math.ceil(Math.min(min, max));

  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

export const isDefined = <T>(value: T | undefined): value is T => value !== undefined;
export const isKey = <T extends Object>(key: any, data: T): key is keyof T => key in data;
export const objectKeys = <T extends object, K = keyof T>(obj: T) => Object.keys(obj) as Array<K>;

export const useMemoFn = <T>(fn: T) => {
  const methodRef = useRef<T>(fn);
  useEffect(() => {
    methodRef.current = fn;
  }, [fn]);

  return methodRef;
};
