import { Table,Tabs,Tab } from "react-bootstrap"
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "/home/alexsrebernic/Alex/Programacion/Projects/projectOdinJsPath/where-is-wally-top/src/firebase-config.js";
import { useEffect, useState } from "react";
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const docRef = doc(db, "ranking", "array");

const Ranking = () => {
    let [arrayRankings,setArrayOfRankings] = useState({})
    let [loading,setLoading] = useState(true)
    useEffect(async () => {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
       let result =  docSnap.data()
       setArrayOfRankings(result)
            setLoading(false)
        }

    },[])
    return (
            <div id="ranking">
                <div id="container-ranking">
                    <h2>Ranking</h2>
                    <div id="container-points">
                    
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="home" title="Easy">
                               <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Score</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                {loading === true ? (
                                    <h1>Loading...</h1>
                                ) : loading === null ? (
                                    <h1>Nothing founded :(</h1>
                                ) : (
                                    arrayRankings.arraylevel1.length > 1?(
                                        arrayRankings.arraylevel1.sort((a,b) => {
                                        return  b.score - a.score
                                    })
                                    .map((object,index) => {
                                        return(
                                            <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>{object.name}</th>
                                            <th>{object.score}</th>
                                            <th>{object.time}</th>
                                        </tr>                                        )
                                    })
                                    ):(
                                        arrayRankings.arraylevel1.map((object,index) => {
                                        return(
                                            <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>{object.name}</th>
                                            <th>{object.score}</th>
                                            <th>{object.time}</th>
                                        </tr>                                        )
                                    })
                                    )
                                  
                                   
                                )}
            
                             
                                </Table>
                            </Tab>
                            <Tab eventKey="profile" title="Medium">
                               <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Score</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    {loading === true ? (
                                    <h1>Loading...</h1>
                                ) : loading === null ? (
                                    <h1>Nothing founded :(</h1>
                                ) : (
                                    arrayRankings.arraylevel2.length > 1?(
                                        arrayRankings.arraylevel2.sort((a,b) => {
                                        return  b.score - a.score
                                    })
                                    .map((object,index) => {
                                        return(
                                            <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>{object.name}</th>
                                            <th>{object.score}</th>
                                            <th>{object.time}</th>
                                        </tr>                                        )
                                    })
                                    ):(
                                        arrayRankings.arraylevel2.map((object,index) => {
                                        return(
                                            <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>{object.name}</th>
                                            <th>{object.score}</th>
                                            <th>{object.time}</th>
                                        </tr>                                        )
                                    })
                                    )
                                  
                                   
                                )}
                                </Table>
                            </Tab>
                            <Tab eventKey="contact" title="Hard" >
                               <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Score</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    {loading === true ? (
                                    <h1>Loading...</h1>
                                ) : loading === null ? (
                                    <h1>Nothing founded :(</h1>
                                ) : (
                                    arrayRankings.arraylevel3.length > 1?(
                                        arrayRankings.arraylevel3.sort((a,b) => {
                                        return  b.score - a.score
                                    })
                                    .map((object,index) => {
                                        return(
                                            <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>{object.name}</th>
                                            <th>{object.score}</th>
                                            <th>{object.time}</th>
                                        </tr>                                        )
                                    })
                                    ):(
                                        arrayRankings.arraylevel3.map((object,index) => {
                                        return(
                                            <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>{object.name}</th>
                                            <th>{object.score}</th>
                                            <th>{object.time}</th>
                                        </tr>                                        )
                                    })
                                    )
                                  
                                   
                                )}
                                </Table>
                            </Tab>
                        </Tabs>    
                    </div>
                </div>
            </div>
            )
    }



export default Ranking