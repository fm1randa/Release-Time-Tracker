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
import { ReleaseIssues } from "./components/release-issues";
import { FunctionKey } from "../lib/functions";
import { ProjectFromContext } from "../types/project";
import { ErrorSectionMessage } from "./components/error-section-message";

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
      return safeInvoke(FunctionKey.GET_PROJECT_DATA, {
        projectId: projectId!,
      });
    },
    enabled: !!projectContext,
    retry: false,
  });

  if (isProjectDataError) {
    return (
      <ErrorSectionMessage
        text="Could not fetch project data."
        onRetry={refetch}
      />
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
        <ReleaseIssues />
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
