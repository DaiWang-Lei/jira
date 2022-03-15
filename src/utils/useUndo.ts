import { useCallback, useReducer, useState } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type StateProps<T> = {
  past: T[]; // 过去
  present: T; // 现在
  future: T[]; //将来
};

type ActionProps<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
const undoReducer = <T>(state: StateProps<T>, action: ActionProps<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;
  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;
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
    }
    case REDO: {
      if (future.length === 0) return state;

      const previous = future[0];
      const newPast = [...past, present];
      const newFuture = future.slice(1);
      return {
        past: newPast,
        present: previous,
        future: newFuture,
      };
    }
    case SET: {
      if (newPresent === present) return state;
      const previous = newPresent;
      const newPast = [...past, present];
      return {
        past: newPast,
        present: previous,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
 };

export const useUndo = <T>(initPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initPresent,
    future: [],
  } as StateProps<T>);

  const canUndo = state.past.length !== 0; // 有历史，可以回退
  const canReDo = state.future.length !== 0; // 有未来，可以前进

  // 回退
  const unDo = useCallback(() => dispatch({ type: UNDO }), []);

  //  前进
  const reDo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );

  const reset = useCallback(
    (newPresent) => dispatch({ type: SET, newPresent }),
    []
  );

  return [state, { set, reset, unDo, reDo, canUndo, canReDo }];
};
