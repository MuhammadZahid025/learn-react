import { Route, Routes } from "react-router";
import { AuthComponent } from "../auth/components/AuthComponent";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Layout } from "../components/Layout";
import Content from "../components/Content";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthComponent login={true} />} />
      <Route path="/signup" element={<AuthComponent login={false} />} />
      <Route path="*" element={<div>Not Found</div>} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Content />} />
          <Route path="/filter" element={<div>Filter</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
