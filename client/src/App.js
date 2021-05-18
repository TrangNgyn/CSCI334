import { BrowserRouter as Router } from "react-router-dom";
import AppRouting from "./pages/AppRouting";
import Login from "./pages/login/Login";
import { UserStore } from "./stores/UserStore";
import { observer } from "mobx-react";

const App = () => {
  const userStore = UserStore;

  if (!userStore.isLoggedIn) {
    return <Login userStore={userStore} />;
  } else {
    return (
      <Router>
        <AppRouting userStore={userStore} />
      </Router>
    );
  }
};

export default observer(App);
