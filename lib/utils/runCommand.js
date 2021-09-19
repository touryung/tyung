const { spawn } = require("child_process");

const commandSpawn = (...commandArgs) => {
  return new Promise((resolve, reject) => {
    try {
      const childProcess = spawn(...commandArgs);

      childProcess.stdout.pipe(process.stdout);
      childProcess.stderr.pipe(process.stderr);

      childProcess.on("close", resolve);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = commandSpawn;
