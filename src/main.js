const core = require("@actions/core");

async function run() {
  try {
    core.startGroup("Debug info");
    core.info(`RUNNER_DEBUG = ${process.env.RUNNER_DEBUG}`);
    core.info(`GITHUB_OUTPUT = ${process.env.GITHUB_OUTPUT}`);
    core.endGroup();

    core.debug("Debug is enabled...");

    core.startGroup("Construct version parts");
    var baseVersion =
      core.getInput("baseversion", { required: false }) || "v1.0.0-beta.1";
    core.info(`Input version: ${baseVersion}`);

    baseVersion = baseVersion.replace(/^(v)/, "");
    core.info(`Working version: ${baseVersion}`);

    core.info(process.env.GITHUB_SHA);
    const sha = process.env.GITHUB_SHA
      ? process.env.GITHUB_SHA.substring(0, 8)
      : "undefined";
    core.info(`SHA: ${sha}`);

    core.info('Split versions on "."');
    const versionParts = baseVersion.split(".");
    versionParts.forEach((element) => {
      core.info(`Version part: ${element}`);
    });

    core.info('Split release on "-"');
    const releaseParts = versionParts[2].split("-");
    releaseParts.forEach((element) => {
      core.info(`Release part: ${element}`);
    });

    const time = new Date();
    const buildnumber = time.getHours() * 60 + time.getMinutes();
    core.endGroup();

    core.startGroup("Generate numbers");
    const assemblyVersion = `${versionParts[0]}.${versionParts[1]}`;
    const fileVersion = `${versionParts[0]}.${versionParts[1]}.${releaseParts[0]}.${buildnumber}`;
    const informationalVersion = `${baseVersion}+${sha}`;
    const packageVersion = baseVersion;

    core.info(`assemblyVersion: ${assemblyVersion}`);
    core.info(`fileVersion: ${fileVersion}`);
    core.info(`informationalVersion: ${informationalVersion}`);
    core.info(`packageVersion: ${packageVersion}`);
    core.info(`buildnumber: ${buildnumber}`);
    core.endGroup();

    core.startGroup("Setting action outputs.");
    core.info("Setting version-assembly");
    core.setOutput("version-assembly", `${assemblyVersion}`);

    core.info("Setting version-file");
    core.setOutput("version-file", fileVersion);

    core.info("Setting version-informational");
    core.setOutput("version-informational", informationalVersion);

    core.info("Setting version-package");
    core.setOutput("version-package", packageVersion);

    core.info("Setting buildnumber");
    core.setOutput("buildnumber", buildnumber);
    core.endGroup();

    core.info("Action done!");
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run,
};
