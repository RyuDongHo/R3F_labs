import { BrowserRouter } from "react-router-dom";
import Page from "../Page";
import "./style/global.css";
import Header from "./ui/Header";

const App = (): React.ReactElement => {
  return (
    <div className=" w-full h-full">
      <BrowserRouter>
        <Header />
        <Page />
      </BrowserRouter>
    </div>
  );
};

export default App;
