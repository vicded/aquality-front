import React from "react";
import styled from 'styled-components';

const StyledUl = styled.ul`
    list-style: none;
`;

const StyledLi = styled.li``;

const green = "#26c04c";
const yellow = "#f2ff3d";
const  red = "#ff3d3d";

const ph_color = (ph) => {
    if (ph == 8.5 || ph == 6.5 ) {
        return yellow;
    } else if (ph > 8.5 || ph < 6.5) {
        return red;
    } else if (ph < 8.5 && ph > 6.5 ) {
        return green;
    }
}


const ValueList = ({data}) => {
    console.log('data', data);
    
    const {ph, tds, turbidity, temperature, date_entered, station_name} = JSON.parse(data);
    
    
    return (
        <>
            { data ? (
                <>
                    <h2>{station_name}</h2>
                    <StyledUl>
                    <li>PH:<span color={ph_color}>{ph}</span></li>
                    </StyledUl>
                </>
                )
                : <h3>No hay datos disponibles</h3>
            }
        </>
    );
}

export default ValueList;