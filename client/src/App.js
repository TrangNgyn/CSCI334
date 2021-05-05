import AppRouting from "./pages/AppRouting";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <AppRouting />;
    </Router>
  );
};

export default App;
