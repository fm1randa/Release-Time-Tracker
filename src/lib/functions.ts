import { Version } from "../types/version";

export type RegisteredFunctions = {
  getProjectData: {
    returnType: Promise<{
      versions: Version[];
    }>;
    payloadType: {
      projectId: string;
    };
  };
};

export type RegisteredFunction = keyof RegisteredFunctions;
