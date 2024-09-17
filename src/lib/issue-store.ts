import { create } from "zustand";
import { Issue } from "../types/issue";

interface IssueState {
  selectedIssue: Issue | null;
  setSelectedIssue: (issue: Issue) => void;
}

export const useIssueStore = create<IssueState>((set) => ({
  selectedIssue: null,
  setSelectedIssue: (issue: Issue) =>
    set({
      selectedIssue: issue,
    }),
}));
