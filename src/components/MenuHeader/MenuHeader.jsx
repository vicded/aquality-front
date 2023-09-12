import React from "react";
import styled from 'styled-components'
import logo from '../../logoudggris.webp'
import drop from '../../drop.svg'

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 60px;
    background-color: #0094C6;
    border-radius: 5px;
`;

const StyledHead = styled.h1`
    margin: 0;
    font-size: 60px;
    color: white;
`;

const StyledFlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MenuHeader = () => {
    return (
        <StyledDiv>
            <img src={logo} alt="logo" />
            <StyledFlexDiv>
                <img src={drop} style={{'width': '60px'}} alt="" />
                <StyledHead>Aquality</StyledHead>
            </StyledFlexDiv>
        </StyledDiv>
    );

}

export default MenuHeader;