import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useTheme } from '../Context/ThemeContext'

const ResultTable = ({data}) => {

    const {theme} = useTheme();
return (
    <div className='table'>
        <TableContainer style={{maxHeight:'30rem'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            WPM
                        </TableCell >
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            Accuracy
                        </TableCell>
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            Characters
                        </TableCell>
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((i)=>(
                            <TableRow>
                                <TableCell style={{color: theme.title, textAlign: 'center' }}>
                                    {i.wpm}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center' }}>
                                    {i.accuracy}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center' }}>
                                    {i.characters}
                                </TableCell>
                                <TableCell style={{ color: theme.title, textAlign: 'center' }}>
{(() => {
const date = i.timeStamp.toDate();
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();
let hours = date.getHours();
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? String(hours).padStart(2, '0') : '12'; // 12 AM/PM case
return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
})()}
</TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)
}

export default ResultTable