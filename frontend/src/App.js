import React, { Suspense, lazy } from "react";
import "./1-css/App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { LoadingSpinnerFullPage } from "./3-components/LoadingComponents";
import Nav from "./3-components/Nav";

const About = lazy(() => import("./2-pages/About"));
const Missions = lazy(() => import("./2-pages/Missions"));
const Realisations = lazy(() => import("./2-pages/Realisations"));
const Contact = lazy(() => import("./2-pages/Contact"));

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Suspense fallback={<LoadingSpinnerFullPage />}>
          <Switch>
            <Route path="/" exact render={() => <About />} />
            <Route path="/missions" render={() => <Missions />} />
            <Route path="/mes-realisations" render={() => <Realisations />} />
            <Route path="/contact" render={() => <Contact />} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
