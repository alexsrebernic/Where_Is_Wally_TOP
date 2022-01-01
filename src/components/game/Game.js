import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { doc, getDoc  } from "firebase/firestore";
import firebaseConfig from '/home/alexsrebernic/Alex/Programacion/Projects/projectOdinJsPath/where-is-wally-top/src/firebase-config.js'
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const coordsRef = doc(db, "coordsWally", "levels");
const rankingRef = doc(db, "ranking", "array");

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
    
    let containerRanking = document.getElementById("container-ranking")
    let coordinate30Left = event.clientX - 35
    let coordinate30Rigth = event.clientX + 35
    let coordinate30Top = event.clientY - 35
    let coordinate30Down = event.clientY + 35;


    (async() => {
    const docSnap = await getDoc(coordsRef);
    if (docSnap.exists()) { 
        console.log("Doc Found")
        return docSnap.data()
    } else {
        console.log("No such document!");
      }
    })().then(data => {
    if(props.num === "1"){
        if(coordinate30Left < data.level1[0] &&
           coordinate30Rigth > data.level1[0] &&
            coordinate30Top < data.level1[1] &&
            coordinate30Down > data.level1[1]){
                props.timer.pause()
                containerRanking.style.display ="flex"
            } 
    } else if(props.num === "2"){
        if(coordinate30Left < data.level2[0] &&
            coordinate30Rigth > data.level2[0] &&
             coordinate30Top < data.level2[1] &&
             coordinate30Down > data.level2[1]){
                props.timer.pause()
                containerRanking.style.display ="flex"
             }
    } else if(props.num === "3"){
        if(coordinate30Left < data.level3[0] &&
            coordinate30Rigth > data.level3[0] &&
             coordinate30Top < data.level3[1] &&
             coordinate30Down > data.level3[1]){
                props.timer.pause()
                containerRanking.style.display ="flex"

            } 
    }
})
    

}   
    const handleInputName = (e) => {
        setInputName(e.target.value)
    }
    const submitScore = (event) => {
        if(inputName === "") return
        let userRanking = {name:inputName,score:score,time:props.timer.getTotalTimeValues().toString()};

        (async() => {
    const docSnap = await getDoc(rankingRef);
    
        if (docSnap.exists()) { 

        return docSnap.data()
         } else {
        console.log("No such document!");
        }
        })().then(async data => {  

            if(props.num === "1"){
                (async() => {
                await updateDoc(rankingRef, { 
                    arraylevel1:  data.arraylevel1.concat(userRanking),
                });
                
               })()
            } else if(props.num === "2"){
                (async() => {
                    await updateDoc(rankingRef, { 
                        arraylevel2:  data.arraylevel2.concat(userRanking),
                    });
                    
                   })()
            } else if(props.num ==="3"){
                (async() => {
                    await updateDoc(rankingRef, { 
                        arraylevel3: data.arraylevel3.concat(userRanking),
                    });
                    
                   })()
            }
        })       
    props.timer.reset()  
    props.timer.pause()
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

                <Link to="/">
                    <Button>Back to Home</Button>
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