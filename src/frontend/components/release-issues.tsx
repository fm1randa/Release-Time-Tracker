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
  Text,
  useProductContext,
  EmptyState,
} from "@forge/react";
import { useReleaseStore } from "../../lib/release-store";
import { useQuery } from "@tanstack/react-query";
import { safeInvoke } from "../../lib/safe-invoke";
import { FunctionKey } from "../../lib/functions";
import { ProjectFromContext } from "../../types/project";
import { ErrorSectionMessage } from "./error-section-message";

export function ReleaseIssues() {
  const productContext = useProductContext();
  const projectContext = productContext?.extension?.project as
    | ProjectFromContext
    | undefined;
  const { selectedRelease } = useReleaseStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <Badge appearance="primary">9h</Badge>
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
              <Button onClick={() => openModal()}>
                <Inline space="space.100">
                  <Stack grow="hug">{issue.issueKey}</Stack>

                  <Box xcss={{ height: "100%", paddingTop: "space.050" }}>
                    <Icon glyph="chevron-right" label="Divider" size="medium" />
                  </Box>

                  <Stack grow="hug">{issue.summary}</Stack>
                  <Stack grow="fill">
                    <Inline alignInline="end" alignBlock="center">
                      <Box xcss={{ height: "100%" }}>
                        <Badge>{totalTimeSpentOnIssue}</Badge>
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
      <ModalTransition>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle>Duplicate this page</ModalTitle>
            </ModalHeader>
            <ModalBody>
              Voluptate laboris reprehenderit incididunt duis amet cillum fugiat
              incididunt aliquip occaecat. Ad dolor excepteur sint est voluptate
              aliquip occaecat veniam magna commodo mollit incididunt incididunt
              anim. Ex proident eiusmod cillum excepteur. Pariatur do
              exercitation quis sunt ex esse magna fugiat ut. Labore sint Lorem
              incididunt qui tempor sit ad reprehenderit amet magna. Aute
              adipisicing ipsum dolore dolore proident voluptate ut tempor
              excepteur est.
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={closeModal}>
                Duplicate
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </Box>
  );
}
