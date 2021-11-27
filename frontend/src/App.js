import React, { Suspense, lazy, useEffect } from "react";
import "./1-css/App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { LoadingSpinnerFullPage } from "./3-components/LoadingComponents";
import Nav from "./3-components/Nav";
import Footer from "./3-components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./2-pages/Home"));
const About = lazy(() => import("./2-pages/About"));
const Missions = lazy(() => import("./2-pages/Missions"));
const Realisations = lazy(() => import("./2-pages/Realisations"));
const Realisation_Page = lazy(() => import("./2-pages/Realisation_Page"));
const Auth = lazy(() => import("./2-pages/Auth"));
const Admin = lazy(() => import("./2-pages/Admin"));

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" render={(props) => <Nav {...props} />} />
        <Suspense fallback={<LoadingSpinnerFullPage />}>
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} />} />
            <Route path="/a-propos" render={() => <About />} />
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
        <Route path="/" render={(props) => <Footer {...props} />} />
        <ToastContainer position="bottom-left" autoClose={2500} pauseOnHover />
      </div>
    </Router>
  );
}

export default App;
