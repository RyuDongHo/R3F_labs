import { BrowserRouter } from "react-router-dom";
import Page from "../Page";
import "./style/global.css";
import Header from "./ui/Header";
import useMusic from "./model/useMusic";
import React from "react";

const App = (): React.ReactElement => {
  const audioRef = React.useRef<HTMLAudioElement>(null!);
  useMusic({ audioRef });
  
  return (
    <div className=" w-full h-full">
      <audio
        ref={audioRef}
        src="/music/In Dreamland by Chillpeach.mp3"
        style={{ display: "none" }}
      />
      <BrowserRouter>
        <Header />
        <Page />
      </BrowserRouter>
    </div>
  );
};

export default App;
