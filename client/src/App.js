import { AuthProvider } from "./Context/AuthContext.js";
import MainNavigation from "./NavbarCompenent/Navbar.js";
// import WidgetNavigation from "./WidgetManager/Widget";
import Settings from "./SettingsPage/Settings";
// import HomePage from "./Homepage/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./LoginManager/Signup.js";
import Login from "./LoginManager/Login.js";
import PrivateRoute from "./LoginManager/PrivateRoute.js";
import ForgotPassword from "./LoginManager/ForgotPassword.js";
import UpdateProfile from "./LoginManager/UpdateProfile.js";
import AddServices from "./Services/AddServices.js";
import AddWidget from "./AddWidget.js";

import { Container } from "react-bootstrap";
import Profile from "./LoginManager/Profile.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={MainNavigation} />

              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <div className="w-100" style={{ minHeight: "400px" }}>
                  <Route path="/profile" component={Profile} />
                  <PrivateRoute
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  <Route path="/settings" component={Settings} />
                  <Route path="/add-services" component={AddServices} />
                  <Route path="/add-widget" component={AddWidget} />

                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </div>
              </Container>
            </Switch>
          </AuthProvider>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
