import * as core from "@actions/core";
import * as github from "@actions/github";
import axios from "axios";

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
  const { data } = await axios.get("https://official-joke-api.appspot.com/random_joke");
  return `**Random joke of the day**:

  ${data.setup}

  ${data.punchline}

  😅`;
};
