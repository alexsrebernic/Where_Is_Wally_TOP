import Home from "./components/page/Home";
import Header from "./components/page/Header";
import Ranking from "./components/page/Ranking";
import Game from "./components/game/Game";
import {HashRouter,Route,Routes} from 'react-router-dom'
import useTimer from 'easytimer-react-hook';

import { useState } from "react";
function App() {
  let [backgroundImg,setBackgroundImage] = useState("1")
  let [clickStartButton,setClickStartButton] = useState(false)
  const [timer, isTargetAchieved] = useTimer();
  const setButton = () => {
    setClickStartButton(true)
  }
  const unsetButton = () => {
    setClickStartButton(false)
    timer.reset()
    timer.stop()
  }
 
 
  return (
    <div className="App">
    <HashRouter>
      <Header timer={timer}  unsetButton={unsetButton} />
      <Routes>
        <Route path="/" element={<Home setClickStartButton={setButton} setBackgroundImage={setBackgroundImage}/>} />
        <Route path="/ranking" element={<Ranking/>} />
        <Route path='/game' element={<Game timer={timer}  unsetButton={unsetButton}  clickStartButton={clickStartButton}   num={backgroundImg}/>}  />
        
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
