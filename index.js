const core = require('@actions/core');
const github = require('@actions/github');

try {
  var baseVersion = core.getInput('baseversion', {required: false}) || 'v1.0.0-beta.1';
  core.info(`Input version: ${baseVersion}`);

  baseVersion = baseVersion.replace(/^(v)/,"");
  core.info(`Working version: ${baseVersion}`);

  core.info(process.env.GITHUB_SHA);
  const sha = process.env.GITHUB_SHA ? process.env.GITHUB_SHA.substring(0,8) : "undefined";
  core.info(`SHA: ${sha}`);

  core.info('Split versions on "."');
  const versionParts = baseVersion.split('.');
  versionParts.forEach(element => {
    core.info(`Version part: ${element}`);
  });

  core.info('Split release on "-"');
  const releaseParts = versionParts[2].split('-');
  releaseParts.forEach(element => {
    core.info(`Release part: ${element}`);
  });
  
  const time = new Date();
  const buildnumber = time.getHours() * 60 + time.getMinutes();

  const assemblyVersion = `${versionParts[0]}.${versionParts[1]}`;
  const fileVersion = `${versionParts[0]}.${versionParts[1]}.${releaseParts[0]}.${buildnumber}`;
  const informationalVersion = `${baseVersion}+${sha}`;
  const packageVersion = baseVersion;
  
  core.setOutput("version-assembly", assemblyVersion);
  core.setOutput("version-file", fileVersion);
  core.setOutput("version-informational", informationalVersion);
  core.setOutput("version-package", packageVersion);
  core.setOutput("buildnumber", buildnumber);
}
catch (error) {
  core.setFailed(error.message);
}