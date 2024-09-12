import { SafeResolver } from "../lib/safe-resolver";
import api, { route } from "@forge/api";
import { Version } from "../types/version";

type Project = {
  name: string;
};

const resolver = new SafeResolver();

resolver.define("getProjectData", async (req) => {
  const {
    payload: { projectId },
  } = req;

  const [versions] = await Promise.all([
    api
      .asApp()
      .requestJira(route`/rest/api/3/project/${projectId}/versions`)
      .then(async (response) => (await response.json()) as Version[]),
  ]);

  return {
    versions,
  };
});

export const handler = resolver.getDefinitions();
