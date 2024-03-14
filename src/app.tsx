import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./hooks/authContext";

import { Loader } from "./components/loader/loader";

import { NotFound } from "./layouts/notFound";
import { DefaultLayout } from "./layouts/defaultLayout";
//pages
import { Signin } from "./pages/auth/signin";
import { Budget } from "./pages/budget/budget";

import { CLients } from "./pages/clients/clients";
import { Services } from "./pages/services/services";
import { Vehicles } from "./pages/vehicles/vehicles";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Signin />} />
          <Route path="/budget" element={<DefaultLayout />}>
            <Route index element={<Budget />} />
          </Route>
          <Route path="/client" element={<DefaultLayout />}>
            <Route index element={<CLients />} />
          </Route>
          <Route path="/service" element={<DefaultLayout />}>
            <Route index element={<Services />} />
          </Route>
          <Route path="/vehicle" element={<DefaultLayout />}>
            <Route index element={<Vehicles />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
