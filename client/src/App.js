import { BrowserRouter as Router } from "react-router-dom";
import AppRouting from "./pages/AppRouting";
import Login from "./pages/login/Login";
import { UserStore } from "./stores/UserStore";
import { observer } from "mobx-react";

const App = () => {
  const userStore = UserStore;

  if (!userStore.isLoggedIn) {
    return <Login />;
  } else {
    return (
      <Router>
        <AppRouting />
      </Router>
    );
  }
};

export default observer(App);
