import { defineConfig } from "vite";

//change the port
const port = 3000;

export default defineConfig({
  server: {
    port,
    hmr: resolveHMR(),
  },
});

function resolveHMR() {
  const wssOptions = {
    protocol: "wss",
    clientPort: 443,
  };

  if (process.env.GITPOD_WORKSPACE_URL) {
    return {
      // removes the protocol and replaces it with the port we're connecting to
      host: process.env.GITPOD_WORKSPACE_URL.replace("https://", `${port}-`),
      ...wssOptions,
    };
  }

  if (process.env.CODESPACES) {
    return {
      host: `${process.env.CODESPACE_NAME}-${port}.preview.app.github.dev`,
      ...wssOptions,
    };
  }

  return true;
}
