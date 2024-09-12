import React, { useEffect } from "react";
import { Box, Button, Heading, Icon, Inline, Stack } from "@forge/react";
import { Version } from "../../types/version";
import { useReleaseStore } from "../../lib/release-store";

export function ReleaseList({ versions }: { versions: Version[] }) {
  const { selectedRelease, setSelectedRelease } = useReleaseStore();

  useEffect(() => {
    if (selectedRelease) return;
    const { id, name, startDate, releaseDate } = versions[0];

    setSelectedRelease({
      id,
      name,
      startDate,
      releaseDate,
    });
  }, [selectedRelease, setSelectedRelease, versions]);

  return (
    <Box
      xcss={{
        width: "250px",
        borderColor: "color.border",
        borderWidth: "border.width",
        borderStyle: "solid",
        borderRadius: "border.radius",
      }}
      padding="space.100"
    >
      <Stack space="space.100">
        <Heading as="h3">Releases</Heading>
        {versions.map(({ id, name, startDate, releaseDate }) => (
          <Button
            isSelected={id === selectedRelease?.id}
            onClick={() =>
              setSelectedRelease({ id, name, startDate, releaseDate })
            }
          >
            <Inline alignBlock="center">
              <Icon glyph="chevron-right" label="View worklogs" />
              {name}
            </Inline>
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
