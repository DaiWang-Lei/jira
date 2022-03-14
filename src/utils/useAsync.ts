import { useState } from "react";

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

  const setData = (data: D) =>
    setState({
      error: null,
      data: data,
      stat: "success",
    });

  const setError = (error: Error) =>
    setState({
      error: error,
      data: null,
      stat: "error",
    });

  const [retry, setRetry] = useState(() => () => {});
  const running = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then()) {
      throw new Error("请传入Promise 类型的数据");
    }
    //重新加载
    setRetry(() => () => {
      if(runConfig?.retry){
        running(runConfig.retry(),runConfig)
      }
    });

    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };
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
