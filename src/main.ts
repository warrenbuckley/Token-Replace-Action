import * as core from '@actions/core';
import * as exec from '@actions/exec';

// Native nodejs modules
import * as fs from 'fs';

async function run() {
  try {

    const find = core.getInput('find', { required: true });
    const replace = core.getInput('replace', { required: true });

    core.debug(`Scanning file names in checked out repo for '${find}'`);

    // Rename file
    fs.renameSync("README.md", "__README.md");

    // Git commands
    await exec.exec("git", ["config", "--global" , "user.email", "replace-bot@github.com"]);
    await exec.exec("git", ["config", "--global" , "user.name", "Find & Replace GitHub Action"]);

    await exec.exec("git", ["status"]);
    await exec.exec("git", ["commit", "-m", "Can we commit?", "-a"]);

    await exec.exec("git", ["remote", "-v"]);
    await exec.exec("git", ["push", "origin", "HEAD"]);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
