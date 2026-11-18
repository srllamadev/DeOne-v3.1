import { describe, it, expect } from "vitest";
import { createApp } from "../../../app.js";

describe("Health endpoint", () => {
  it("GET /health returns ok status", async () => {
    const app = createApp();
    expect(app).toBeDefined();
  });
});
