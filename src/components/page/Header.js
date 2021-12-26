import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const Header = (props) => {
    console.log(props)
    return(
        <header className="w-100 d-flex">
            <div id="title-header" className="w-25">
                <img id="logo" src={require("/home/alexsrebernic/Alex/Programacion/Projects/projectOdinJsPath/where-is-wally-top/src/components/img/asd.jpeg")} alt="logo"></img>
                <h1>Where's Wally?</h1>
            </div>
            <div id="chronometer">
                <span id="time">
                    Time: {props.timer.getTimeValues().toString()}
                </span>
            </div>
           
            <ul className="w-50">
                <li>
                    <Link to="/">
                    <Button onClick={props.unsetButton} variant="outline-dark">Home</Button>
                    </Link>
                </li>
                <li>
                    <Link to="/ranking">
                        <Button onClick={() => props.unsetButton  } variant="outline-dark">Ranking</Button>
                    </Link>
                </li>

            </ul>
        </header>
    )
}

export default Header
