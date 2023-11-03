import React from 'react';
import { useState } from "react";
import TableDragSelect from "react-table-drag-select";
import "../newstyles.css";
import hours from "../components/Hours";
const daysOfMonth = [
    'Sunday, October 15',
    'Monday, October 16',
    'Tuesday, October 17',
    'Wednesday, October 18',
    'Thursday, October 19',
    'Friday, October 20',
    'Saturday, October 21',
];
const cellStyle = {
    backgroundColor: '#f0f0f0', // Default background color
    padding: '0', // Remove cell padding
    borderBottom: 'none', // Remove cell borders
    lineHeight: '2', // Adjust line height to make cells thinner
    border: '1px solid #ccc', // Add a border around each cell
};

const AvailabilityGrid = () => {
    const [curr, changeCurr] = useState({
        cells: [
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false]
        ]
      });
    
      function handleChange(cells) {
        changeCurr({ cells });
        console.log(cells);
      }
    
      const handleClick = () => {
        const cells = [
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false]
        ];
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
