import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'
import './Table.css'
function createData(name, trackingId, date, status) {
    return { name, trackingId, date, status };
}


const rows = [
    createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
    createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
    createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
    createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle = (status) => {
    if (status === 'Approved') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        }
    }
    else if (status === 'Pending') {
        return {
            background: '#ffadad8f',
            color: 'red',
        }
    }
    else {
        return {
            background: '#59bfff',
            color: 'white',
        }
    }
}

export default function BasicTable() {
    const [data, setData] = React.useState([]);
    const [currentPage,setCurrentPage]=React.useState(0);
    const itemsPerPage=5;
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/api/data');
            setData(response.data);
            console.log(data);
        }
        fetchData();
    }, [])
    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getCurrentPageData=()=>{
        const start=currentPage*itemsPerPage;
        const end=start+itemsPerPage;
        return data.slice(start,end);
    }
    return (
        <div className="Table">
            <h3>Recent Orders</h3>
            <TableContainer
                // component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pestle</TableCell>
                            <TableCell align="left">Sector</TableCell>
                            <TableCell align="left">Start Date</TableCell>
                            <TableCell align="left">End Date</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {getCurrentPageData().map((row,index) => (
                            <TableRow
                                key={row.index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.pestle}</TableCell>
                                <TableCell align="left">{row.sector}</TableCell>
                                <TableCell align="left">{row.start_year}</TableCell>
                                <TableCell align="left">{row.end_year}</TableCell>
                                <TableCell align="left"><span className="status" >{row.topic}</span></TableCell>
                                {/* <TableCell align="left" className="Details">Details</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            <div className="pagintion">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
                <span>{currentPage+1 }</span>
                    <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(data.length / itemsPerPage) - 1}>Next</button>
            </div>
            </TableContainer>

        </div>
    );
}