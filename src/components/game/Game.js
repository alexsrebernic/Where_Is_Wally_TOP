
import easyLevel from '/home/alexsrebernic/Alex/Programacion/Projects/projectOdinJsPath/where-is-wally-top/src/components/img/04f4c1fdc7eb4b71de3e90caebc882dc.jpg'
import mediumLevel from '/home/alexsrebernic/Alex/Programacion/Projects/projectOdinJsPath/where-is-wally-top/src/components/img/WheresWallyAtWembley_6.jpg'
import hardLevel from '/home/alexsrebernic/Alex/Programacion/Projects/projectOdinJsPath/where-is-wally-top/src/components/img/23d4855c01fd62ee06dfff509e12667e.jpg'
import { useEffect, useState } from 'react'
const Game = (props) => {
    let [img,setImg] = useState(easyLevel)
  console.log(props)
  useEffect(() => {
    if(props.num === "1"){
        setImg(easyLevel)
     } else if(props.num === "2"){
          setImg(mediumLevel)
     } else if(props.num === "3"){
      setImg(hardLevel)
     }
  },[props.num])
  
    return(
        <div id="gameContainer">
            <div id="game">
                <img alt='game' src={img}></img>
            </div>
        </div>
    )
}
export default Game