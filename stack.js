const pathfs = require("path");

/** @type {import('@iryu54/stack-monitor').StackFile} */
const stack = (stackMonitor) => {
  stackMonitor.onLaunch((service) => console.log(`▶️ ${service?.label}`));
  stackMonitor.onServiceCrash((service) => console.log(`❌ ${service?.label}`));
  stackMonitor.onServiceRestart((service) => console.log(`🔃 ${service?.label}`));
  stackMonitor.onServiceKill((service) => console.log(`❌ ${service?.label}`));
  return {
    services: [
      {
        label: "dashboard - Serveur",
        spawnCmd: "npm",
        spawnArgs: ["run", "serve"],
        urls: ["http://localhost:4215"],
        rootPath: pathfs.resolve(__dirname),
        spawnOptions: {
          cwd: pathfs.resolve(__dirname, "server"),
          env: Object.assign({
            PORT: "4215",
            MONGODB_URL: `mongodb://root:123456@localhost:27017/dashboard?authSource=admin`,
            JWT_PRIVATE_KEY: 'this is a really good hidden key ;)',
          }),
        },
      },
      {
        label: "dashboard - Front",
        spawnCmd: "npm",
        spawnArgs: ["run", "serve"],
        urls: ["http://localhost:3000"],
        rootPath: pathfs.resolve(__dirname),
        spawnOptions: {
          cwd: pathfs.resolve(__dirname, "front"),
          env: Object.assign({
            VITE_APP_SERVER_URL: "http://localhost:4215",
            VITE_APP_VERSION: "v0.0.0",
          }),
        },
      },
    ],
  };
}

module.exports = stack;
