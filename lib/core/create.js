const {
  createAction,
  addComponentAction,
  addPageAction,
  addStoreAction,
} = require("./actions");

const createCommands = (program) => {
  const options = program.opts();

  program
    .command("create-vue <project>")
    .description("set up a vue project, eg: tyung create-vue demo")
    .action(createAction);

  program
    .command("addcpn <name>")
    .description(
      "add a new component, eg: tyung addcpn NavBar [-d src/components]"
    )
    .action((name) =>
      addComponentAction(name, options.target || "src/components")
    );

  program
    .command("addpage <name>")
    .description(
      "add a new page and route config, eg: tyung addpage Home [-d src/pages]"
    )
    .action((name) =>
      addPageAction(name, options.target || `src/pages/${name.toLowerCase()}`)
    );

  program
    .command("addstore <name>")
    .description(
      "add a new store and type, eg: tyung addstore favor [-d src/store/modules]"
    )
    .action((name) =>
      addStoreAction(
        name,
        options.target || `src/store/modules/${name.toLowerCase()}`
      )
    );
};

module.exports = createCommands;
