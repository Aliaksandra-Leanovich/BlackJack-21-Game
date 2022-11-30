import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
