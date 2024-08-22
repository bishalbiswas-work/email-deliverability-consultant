import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataState from "ContextAPI/DataContext";


const LandingPagev2_EmailWarmup_Consultant = lazy(() => import("./Pages/LandingPagev2_EmailWarmup_Consultant"))

const LandingPageNewAutoEmailBuffer = lazy(() =>
  import("./Pages/LandingPageNewAutoEmailBuffer")
);


const ProjectRoutes = () => {

  return (
    <DataState>
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>

            <Route
              path="/"
              element={
                <Suspense fallback={<LandingPageNewAutoEmailBuffer />}>
                  <LandingPagev2_EmailWarmup_Consultant />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </Suspense>
    </DataState>
  );
};
export default ProjectRoutes;
