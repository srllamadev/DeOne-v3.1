import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/components/HomePage";
import { LoginPage } from "@/components/LoginPage";
import { RegisterPage } from "@/components/RegisterPage";
import { DashboardPage } from "@/components/DashboardPage";
import { WalletDetailPage } from "@/components/WalletDetailPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/wallets/:id", element: <WalletDetailPage /> },
]);
