import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Launchpad } from "@/pages/launchpad";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { SubscriptionPage } from "@/pages/dashboard/Subscription";
import { PublicLayout } from "@/layout/PublicLayout";
import { AuthLayout } from "@/layout/AuthLayout";
import { DashboardLayout } from "@/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Home } from "@/pages/home";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/launchpad" element={<Launchpad />} />
        </Route>

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}