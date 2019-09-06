"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
// Native nodejs modules
const fs = __importStar(require("fs"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const find = core.getInput('find', { required: true });
            const replace = core.getInput('replace', { required: true });
            core.debug(`Scanning file names in checked out repo for '${find}'`);
            // Rename file
            fs.renameSync("README.md", "__README.md");
            // Git commands
            yield exec.exec("git", ["config", "--global", "user.email", "replace-bot@github.com"]);
            yield exec.exec("git", ["config", "--global", "user.name", "Find & Replace GitHub Action"]);
            yield exec.exec("git", ["status"]);
            yield exec.exec("git", ["commit", "-m", "Can we commit?", "-a"]);
            yield exec.exec("git", ["remote", "-v"]);
            yield exec.exec("git", ["push"]);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
//# sourceMappingURL=main.js.map