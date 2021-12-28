import { useEffect } from 'react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'




const Home = (props) => {
        useEffect(() => {
            if(props.num === '0'){
                document.getElementById("link-to-game").setAttribute("class","dissable-button")
            } else if(props.num !== '0'){
                document.getElementById("link-to-game").removeAttribute("class")
            }
        },[props.num])
      
    return(
        <div id="container-home"  className='easy-level'>
                <div id="dificulty-container">
                    <h2>Select Your Dificulty</h2>
                    <div id="buttons-container">
                        <Button onClick={() => {document.getElementById("container-home").setAttribute("class",'easy-level'); props.setBackgroundImage("1") }} variant="success">Easy</Button>
                        <Button onClick={() => {document.getElementById("container-home").setAttribute("class",'medium-level');props.setBackgroundImage("2")}}  variant="warning">Medium</Button>
                        <Button onClick={() => {document.getElementById("container-home").setAttribute("class",'hard-level');props.setBackgroundImage("3")}} variant="danger">Hard</Button>
                        <Link id="link-to-game" to="/game">
                            <Button  onClick={props.setClickStartButton} className='w-100' id="4" variant="outline-dark">Play</Button>
                        </Link>
                    </div>
              
                </div>
        </div>
    )
}
export default Home