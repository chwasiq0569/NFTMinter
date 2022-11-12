import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Install from "./components/Install";

function App() {
  if (window.ethereum) {
    return <Home />;
  } else {
    return <Install />;
  }
}

export default App;
