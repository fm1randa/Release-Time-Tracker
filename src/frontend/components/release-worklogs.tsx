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
} from "@forge/react";
import { useReleaseStore } from "../../lib/release-store";

export function ReleaseWorklogs() {
  const { selectedRelease } = useReleaseStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!selectedRelease) {
    return <Spinner size={"medium"} />;
  }

  const { name, startDate, releaseDate } = selectedRelease;

  const issues = [
    {
      id: "1",
      issueKey: "AP-1",
      description: "Sint id commodo nostrud quis quis aliquip.",
      workedTime: "8h",
    },
    {
      id: "2",
      issueKey: "AP-2",
      description:
        "Cupidatat veniam laborum magna sunt exercitation culpa fugiat aliqua adipisicing incididunt incididunt ad excepteur.",
      workedTime: "1h",
    },
  ];

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
      <Stack space="space.100">
        {issues.map((issue) => (
          <Button onClick={() => openModal()}>
            <Inline space="space.100">
              <Stack grow="hug">{issue.issueKey}</Stack>

              <Box xcss={{ height: "100%", paddingTop: "space.050" }}>
                <Icon glyph="chevron-right" label="Divider" size="medium" />
              </Box>

              <Stack grow="hug">{issue.description}</Stack>
              <Stack grow="fill">
                <Inline alignInline="end" alignBlock="center">
                  <Box xcss={{ height: "100%" }}>
                    <Badge>{issue.workedTime}</Badge>
                  </Box>
                </Inline>
              </Stack>
            </Inline>
          </Button>
        ))}
      </Stack>
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
