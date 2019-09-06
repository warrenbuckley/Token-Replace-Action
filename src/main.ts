import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fs from 'fs';

async function run() {
  try {

    const find = core.getInput('find', { required: true });
    const replace = core.getInput('replace', { required: true });

    core.debug(`Scanning file names in checked out repo for '${find}'`);

    // Rename file
    fs.renameSync("README.md", "__README.md");

    // Git status
    await exec.exec("git", ["status"]);
    await exec.exec("git", ["add", "."]);
    await exec.exec("git", ["commit", "-m", "Can we commit?"]);
    await exec.exec("git", ["push origin"]);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
