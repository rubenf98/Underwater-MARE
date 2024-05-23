import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        background-color: #044582ff;
        padding: 7px;
        box-sizing: border-box;
        box-shadow: 0px;
        border: 0px;
        cursor: pointer;
        border-radius: 4px;

        img {
            width: 13px;
        }
    }
`;
function TitleAddSection(props) {
    return (
        <Container>
            <h2>{props.title}</h2>
            <button onClick={props.handleClick}>
                <img src="/assets/icons/add.svg" alt="add icon to create a new entry" />
            </button>
        </Container>
    )
}

export default TitleAddSection