import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Button from '@mui/material/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import ExcelExport from "../ExcelExport/ExcelExport";

const StyledDiv = styled.div`
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-around;
    margin-bottom: 40px;
`;

const StyledButton = styled(Button)`
    height: 56px; 
    margin: 0 0 0 20px; 
    padding: 10px;
`;

const ExcelDate = (props) => {

    const date = new Date();
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    console.log('day', day);
    console.log('month', month);
    console.log('year', year);
    
    const startDate = `${year}-${month}-${day - 1}`;
    const endDate = `${year}-${month}-${day}`;
    
    const [value, setValue] = useState([
        dayjs(startDate),
        dayjs(endDate),
    ]);
    
    const [responseData, setResponseData] = useState(null);
    
    const [sendStartDate, setSendStartDate] = useState(startDate);
    const [sendEndDate, setSendEndDate] = useState(endDate);

    useEffect(() => {
        if (value[1] != null ) {
            let sendStartDate = `${value[0].$y}-${value[0].$M + 1}-${value[0].$D}`;
            let sendEndDate = `${value[1].$y}-${value[1].$M + 1}-${value[1].$D}`;

            setSendStartDate(sendStartDate);
            setSendEndDate(sendEndDate);
        }
    },[value]);

    
    const handleClick = async () => {
        try {
        const response = await fetch(`http://localhost:3001/events?start=${sendStartDate}&end=${sendEndDate}`); // Replace with your actual API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResponseData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <StyledDiv>
                <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                    <DemoItem label="Selecciona un rango de fecha" component="DateRangePicker">
                        <DateRangePicker
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            />
                    </DemoItem>
                </DemoContainer>
                <StyledButton size="small" variant="outlined" onClick={handleClick}>enviar</StyledButton>
                <ExcelExport data={responseData} fileName={'reporte'}/>
            </StyledDiv>
            <LineChart
                style={{'margin': '0 auto'}}
                width={1000}
                height={600}
                data={responseData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date_entered" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="tds"
                    stroke="#8884d8"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="ph"
                    stroke="#7432d8"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="turbidity"
                    stroke="#2154d8"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#1293d8"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="ec"
                    stroke="#2135d8"
                    dot={false}
                />
            </LineChart>

        </>
    );
}

export default ExcelDate;