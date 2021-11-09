import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Header } from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainGame from "./MainGame";

function App() {
  return (
    <>
      <Router>

        <Header />
        <Switch>
          <Route exact path="/MainGame">
            <MainGame />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
