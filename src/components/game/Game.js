import { Button } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-config";
import { doc, getDoc , setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'
import uniqid from 'uniqid'
const app = initializeApp(firebaseConfig);
const db = getFirestore();
let arrayOfLevels
const docRef = doc(db, "coordsWally", "levels");
(async() => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) { 

        return docSnap.data()
    } else {
        console.log("No such document!");
      }
})().then(a => {arrayOfLevels = a})



const Game = (props) => {
    let [countDown,setCountDown] = useState(3)
    let [scoreAndName,setScoreAndName] = useState({})

    useEffect(() => {
        document.getElementById("game").removeAttribute("class")
    if(props.num === "1"){
        document.getElementById("game").setAttribute("class","easy-level-map")
    } else if(props.num === "2"){
        document.getElementById("game").setAttribute("class","medium-level-map")
     } else if(props.num === "3"){
        document.getElementById("game").setAttribute("class","hard-level-map")
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
  const handleCoordinatesClick =  (event) => {
    let coordinate30Left = event.clientX - 35
    let coordinate30Rigth = event.clientX + 35
    let coordinate30Top = event.clientY - 35
    let coordinate30Down = event.clientY + 35
    if(props.num === "1"){
        if(coordinate30Left < arrayOfLevels.level1[0] &&
           coordinate30Rigth > arrayOfLevels.level1[0] &&
            coordinate30Top < arrayOfLevels.level1[1] &&
            coordinate30Down > arrayOfLevels.level1[1]){
                props.timer.pause()
                console.log("You did it!")
            } else {
                props.setIsFounded(false)
                console.log("Missed")
            }
    } else if(props.num === "2"){
        if(coordinate30Left < arrayOfLevels.level2[0] &&
            coordinate30Rigth > arrayOfLevels.level2[0] &&
             coordinate30Top < arrayOfLevels.level2[1] &&
             coordinate30Down > arrayOfLevels.level2[1]){
                console.log("You did it!")
                props.timer.pause()

             } else {
                 props.setIsFounded(false)
                 console.log("Missed")
             }
    } else if(props.num === "3"){
        if(coordinate30Left < arrayOfLevels.level3[0] &&
            coordinate30Rigth > arrayOfLevels.level3[0] &&
             coordinate30Top < arrayOfLevels.level3[1] &&
             coordinate30Down > arrayOfLevels.level3[1]){
                props.timer.pause()

            } else {
                props.setIsFounded(false)

                 console.log("Missed")
             }
    }
    
}
    const submitScore = (event,score) => {
        event.preventDefault()
        if(event.target.value === "") return
        setScoreAndName({name:event.target.value,score:score,id:uniqid()})
    } 

    return(
        <div id="gameContainer">
            <div id="popUpRanking">
                <h2>You did it!</h2>
                <h4>Your score is: {props.time}</h4>
                <span>If you wanna submit your score to the ranking please put your name</span>
                <input type="text" maxLength="3" placeholder="Name"></input>
                <Button>Submit</Button>
            </div>
           <div onClick={(event) => handleCoordinatesClick(event)} id="game">
               <div id="countDownContainer" >
                    <h1>{props.num === "0"?"What are you doing here?":countDown}</h1>
               </div>
           </div>
        </div>
    )
}
export default Game