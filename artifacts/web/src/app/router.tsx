import { Switch, Route, Redirect } from "wouter";
import AppShell from "@/components/layout/app-shell";
import DashboardPage from "@/pages/dashboard-page";
import ModulePlaceholderPage from "@/pages/module-placeholder-page";
import NotFoundPage from "@/pages/not-found-page";
import { navItems } from "@/components/navigation/navigation-config";

export default function AppRouter() {
  return (
    <Switch>
      {/* Redirect / → /dashboard */}
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>

      {/* Dashboard */}
      <Route path="/dashboard">
        <AppShell>
          <DashboardPage />
        </AppShell>
      </Route>

      {/* All module placeholder pages */}
      {navItems
        .filter((item) => item.path !== "/dashboard")
        .map((item) => (
          <Route key={item.path} path={item.path}>
            <AppShell>
              <ModulePlaceholderPage navItem={item} />
            </AppShell>
          </Route>
        ))}

      {/* Catch-all 404 */}
      <Route>
        <AppShell>
          <NotFoundPage />
        </AppShell>
      </Route>
    </Switch>
  );
}
