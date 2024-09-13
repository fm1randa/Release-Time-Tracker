export type Worklog = {
  self: string;
  author: {
    self: string;
    accountId: string;
    emailAddress: string;
    avatarUrls: {
      "48x48": string;
      "24x24": string;
      "16x16": string;
      "32x32": string;
    };
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
  };
  updateAuthor: {
    self: string;
    accountId: string;
    emailAddress: string;
    avatarUrls: {
      "48x48": string;
      "24x24": string;
      "16x16": string;
      "32x32": string;
    };
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
  };
  created: string;
  updated: string;
  started: string;
  timeSpent: string;
  timeSpentSeconds: number;
  id: string;
  issueId: string;
};

export type Issue = {
  issueKey: string;
  id: string;
  summary: string;
  worklogs: Worklog[];
};

export type IssueResponse = {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: {
      summary: string;
      worklog: {
        startAt: number;
        maxResults: number;
        total: number;
        worklogs: Worklog[];
      };
    };
  }[];
};
