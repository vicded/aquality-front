import styledEngine from "@mui/styled-engine";
import React from "react";
import styled from 'styled-components';

const StyledUl = styled.ul`
    list-style: none;
    padding: 0;
    text-transform: capitalize;
`;

const StyledLi = styled.li`
    font-size: 15px;
    font-weight: bold;
`;

const StyledSpan = styled.span`
    padding-left: 10px !important;
`; 

const green = "#26c04c";
const orange = "#F08700";
const  red = "#ff3d3d";

const ph_color = (ph) => {
    console.log('color', ph, typeof ph)
    if (ph == 8.5 || ph == 6.5 ) {
        return orange;
    } else if (ph > 8.5 || ph < 6.5) {
        return red;
    } else if (ph < 8.5 && ph > 6.5 ) {
        return green;
    }
}

const tds_color = (tds) => {
    console.log('color', tds, typeof ph)
    if (tds == 1000) {
        return orange;
    } else if (tds > 1000) {
        return red;
    } else if (tds < 1000) {
        return green;
    }
}

const turbidity_color= (tbd) => {
    console.log('color', tbd, typeof ph)
    if (tbd == 4.0) {
        return orange;
    } else if (tbd > 4.0) {
        return red;
    } else if (tbd < 4.0) {
        return green;
    }
}


const ValueList = ({data}) => {
    console.log('data', data);
    
    const validate_data = (data) => {
        if (data) {
            const {ph, ec, tds, turbidity, temperature, date_entered, station_name} = JSON.parse(data);
            //const parsedDate = new Date(date_entered);
            console.log('aaaaa', date_entered);
            console.log('type', typeof date_entered);
            const parsedDate = new Date(date_entered);
            var options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            const formatedDate = parsedDate.toLocaleDateString('es-MX', options)
            return (
                <>
                    <h2>{station_name}</h2>
                    <StyledUl>
                        <StyledLi>ph:<StyledSpan style={{'color': ph_color(ph)}}>{ph}</StyledSpan></StyledLi>
                        <StyledLi>ec:<StyledSpan style={{'color': 'gray'}}>{ec}</StyledSpan></StyledLi>
                        <StyledLi>solidos disueltos:<StyledSpan style={{'color': tds_color(tds)}}>{tds}</StyledSpan></StyledLi>
                        <StyledLi>turbiedad:<StyledSpan style={{'color': turbidity_color(turbidity)}}>{turbidity}</StyledSpan></StyledLi>
                        <StyledLi>temperatura:<StyledSpan style={{'color': green}}>{temperature}</StyledSpan></StyledLi>
                        <StyledLi>fecha del evento:<StyledSpan style={{'color': 'gray'}}>{formatedDate}</StyledSpan></StyledLi>
                    </StyledUl>
                </>
                );
        }

        return <h3>No hay datos disponibles</h3>;
    }
    
    return (
        <>
            {validate_data(data)}
        </>
    );
}

export default ValueList;