"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const utils_1 = require("./utils");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { GITHUB_REPOSITORY, GITHUB_REPOSITORY_OWNER, GITHUB_TOKEN, GITHUB_PULL_REQUEST_NUMBER } = utils_1.getMainParameters();
            const octokit = github.getOctokit(GITHUB_TOKEN);
            if (!Number.isInteger(GITHUB_PULL_REQUEST_NUMBER)) {
                throw new Error("Pull request number is required");
            }
            const jokeResponse = yield utils_1.getRandomJoke();
            octokit.pulls.createReview({
                owner: GITHUB_REPOSITORY_OWNER,
                repo: GITHUB_REPOSITORY,
                pull_number: GITHUB_PULL_REQUEST_NUMBER,
                body: jokeResponse,
                event: "COMMENT",
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
