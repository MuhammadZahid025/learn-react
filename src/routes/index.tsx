import { Route, Routes } from "react-router";
import { AuthComponent } from "../auth/components/AuthComponent";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthComponent login={true} />} />
      <Route path="/signup" element={<AuthComponent login />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
