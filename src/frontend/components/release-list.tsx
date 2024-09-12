import { Box, Button, Heading, Icon, Inline, Stack } from "@forge/react";
import React from "react";
import { Version } from "../../types/version";

export function ReleaseList({ versions }: { versions: Version[] }) {
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
      <Stack space="space.100">
        <Heading as="h3">Releases</Heading>
        {versions.map((version) => (
          <Button>
            <Inline alignBlock="center">
              <Icon glyph="chevron-right" label="View worklogs" />
              {version.name}
            </Inline>
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
