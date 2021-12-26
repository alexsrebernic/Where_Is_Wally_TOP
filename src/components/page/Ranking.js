import { Table,Tabs,Tab } from "react-bootstrap"
const Ranking = () => {
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
                                    <th>Time</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                        </Table>
                    </Tab>
                    <Tab eventKey="profile" title="Medium">
                       <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                        </Table>
                    </Tab>
                    <Tab eventKey="contact" title="Hard" >
                       <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                        </Table>
                    </Tab>
                </Tabs>    
            </div>
        </div>
    </div>
    )
}
export default Ranking