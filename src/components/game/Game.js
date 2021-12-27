import { Link } from "react-router-dom";
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
    let [inputName,setInputName] = useState("")
    let [score,setScore] = useState(10000)
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
    let seconds = props.timer.getTotalTimeValues()
    console.log(seconds)
      let containerRanking = document.getElementById("container-ranking")
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
                containerRanking.style.display ="flex"
            } else {
                console.log("Missed")
            }
    } else if(props.num === "2"){
        if(coordinate30Left < arrayOfLevels.level2[0] &&
            coordinate30Rigth > arrayOfLevels.level2[0] &&
             coordinate30Top < arrayOfLevels.level2[1] &&
             coordinate30Down > arrayOfLevels.level2[1]){
                console.log("You did it!")
                props.timer.pause()
                containerRanking.style.display ="flex"
             } else {
                 console.log("Missed")
             }
    } else if(props.num === "3"){
        if(coordinate30Left < arrayOfLevels.level3[0] &&
            coordinate30Rigth > arrayOfLevels.level3[0] &&
             coordinate30Top < arrayOfLevels.level3[1] &&
             coordinate30Down > arrayOfLevels.level3[1]){
                props.timer.pause()
                containerRanking.style.display ="flex"

            } else {

                 console.log("Missed")
             }
    }
    
}   
    const handleInputName = (e) => {
        setInputName(e.target.value)
    }
    const submitScore = (event) => {
        console.log("asd")
        event.preventDefault()
        if(inputName === "") return
        if(props.num === "1"){
            (async() => {
                await setDoc(doc(db, "ranking", "level1"), {
                    name: inputName,
                    score: score,
                    time: props.timer.getTotalTimeValues().toString()
                  });
            })()
           
        } else if(props.num === "2"){
            (async() => {
                await setDoc(doc(db, "ranking", "level2"), {
                    name: inputName,
                    score: score,
                    time: props.timer.getTotalTimeValues().toString()
                  });
            })()
        } else if(props.num ==="3"){
            (async() => {
                await setDoc(doc(db, "ranking", "level3"), {
                    name: inputName,
                    score: score,
                    time: props.timer.getTotalTimeValues().toString()
                  });
            })()
        }
       
    } 
    useEffect(() => {
        let seconds = props.timer.getTotalTimeValues().seconds
        setScore(score - (seconds * 1))
    },[props.timer.getTotalTimeValues().seconds])
       
    
    return(
        <div id="gameContainer">
        <div id="container-ranking">
            <div id="popUpRanking">
                <h2>You did it!</h2>
                <h4>Your score is: {score}</h4>
                <span>If you wanna submit your score to the ranking please put your name</span>
                <input onChange={handleInputName} type="text" maxLength="10" placeholder="Name"></input>
                <Link to="/">
                <Button onClick={submitScore}>Submit</Button>
                </Link>
            </div>
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