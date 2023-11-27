import React from 'react';
import { useState, useEffect } from "react";
import TableDragSelect from "react-table-drag-select";
import "../newstyles.css";
import hours from "../components/Hours";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const AvailabilityGrid = (selectedDate) => {
    const [rows, setRows] = useState([new Date()]);
    const [userId, setUserId] = React.useState(null);
    const [dateRange, setDateRange] = React.useState([])
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
        setDateRange(array)
        console.log(array)
    }, [selectedDate.selectedDate.startDate, selectedDate.selectedDate.endDate]);

    const [curr, changeCurr] = useState({
        cells: Array.from({ length: 26}, () => Array(8).fill(false)),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('availability_grid')
                    .select('availability_grid');

                if (error) {
                    console.error('Error fetching data from Supabase:', error);
                } else {
                    if (data.length > 0 && data[0].availability_grid) {
                        changeCurr({
                            cells: data[0].availability_grid,
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching data from Supabase:', error.message);
            }
        };

        fetchData();
    }, []);

    const supabase = useSupabaseClient();
    const getUserId = async () => {
        const {
        data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();
    
    async function insertBooleanArray() {
        // Insert the 2D boolean array into the Supabase table
        const { data, error } = await supabase
        .from('availability_grid')
        .upsert([{
            id: 1,
            availability_grid: curr.cells,
            user_id: userId
        }]);
      
        if (error) {
          console.error('Error inserting boolean array:', error.message);
        } else {
          console.log('Boolean array inserted successfully:', data);
        }
    }
    insertBooleanArray();

    function handleChange(cells) {
        changeCurr({ cells });
        console.log(cells);
    }

    const handleReset = () => {
        const cells = Array.from({ length: 28 }, () => Array(7).fill(false));
        changeCurr({ cells });
    };

    const handleSubmit = () => {
        
    };

    const tableDragSelectStyles = {
        width: '80%', 
        height: '300px',
    };

    const tableFormButtonStyles = {
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
    };

    const buttonStyles = {
        margin: '0 5px',
    }
    
    return (
        <div>
            <TableDragSelect value={curr.cells} onChange={handleChange} style={tableDragSelectStyles}>
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
            <div className="table-form-buttons-container" style={tableFormButtonStyles}>
                <button onClick={handleReset} style={buttonStyles}>Reset</button>
                <button onClick={handleSubmit} style={buttonStyles}>Submit</button>
            </div>
        </div>
    );
};

export default AvailabilityGrid;
