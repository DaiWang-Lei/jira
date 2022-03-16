import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
export type StateProps = {
  projectModalvisible: boolean;
};

const initialState: StateProps = {
  projectModalvisible: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalvisible = true;
    },
    closeProjectModal(state) {
      state.projectModalvisible = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModalVisible = (state: RootState) => state.projectList.projectModalvisible;
