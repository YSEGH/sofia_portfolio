import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "../1-css/Admin.css";
import FormAbout from "../3-components/FormAbout";
import FormRealisation from "../3-components/FormRealisation";
import FormUser from "../3-components/FormUser";
import NavAdmin from "../3-components/NavAdmin";
import Realisations_Table from "../3-components/Realisations_Table";

export default function Admin(props) {
  useEffect(() => {
    console.log(props);
    /* console.log({
      pathname: props.location.pathname,
    });
    if (props.location.pathname === "/admin/mon-espace") {
      props.history.push("/admin/mon-espace/mon-compte");
    } */
    return () => {};
  }, []);

  return (
    <div className="page admin">
      <NavAdmin />
      <div>
        <Router>
          <Switch>
            <Route
              path="/admin/mon-espace/mon-compte"
              exact
              render={() => <FormUser />}
            />
            <Route
              path="/admin/mon-espace/realisation/:itemId"
              exact
              render={() => <FormRealisation update={true} />}
            />
            <Route
              path="/admin/mon-espace/mes-realisations"
              exact
              render={() => <Realisations_Table />}
            />
            <Route
              path="/admin/mon-espace/ajouter-realisation"
              exact
              render={() => <FormRealisation />}
            />
            <Route
              path="/admin/mon-espace/infos-generales"
              exact
              render={() => <FormAbout />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
