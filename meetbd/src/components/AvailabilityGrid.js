import React from 'react';
import { useState, useEffect } from "react";
import TableDragSelect from "react-table-drag-select";
import "../newstyles.css";
import hours from "../components/Hours";

const AvailabilityGrid = (selectedDate) => {
    const [rows, setRows] = useState([new Date()]);

    useEffect(() => {
        console.log("hi")
        //console.log(JSON.stringify(selectedDate.selectedDate.startDate))
        const currentDate = selectedDate.selectedDate.startDate
        const endDate = selectedDate.selectedDate.endDate
        //console.log(JSON.stringify(currentDate))
        //console.log(JSON.stringify(endDate))
        const array = []
        while (currentDate <= endDate) {
            //console.log(JSON.stringify(currentDate))
            array.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        //setRows(array)
        console.log(array)
    });

    const [curr, changeCurr] = useState({
        cells: Array.from({ length: 28 }, () => Array(7).fill(false)),
    });

    function handleChange(cells) {
        changeCurr({ cells });
        console.log(cells);
    }

    const handleClick = () => {
        const cells = Array.from({ length: 28 }, () => Array(7).fill(false));
        changeCurr({ cells });
    };

    return (
        <div>
            <TableDragSelect value={curr.cells} onChange={handleChange}>
                <tr>
                    
                    <td disabled />
                    <td disabled>Monday</td>
                    <td disabled>Tuesday</td>
                    <td disabled>Wednesday</td>
                    <td disabled>Thursday</td>
                    <td disabled>Friday</td>
                    <td disabled>Saturday</td>
                    <td disabled>Sunday</td>
                </tr>
                <tr>
                    <td disabled>{hours[0].time}</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>01:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>02:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>03:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>04:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>05:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>06:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>07:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>08:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>09:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>10:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>11:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>12:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>13:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>14:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>15:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>16:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>17:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>18:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>19:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>20:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>21:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>22:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>23:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
                <tr>
                    <td disabled>24:00</td>
                    <td className="mon" />
                    <td className="tue" />
                    <td className="wed" />
                    <td className="thu" />
                    <td className="fri" />
                    <td className="sat" />
                    <td className="sun" />
                </tr>
            </TableDragSelect>
            <button onClick={handleClick}>Reset</button>
            {/* <button onClick={submit}>Submit</button> */}
        </div>
    );
};

export default AvailabilityGrid;
