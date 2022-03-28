import { useLocation } from "react-router";
import { useProjectInfo } from "utils/project";

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
 export const useEpicsSearchParams = () => ({
  projectId: useProjectidInUrl(),
});

/**
 * 获取看板需要变更时的相关依赖
 * @returns 变更的数据
 */
export const useEpicsQueryKey = () => ["epics", useEpicsSearchParams()];
