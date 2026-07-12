import { afterEach, describe, expect, it, vi } from "vitest";
import { PROJECTS } from "@/features/portfolio/constants";

/**
 * NEXT_PUBLIC_CRM_API_URL is read once at module load into a top-level
 * const, so each scenario needs vi.resetModules() + a fresh dynamic import
 * after stubbing the env var, rather than just re-calling the same import.
 */
async function importFreshModule() {
  vi.resetModules();
  return import("./get-projects");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("getProjects / getProjectBySlug — no CRM API configured", () => {
  it("returns the local placeholder projects untouched", async () => {
    vi.stubEnv("NEXT_PUBLIC_CRM_API_URL", "");
    const { getProjects } = await importFreshModule();
    await expect(getProjects()).resolves.toEqual(PROJECTS);
  });

  it("finds a project by slug locally", async () => {
    vi.stubEnv("NEXT_PUBLIC_CRM_API_URL", "");
    const { getProjectBySlug } = await importFreshModule();
    await expect(getProjectBySlug("crm-nexus")).resolves.toEqual(
      PROJECTS.find((p) => p.slug === "crm-nexus"),
    );
    await expect(getProjectBySlug("does-not-exist")).resolves.toBeUndefined();
  });
});

describe("getProjects / getProjectBySlug — CRM API configured", () => {
  it("returns the API's data on a successful response", async () => {
    vi.stubEnv("NEXT_PUBLIC_CRM_API_URL", "https://crm.example.com/api");
    const apiProjects = [{ ...PROJECTS[0], title: "From the API" }];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(apiProjects) }),
    );

    const { getProjects } = await importFreshModule();
    await expect(getProjects()).resolves.toEqual(apiProjects);
  });

  it("falls back to local data when the API responds with an error status", async () => {
    vi.stubEnv("NEXT_PUBLIC_CRM_API_URL", "https://crm.example.com/api");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    const { getProjects } = await importFreshModule();
    await expect(getProjects()).resolves.toEqual(PROJECTS);
  });

  it("falls back to local data when the fetch throws", async () => {
    vi.stubEnv("NEXT_PUBLIC_CRM_API_URL", "https://crm.example.com/api");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const { getProjects } = await importFreshModule();
    await expect(getProjects()).resolves.toEqual(PROJECTS);
  });

  it("returns undefined for a 404 project instead of falling back", async () => {
    vi.stubEnv("NEXT_PUBLIC_CRM_API_URL", "https://crm.example.com/api");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));

    const { getProjectBySlug } = await importFreshModule();
    await expect(getProjectBySlug("crm-nexus")).resolves.toBeUndefined();
  });
});
