import { useCallback, useState } from "react";

export const useUndo = <T>(initPresent: T) => {
  const [state, setState] = useState<{
    past: T[]; // 过去
    present: T; // 现在
    future: T[]; //将来
  }>({
    past: [],
    present: initPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0; // 有历史，可以回退
  const canReDo = state.future.length !== 0; // 有未来，可以前进

  // 回退
  const unDo = useCallback(() => {
    setState((curState) => {
      const { past, present, future } = curState;

      if (past.length === 0) return curState;

      // 回退列表中，最近的元素
      const previous = past[past.length - 1];
      //去掉最近的元素后的，可回退列表
      const newPast = past.slice(0, past.length - 1);
      // 未来列表，新增当前值
      const newFuture = [present, ...future];
      return {
        past: newPast,
        present: previous,
        future: newFuture,
      };
    });
  }, []);

  //  前进
  const reDo = useCallback(() => {
    setState((curState) => {
      const { past, present, future } = curState;
      if (future.length === 0) return curState;

      const previous = future[0];

      const newPast = [...past, present];

      const newFuture = future.slice(1);
      return {
        past: newPast,
        present: previous,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((curState) => {
      const { past, present, future } = curState;

      if (newPresent === present) return curState;
      const previous = newPresent;

      const newPast = [...past, present];
      return {
        past: newPast,
        present: previous,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent) => {
    setState((curState) => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, { set, reset, unDo, reDo }];
};
