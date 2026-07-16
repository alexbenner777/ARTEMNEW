import app from "./app";
import { logger } from "./lib/logger";
import { resolveServerConfig } from "./lib/server-config";

const { host, port } = resolveServerConfig(process.env);

const server = app.listen(port, host, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ host, port }, "Server listening");
});

function shutdown(signal: string) {
  logger.info({ signal }, "Received shutdown signal, closing server");
  server.close((closeErr) => {
    if (closeErr) {
      logger.error({ err: closeErr }, "Error during shutdown");
      process.exit(1);
    }
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
