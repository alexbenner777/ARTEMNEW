import { describe, expect, it } from "vitest";
import { resolveServerConfig } from "./server-config";

describe("resolveServerConfig", () => {
  it("prefers API_PORT over PORT", () => {
    expect(resolveServerConfig({ API_PORT: "4000", PORT: "5000" }).port).toBe(
      4000,
    );
  });

  it("falls back to PORT when API_PORT is absent", () => {
    expect(resolveServerConfig({ PORT: "5000" }).port).toBe(5000);
  });

  it("defaults to 3001 when neither API_PORT nor PORT is set", () => {
    expect(resolveServerConfig({}).port).toBe(3001);
  });

  it("defaults API_HOST to 0.0.0.0", () => {
    expect(resolveServerConfig({}).host).toBe("0.0.0.0");
  });

  it("uses API_HOST when provided", () => {
    expect(resolveServerConfig({ API_HOST: "127.0.0.1" }).host).toBe(
      "127.0.0.1",
    );
  });

  it("rejects non-numeric port values", () => {
    expect(() => resolveServerConfig({ API_PORT: "not-a-number" })).toThrow();
  });

  it("rejects zero or negative port values", () => {
    expect(() => resolveServerConfig({ API_PORT: "0" })).toThrow();
    expect(() => resolveServerConfig({ API_PORT: "-1" })).toThrow();
  });

  it("rejects non-integer port values", () => {
    expect(() => resolveServerConfig({ API_PORT: "3001.5" })).toThrow();
  });
});
