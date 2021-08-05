import React, { Suspense, lazy } from "react";
import "./1-css/App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { LoadingSpinnerFullPage } from "./3-components/LoadingComponents";
import Nav from "./3-components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = lazy(() => import("./2-pages/About"));
const Missions = lazy(() => import("./2-pages/Missions"));
const Realisations = lazy(() => import("./2-pages/Realisations"));
const Contact = lazy(() => import("./2-pages/Contact"));
const Realisation_Page = lazy(() => import("./2-pages/Realisation_Page"));
const Auth = lazy(() => import("./2-pages/Auth"));
const Admin = lazy(() => import("./2-pages/Admin"));

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Suspense fallback={<LoadingSpinnerFullPage />}>
          <Switch>
            <Route path="/a-propos" exact render={() => <About />} />
            <Route path="/missions" render={() => <Missions />} />
            <Route
              path="/mes-realisations/:page?/:filters?"
              exact
              render={(props) => <Realisations {...props} />}
            />
            <Route
              path="/realisation/:itemId"
              exact
              render={() => <Realisation_Page />}
            />
            <Route path="/contact" render={() => <Contact />} />
            <Route
              path="/admin"
              exact
              render={(props) => <Auth {...props} />}
            />
            <Route
              path="/admin/mon-espace"
              render={(props) => <Admin {...props} />}
            />
          </Switch>
        </Suspense>
        <ToastContainer position="bottom-left" autoClose={2500} pauseOnHover />
      </div>
    </Router>
  );
}

export default App;
