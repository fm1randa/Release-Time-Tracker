import React from "react";
import {
  Button,
  DynamicTable,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
  Tooltip,
} from "@forge/react";
import { create } from "zustand";
import { useIssueStore } from "../../lib/issue-store";
import { formatSeconds } from "../../lib/format-seconds";

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

interface WorklogsModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useWorklogsModalStore = create<WorklogsModalState>((set) => ({
  isOpen: false,
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false })),
}));

export function WorklogsModal() {
  const { isOpen, closeModal } = useWorklogsModalStore();
  const { selectedIssue } = useIssueStore();

  const head = {
    cells: [
      {
        key: "author-column",
        content: "Author",
        isSortable: true,
      },
      {
        key: "time-spent-column",
        content: "Time Spent",
        isSortable: true,
      },
      {
        key: "date-started-column",
        content: "Date Started",
        isSortable: true,
      },
      {
        key: "date-updated-column",
        content: "Date Updated",
        isSortable: true,
      },
    ],
  };
  const rows = selectedIssue?.worklogs.map((worklog, index) => {
    const BASE_KEY = `row-${index}-${worklog.id}`;
    return {
      key: BASE_KEY,
      cells: [
        {
          key: `${BASE_KEY}-author`,
          content: worklog.author.displayName,
        },
        {
          key: `${BASE_KEY}-time-spent`,
          content: formatSeconds(worklog.timeSpentSeconds),
        },
        {
          key: `${BASE_KEY}-date-started`,
          content: (
            <Tooltip content={worklog.started} position="mouse">
              {formatTimeAgo(worklog.started)}
            </Tooltip>
          ),
        },
        {
          key: `${BASE_KEY}-date-updated`,
          content: (
            <Tooltip content={worklog.updated}>
              {formatTimeAgo(worklog.updated)}
            </Tooltip>
          ),
        },
      ],
    };
  });

  return (
    <ModalTransition>
      {isOpen && (
        <Modal onClose={closeModal} width={"large"}>
          <ModalHeader>
            <ModalTitle>
              {selectedIssue?.issueKey}
              <Icon glyph="chevron-right" label="Divider" size="medium" />
              Worklogs
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <DynamicTable head={head} rows={rows} />
          </ModalBody>
          <ModalFooter>
            <Button appearance="subtle" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </ModalTransition>
  );
}
