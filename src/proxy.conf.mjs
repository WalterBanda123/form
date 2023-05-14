import {environment} from "./environment"

export default [
  {
    context: ["/users", "/companies"],
    target: environment.serverUrl,
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
  },
];
