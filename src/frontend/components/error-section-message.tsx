import { Stack, SectionMessage, Button, Text } from "@forge/react";
import React from "react";

export function ErrorSectionMessage({
  text,
  onRetry,
}: {
  text: string;
  onRetry: () => void;
}) {
  return (
    <Stack space="space.100">
      <SectionMessage appearance="error">
        <Text>{text}</Text>
      </SectionMessage>
      <Button onClick={onRetry}>Retry</Button>
    </Stack>
  );
}
