// import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Signin } from "./pages/auth/signin";

// import PageNotFound from "./layouts/PageNotFound";

import { AuthProvider } from "./hooks/authContext";

import { Loader } from "./components/loader/loader";

import { Dashboard } from "./pages/dashboard/dashboard";

import { NotFound } from "./layouts/notFound";
import { DefaultLayout } from "./layouts/defaultLayout";

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
        {/* <Toaster
          position="top-right"
          reverseOrder={false}
          containerClassName="overflow-auto"
        /> */}
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/dashboard" element={<Signin />} /> */}
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          {/* <Route path="/simulator" element={<DefaultLayout />}>
            <Route index element={<Simulator />} />
          </Route> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
