const helpOptions = (program) => {
  program.option("-t, --target <target>", "set target directory");

  program.on("--help", () => {
    console.log("\nusage:");
    console.log("  tyung -V");
    console.log("  tyung --version");
  });
};

module.exports = helpOptions;
