import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import Home from "./home";

const refetch = vi.fn();

vi.mock("@workspace/api-client-react", () => ({
  useHealthCheck: vi.fn(),
}));

import { useHealthCheck } from "@workspace/api-client-react";

const mockedUseHealthCheck = vi.mocked(useHealthCheck);

describe("Home status page", () => {
  beforeEach(() => {
    refetch.mockReset();
  });

  it("shows the product title and a checking state while loading", () => {
    mockedUseHealthCheck.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false,
      isRefetching: false,
      refetch,
    } as never);

    render(<Home />);

    expect(screen.getByText("AI Stars Platform")).toBeInTheDocument();
    expect(screen.getByText(/Checking status/i)).toBeInTheDocument();
  });

  it("shows an online state when the health check succeeds", () => {
    mockedUseHealthCheck.mockReturnValue({
      data: {
        status: "ok",
        service: "api",
        timestamp: new Date().toISOString(),
      },
      isLoading: false,
      isError: false,
      isSuccess: true,
      isRefetching: false,
      refetch,
    } as never);

    render(<Home />);

    expect(screen.getByText(/All systems online/i)).toBeInTheDocument();
  });

  it("shows an offline state when the health check fails", () => {
    mockedUseHealthCheck.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isSuccess: false,
      isRefetching: false,
      refetch,
    } as never);

    render(<Home />);

    expect(screen.getByText(/System offline/i)).toBeInTheDocument();
  });

  it('triggers a refetch when "Check again" is clicked', () => {
    mockedUseHealthCheck.mockReturnValue({
      data: {
        status: "ok",
        service: "api",
        timestamp: new Date().toISOString(),
      },
      isLoading: false,
      isError: false,
      isSuccess: true,
      isRefetching: false,
      refetch,
    } as never);

    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /check again/i }));

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
