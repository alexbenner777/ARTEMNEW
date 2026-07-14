import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/health", (_req, res) => {
  const data = HealthCheckResponse.parse({
    status: "ok",
    service: "api",
    timestamp: new Date(),
  });
  res.json(data);
});

export default router;
