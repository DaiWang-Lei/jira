import { useCallback, useState } from "react";
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
export const useAsync = <D>(initState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initState,
  });
  const mountedRef = useMountedRef();
  const setData = useCallback(
    (data: D) =>
      setState({
        error: null,
        data: data,
        stat: "success",
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error: error,
        data: null,
        stat: "error",
      }),
    []
  );

  const [retry, setRetry] = useState(() => () => {});
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
      setState((preState) => ({ ...preState, stat: "loading" }));
      return promise
        .then((data) => {
          //阻止在已卸载组件赋值
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((err) => {
          setError(err);
          return err;
        });
    },
    [mountedRef, setData, setError]
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
