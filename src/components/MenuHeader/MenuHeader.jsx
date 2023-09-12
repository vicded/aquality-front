import React from "react";
import styled from 'styled-components'
import logo from '../../logoudggris.webp'

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 60px;
    background-color: white;
`;

const StyledHead = styled.h1`
    margin: 0;
    padding-top: 30px;
    font-size: 60px;
`;

const MenuHeader = () => {
    return (
        <StyledDiv>
            <img src={logo} alt="logo" />
            <StyledHead>Aquality</StyledHead>
        </StyledDiv>
    );

}

export default MenuHeader;