import React from 'react'
import styled from "styled-components";

const Container = styled.section`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    gap: 50px;
    margin-bottom: 50px;
`;


const Statistic = styled.div`
    width: 25%;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,.1);
    padding: 10px 20px 0px 20px;
    box-sizing: border-box;

    h3 {
        font-weight: 400;
    }

    .value {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        p {
            font-size: clamp(30px, 3vw, 50px);
            font-weight: bold;
            line-height: 100%;
            margin: 0px;
        }

        img {
            width: 50%;
        }
    }
    
`;

function Statistics() {
    return (
        <Container>
            <Statistic>
                <h3>Members</h3>
                <div className='value'>
                    <p>5</p>
                    <img src="/assets/icons/users.svg" alt="users" />
                </div>
            </Statistic>

            <Statistic>
                <h3>Reports</h3>
                <div className='value'>
                    <p>1812</p>
                    <img src="/assets/icons/reports.svg" alt="users" />
                </div>
            </Statistic>

            <Statistic>
                <h3>Sites</h3>
                <div className='value'>
                    <p>41</p>
                    <img src="/assets/icons/sites.svg" alt="users" />
                </div>
            </Statistic>

            <Statistic>
                <h3>Taxa</h3>
                <div className='value'>
                    <p>217</p>
                    <img src="/assets/icons/taxa.svg" alt="users" />
                </div>
            </Statistic>
        </Container>
    )
}

export default Statistics