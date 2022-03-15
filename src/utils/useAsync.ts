import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

type State<D> = {
  error: Error | null;
  data: null | D;
  stat: "pending" | "loading" | "error" | "success";
};
const defaultInitState: State<null> = {
  error: null,
  data: null,
  stat: "pending",
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};
export const useAsync = <D>(
  initState?: State<D>,
  initConfig?: typeof defaultConfig
) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultInitState,
      ...initState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        error: null,
        data: data,
        stat: "success",
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        stat: "error",
      }),
    [safeDispatch]
  );

  const running = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then()) {
        throw new Error("请传入Promise 类型的数据");
      }
      //重新加载
      setRetry(() => () => {
        if (runConfig?.retry) {
          running(runConfig.retry(), runConfig);
        }
      });

      // 解决页面由于state重复改变，导致页面无限刷新问题
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          //阻止在已卸载组件赋值
          setData(data);
          return data;
        })
        .catch((err) => {
          setError(err);
          return err;
        });
    },
    [setData, setError, safeDispatch]
  );
  return {
    isPending: state.stat === "pending",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    running,
    setData,
    setError,
    retry,
    ...state,
  };
};
