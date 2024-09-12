import React from "react";
import ForgeReconciler, {
  Box,
  Heading,
  Inline,
  Spinner,
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
    return <Text>There was an error fetching the data</Text>;
  }

  if (isProjectDataPending) {
    return (
      <Inline alignBlock="center" alignInline="center">
        <Spinner size={"xlarge"} />
      </Inline>
    );
  }

  console.log(projectData);

  return (
    <>
      <ReleaseList versions={projectData.versions} />
    </>
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
