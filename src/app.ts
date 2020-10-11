import * as core from "@actions/core";
import * as github from "@actions/github";
import { getMainParameters, getRandomJoke } from "./utils";

async function run() {
  try {
    const { GITHUB_REPOSITORY, GITHUB_REPOSITORY_OWNER, GITHUB_TOKEN, GITHUB_PULL_REQUEST_NUMBER } = getMainParameters();
    const octokit = github.getOctokit(GITHUB_TOKEN);

    if (!Number.isInteger(GITHUB_PULL_REQUEST_NUMBER)) {
      throw new Error("Pull request number is required");
    }

    const jokeResponse = await getRandomJoke();

    octokit.pulls.createReview({
      owner: GITHUB_REPOSITORY_OWNER,
      repo: GITHUB_REPOSITORY,
      pull_number: GITHUB_PULL_REQUEST_NUMBER,
      body: jokeResponse,
      event: "COMMENT",
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
