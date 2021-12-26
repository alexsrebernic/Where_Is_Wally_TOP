import { Table } from "react-bootstrap"
const Ranking = () => {
    return (
    <div id="ranking">
        <div id="container-ranking">
            <h2>Ranking</h2>
            <div id="container-points">
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
            </div>
        </div>
    </div>
    )
}
export default Ranking