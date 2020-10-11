import * as core from "@actions/core";
import * as github from "@actions/github";

export const getMainParameters = () => {
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN", { required: true });
  const { GITHUB_REPOSITORY_OWNER = "", GITHUB_REPOSITORY = "" } = process.env;
  const GITHUB_REPOSITORY_NAME = GITHUB_REPOSITORY.replace(`${GITHUB_REPOSITORY_OWNER}/`, "");
  const GITHUB_PULL_REQUEST_NUMBER = github.context?.payload?.number;

  return {
    GITHUB_TOKEN,
    GITHUB_REPOSITORY_OWNER,
    GITHUB_PULL_REQUEST_NUMBER,
    GITHUB_REPOSITORY: GITHUB_REPOSITORY_NAME,
  };
};

export const getRandomJoke = async () => {
  const resp = await fetch("https://official-joke-api.appspot.com/random_joke").then((res) => res.json());
  return `Random joke of the day:
  ${resp.setup}

  ${resp.punchline}`;
};
