import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import { useProjectInfo } from "utils/project";
import { useTaskInfo } from "utils/task";
import { useUrlQueryParam } from "utils/url";

/**
 * 从url中获取当前项目id
 * @returns 当前打开的项目id
 */
export const useProjectidInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

/**
 * 从url中获取当前项目
 * @returns 当前打开的项目信息
 */
export const useProjectInUrl = () => useProjectInfo(useProjectidInUrl());

/**
 * 获取看板页地址栏中的数据
 * @returns 地址栏中的数据
 */
export const useKanbansSearchParams = () => ({
  projectId: useProjectidInUrl(),
});

/**
 * 获取看板需要变更时的相关依赖
 * @returns 变更的数据
 */
export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

/**
 * 获取任务页地址栏中的数据
 * @returns 地址栏中的数据
 */
export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectidInUrl();
  const debounceName = useDebounce(param.name,200)
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param,debounceName]
  );
};

/**
 * 获取任务页需要变更时的相关依赖
 * @returns 需要变更时的相关依赖
 */
export const useTasksQuerykey = () => ["tasks", useTasksSearchParams()];

/**
 *  修改任务，弹窗相关信息
 * @returns 任务弹窗的相关信息
 */
export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTaskInfo(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
