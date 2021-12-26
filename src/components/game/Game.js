
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-config";
import { doc, getDoc , setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const docRef = doc(db, "cities", "SF");
try {
    const docSnap = await getDoc(docRef);
  } catch (e){
    console.log(e)
  }
const handleCoordinatesClick =  (event) => {
  
    
   
    let coordinate30Left = event.clientX - 30
    let coordinate30Rigth = event.clientX + 30
    let coordinate30Up = event.clientY - 30
    let coordinate30ToDown = event.clientY + 30
    console.log( "clientX: " + event.clientX +
    " - clientY: " + event.clientY)
    
}

const Game = (props) => {

    let [countDown,setCountDown] = useState(3)
    useEffect(() => {
    let container = document.getElementById("game")
    container.removeAttribute("class")
    if(props.num === "1"){
        container.setAttribute("class","easy-level-map")
    } else if(props.num === "2"){
        container.setAttribute("class","medium-level-map")
     } else if(props.num === "3"){
        container.setAttribute("class","hard-level-map")
     }
  },[props.num])
  useEffect(() => {
    if(props.clickStartButton){
        let container = document.getElementById("countDownContainer")
        if(countDown > 0){
            container.removeAttribute("class")
            container.setAttribute("class","count-down")
            setTimeout(() => setCountDown(countDown - 1), 1000)
        } else if(countDown === 0){
            container.removeAttribute("class")
            container.style.display = "none"
            props.unsetButton()
            props.timer.start()
            setCountDown(3)
        }
    } else if(props.clickStartButton === false){
        setCountDown(3)
    }
  },[countDown,props])
  
    return(
        <div id="gameContainer">
           <div onClick={(event) => handleCoordinatesClick(event)} id="game">
               <div id="countDownContainer" >
                    <h1>{countDown}</h1>
               </div>
           </div>
        </div>
    )
}
export default Game