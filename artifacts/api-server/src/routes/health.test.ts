import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app";

describe("GET /api/health", () => {
  it("returns a valid health status payload", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: "ok",
      service: "api",
    });
    expect(typeof res.body.timestamp).toBe("string");
    expect(new Date(res.body.timestamp).toString()).not.toBe("Invalid Date");
  });

  it("returns 404 for the old /api/healthz path", async () => {
    const res = await request(app).get("/api/healthz");
    expect(res.status).toBe(404);
  });

  it("returns 404 with a JSON error for unknown routes", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
