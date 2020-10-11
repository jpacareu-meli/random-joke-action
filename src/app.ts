import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("GITHUB_TOKEN", { required: true });
    const { GITHUB_REPOSITORY_OWNER: repositoryOwner = "", GITHUB_REPOSITORY = "" } = process.env;
    const octokit = github.getOctokit(token);
    const { payload }: any = github.context;
    const repositoryName = GITHUB_REPOSITORY.replace(`${repositoryOwner}/`, "");

    if (!Number.isInteger(payload?.number)) {
      throw new Error("Pull request number is required");
    }

    const res = await fetch("https://official-joke-api.appspot.com/random_joke").then((res) => res.json());

    const joke = `Random joke of the day:
    ${res.setup}

    ${res.punchline}`;

    octokit.pulls.createReview({
      owner: repositoryOwner,
      repo: repositoryName,
      pull_number: payload?.number,
      body: joke,
      event: "COMMENT",
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
