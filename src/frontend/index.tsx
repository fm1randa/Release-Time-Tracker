import React from "react";
import ForgeReconciler, {
  Box,
  Button,
  Heading,
  Inline,
  SectionMessage,
  Spinner,
  Stack,
  Text,
  useProductContext,
} from "@forge/react";
import { safeInvoke } from "../lib/safe-invoke";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReleaseList } from "./components/release-list";
import { ReleaseWorklogs } from "./components/release-worklogs";

type ProjectFromContext = {
  key: string;
  type: string;
  id: string;
};

const App = () => {
  const productContext = useProductContext();
  const projectContext = productContext?.extension?.project as
    | ProjectFromContext
    | undefined;

  const {
    data: projectData,
    isPending: isProjectDataPending,
    isError: isProjectDataError,
    refetch,
  } = useQuery({
    queryKey: ["project-data", projectContext?.id],
    queryFn: async ({ queryKey }) => {
      const [_key, projectId] = queryKey;
      return safeInvoke("getProjectData", { projectId: projectId! });
    },
    enabled: !!projectContext,
    retry: false,
  });

  if (isProjectDataError) {
    return (
      <Stack space="space.100">
        <SectionMessage appearance="error">
          <Text>There was an error fetching the data</Text>
        </SectionMessage>
        <Button onClick={() => refetch()}>Retry</Button>
      </Stack>
    );
  }

  if (isProjectDataPending) {
    return (
      <Inline alignBlock="center" alignInline="center">
        <Spinner size={"xlarge"} />
      </Inline>
    );
  }

  return (
    <Inline space="space.100">
      <Stack>
        <ReleaseList versions={projectData.versions} />
      </Stack>
      <Stack grow="fill">
        <ReleaseWorklogs />
      </Stack>
    </Inline>
  );
};

const queryClient = new QueryClient();

ForgeReconciler.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
