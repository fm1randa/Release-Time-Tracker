import React, { useState } from "react";
import {
  Heading,
  Box,
  Spinner,
  Button,
  Icon,
  Stack,
  Inline,
  Badge,
  ModalTransition,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  useProductContext,
  EmptyState,
} from "@forge/react";
import { useReleaseStore } from "../../lib/release-store";
import { useQuery } from "@tanstack/react-query";
import { safeInvoke } from "../../lib/safe-invoke";
import { FunctionKey } from "../../lib/functions";
import { ProjectFromContext } from "../../types/project";
import { ErrorSectionMessage } from "./error-section-message";
import { Issue } from "../../types/issue";
import { useWorklogsModalStore, WorklogsModal } from "./worklogs-modal";
import { useIssueStore } from "../../lib/issue-store";
import { formatSeconds } from "../../lib/format-seconds";

function getTotalWorkedSeconds(issues: Issue[]): number {
  return issues.reduce((acc, issue) => {
    return (
      acc +
      issue.worklogs.reduce((acc, worklog) => {
        return acc + worklog.timeSpentSeconds;
      }, 0)
    );
  }, 0);
}

export function ReleaseIssues() {
  const productContext = useProductContext();
  const projectContext = productContext?.extension?.project as
    | ProjectFromContext
    | undefined;
  const { selectedRelease } = useReleaseStore();
  const { setSelectedIssue } = useIssueStore();
  const { openModal } = useWorklogsModalStore();

  const {
    data: issues,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["release-issues", selectedRelease?.id, projectContext?.id],
    queryFn: ({ queryKey }) => {
      const [_key, _selectedReleaseId, projectId] = queryKey;

      return safeInvoke(FunctionKey.GET_RELEASE_ISSUES, {
        projectId: projectId!,
        startDate: selectedRelease!.startDate,
        releaseDate: selectedRelease!.releaseDate,
      });
    },
    enabled: !!projectContext && !!selectedRelease,
    retry: false,
  });

  if (isError) {
    return (
      <ErrorSectionMessage
        text="Could not fetch release issues."
        onRetry={refetch}
      />
    );
  }

  if (!selectedRelease || isPending) {
    return <Spinner size={"medium"} />;
  }

  const { name, startDate, releaseDate } = selectedRelease;

  return (
    <Box
      xcss={{
        borderColor: "color.border",
        borderWidth: "border.width",
        borderStyle: "solid",
        borderRadius: "border.radius",
      }}
      padding="space.100"
    >
      <Heading as="h3">
        <Inline>
          {name}
          <Icon glyph="chevron-right" label="Divider" size="medium" />
          Worked issues
          <Box
            xcss={{
              height: "100%",
              paddingLeft: "space.150",
            }}
          >
            <Badge appearance="primary">
              {formatSeconds(getTotalWorkedSeconds(issues))}
            </Badge>
          </Box>
        </Inline>
      </Heading>
      <Box
        xcss={{
          color: "color.text.subtlest",
          paddingBottom: "space.200",
        }}
      >
        {startDate} - {releaseDate}
      </Box>
      {issues ? (
        <Stack space="space.100">
          {issues.map((issue) => {
            const totalTimeSpentOnIssue: number = issue.worklogs.reduce(
              (acc, worklog) => {
                return acc + worklog.timeSpentSeconds;
              },
              0
            );

            return (
              <Button
                onClick={() => {
                  setSelectedIssue(issue);
                  openModal();
                }}
              >
                <Inline space="space.100">
                  <Stack grow="hug">{issue.issueKey}</Stack>

                  <Box xcss={{ height: "100%", paddingTop: "space.050" }}>
                    <Icon glyph="chevron-right" label="Divider" size="medium" />
                  </Box>

                  <Stack grow="hug">{issue.summary}</Stack>
                  <Stack grow="fill">
                    <Inline alignInline="end" alignBlock="center">
                      <Box xcss={{ height: "100%" }}>
                        <Badge>{formatSeconds(totalTimeSpentOnIssue)}</Badge>
                      </Box>
                    </Inline>
                  </Stack>
                </Inline>
              </Button>
            );
          })}
        </Stack>
      ) : (
        <EmptyState
          header={"No issues found for this release"}
          primaryAction={
            <Button appearance="primary" onClick={refetch}>
              Refresh
            </Button>
          }
        />
      )}
      <WorklogsModal />
    </Box>
  );
}
