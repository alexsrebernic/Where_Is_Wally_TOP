import Home from "./components/page/Home";
import Header from "./components/page/Header";
import Ranking from "./components/page/Ranking";
import Game from "./components/game/Game";
import {HashRouter,Route,Routes} from 'react-router-dom'

import { useState } from "react";
function App() {
  let [backgroundImg,setBackgroundImage] = useState("1")

  return (
    <div className="App">
    <HashRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home setBackgroundImage={setBackgroundImage}/>} />
        <Route path="/ranking" element={<Ranking/>} />
        <Route path='/game'  element={<Game num={backgroundImg}/>}  />
        
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
