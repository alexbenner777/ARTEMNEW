export interface ServerConfig {
  host: string;
  port: number;
}

/**
 * Resolves the host/port the API server should bind to.
 *
 * Port precedence: API_PORT -> PORT -> default "3001".
 * Host precedence: API_HOST -> default "0.0.0.0".
 *
 * Throws if the resolved port is not a valid positive integer.
 */
export function resolveServerConfig(
  env: Partial<Record<string, string | undefined>>,
): ServerConfig {
  const rawPort = env["API_PORT"] ?? env["PORT"] ?? "3001";
  const port = Number(rawPort);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid port value: "${rawPort}"`);
  }

  const host = env["API_HOST"] ?? "0.0.0.0";

  return { host, port };
}
