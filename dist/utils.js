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
exports.getRandomJoke = exports.getMainParameters = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
exports.getMainParameters = () => {
    var _a, _b;
    const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN", { required: true });
    const { GITHUB_REPOSITORY_OWNER = "", GITHUB_REPOSITORY = "" } = process.env;
    const GITHUB_REPOSITORY_NAME = GITHUB_REPOSITORY.replace(`${GITHUB_REPOSITORY_OWNER}/`, "");
    const GITHUB_PULL_REQUEST_NUMBER = (_b = (_a = github.context) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.number;
    return {
        GITHUB_TOKEN,
        GITHUB_REPOSITORY_OWNER,
        GITHUB_PULL_REQUEST_NUMBER,
        GITHUB_REPOSITORY: GITHUB_REPOSITORY_NAME,
    };
};
exports.getRandomJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch("https://official-joke-api.appspot.com/random_joke").then((res) => res.json());
    return `Random joke of the day:
  ${resp.setup}

  ${resp.punchline}`;
});
