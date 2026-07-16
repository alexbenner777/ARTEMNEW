import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import AppRouter from "@/app/router";

// ── Mock network layer ──────────────────────────────────────────────────────

vi.mock("@workspace/api-client-react", () => ({
  useHealthCheck: vi.fn(),
}));

import { useHealthCheck } from "@workspace/api-client-react";

const mockedUseHealthCheck = vi.mocked(useHealthCheck);

const mockRefetch = vi.fn();

const healthOnline = {
  data: { status: "ok", service: "api", timestamp: new Date().toISOString() },
  isLoading: false,
  isError: false,
  isSuccess: true,
  isRefetching: false,
  refetch: mockRefetch,
} as const;

const healthOffline = {
  data: undefined,
  isLoading: false,
  isError: true,
  isSuccess: false,
  isRefetching: false,
  refetch: mockRefetch,
} as const;

// ── Render helper ───────────────────────────────────────────────────────────

function renderApp(initialPath = "/") {
  const { hook } = memoryLocation({ path: initialPath });
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={qc}>
      <Router hook={hook}>
        <AppRouter />
      </Router>
    </QueryClientProvider>,
  );
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe("Application shell", () => {
  beforeEach(() => {
    mockedUseHealthCheck.mockReturnValue(healthOnline as never);
    mockRefetch.mockReset();
    localStorage.clear();
  });

  it("1. / redirects to /dashboard", async () => {
    renderApp("/");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /^dashboard$/i, level: 1 }),
      ).toBeInTheDocument();
    });
  });

  it("2. Dashboard renders inside the application shell", async () => {
    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("navigation", { name: /sidebar/i }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { name: /^dashboard$/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("3. All required navigation links exist", async () => {
    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /^dashboard$/i, level: 1 }),
      ).toBeInTheDocument();
    });
    const labels = [
      "Dashboard",
      "Models",
      "Fans",
      "Chats",
      "Templates",
      "Mass Messages",
      "Auto Messages",
      "Promo Renewals",
      "Analytics",
      "Team",
      "Settings",
    ];
    for (const label of labels) {
      expect(
        screen.getAllByRole("link", { name: new RegExp(`^${label}$`, "i") })
          .length,
      ).toBeGreaterThan(0);
    }
  });

  it("4. Clicking Models navigates to the Models page", async () => {
    const user = userEvent.setup();
    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /^dashboard$/i, level: 1 }),
      ).toBeInTheDocument();
    });
    const modelsLinks = screen.getAllByRole("link", { name: /^models$/i });
    await user.click(modelsLinks[0]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /^models$/i, level: 1 }),
      ).toBeInTheDocument();
    });
  });

  it("5. Navigation does not cause a full browser reload", async () => {
    const user = userEvent.setup();
    const reloadMock = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload: reloadMock });

    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /^dashboard$/i, level: 1 }),
      ).toBeInTheDocument();
    });
    const modelsLinks = screen.getAllByRole("link", { name: /^models$/i });
    await user.click(modelsLinks[0]);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /^models$/i, level: 1 }),
      ).toBeInTheDocument();
    });

    expect(reloadMock).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("6. Current navigation entry has active state", async () => {
    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /^dashboard$/i, level: 1 }),
      ).toBeInTheDocument();
    });
    const activeDashLinks = screen
      .getAllByRole("link", { name: /^dashboard$/i })
      .filter((el) => el.getAttribute("aria-current") === "page");
    expect(activeDashLinks.length).toBeGreaterThan(0);

    const activeModelsLinks = screen
      .getAllByRole("link", { name: /^models$/i })
      .filter((el) => el.getAttribute("aria-current") === "page");
    expect(activeModelsLinks.length).toBe(0);
  });

  it("7. Unknown route renders Not Found", async () => {
    renderApp("/this-route-does-not-exist");
    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { name: /page not found/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("8. Dashboard displays Online after a valid health response", async () => {
    mockedUseHealthCheck.mockReturnValue(healthOnline as never);
    renderApp("/dashboard");
    await waitFor(() => {
      expect(screen.getAllByText(/api online/i).length).toBeGreaterThan(0);
    });
  });

  it("9. Dashboard displays Offline after a failed health request", async () => {
    mockedUseHealthCheck.mockReturnValue(healthOffline as never);
    renderApp("/dashboard");
    await waitFor(() => {
      expect(screen.getAllByText(/api offline/i).length).toBeGreaterThan(0);
    });
  });

  it("10. Check again triggers a new health request", async () => {
    const user = userEvent.setup();
    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /check again/i }),
      ).toBeInTheDocument();
    });
    await user.click(screen.getByRole("button", { name: /check again/i }));
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("11. Sidebar collapse control is accessible", async () => {
    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /collapse sidebar|expand sidebar/i,
        }),
      ).toBeInTheDocument();
    });
  });

  it("12. Mobile menu button is accessible", async () => {
    renderApp("/dashboard");
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /open navigation menu/i }),
      ).toBeInTheDocument();
    });
  });

  it("13. Mobile navigation closes after selecting a route", async () => {
    const user = userEvent.setup();
    renderApp("/dashboard");

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /open navigation menu/i }),
      ).toBeInTheDocument();
    });

    // Open mobile nav
    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );

    // Mobile nav dialog should be visible
    const mobileDialog = screen.getByRole("dialog", { name: /navigation/i });
    expect(mobileDialog).toBeInTheDocument();

    // Click a link inside the mobile nav
    const mobileModelsLink = within(mobileDialog).getByRole("link", {
      name: /^models$/i,
    });
    await user.click(mobileModelsLink);

    // Dialog should be closed
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: /navigation/i }),
      ).not.toBeInTheDocument();
    });
  });
});
