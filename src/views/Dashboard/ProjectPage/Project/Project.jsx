import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchSelfProjects, createProject, updateProject } from "../../../../../redux/redux-modules/project/actions";
import TitleAddSection from "../../Common/TitleAddSection";
import { Link } from "react-router-dom";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.section`
    width: 100%;
    box-sizing: border-box;
    
`;


const ProjectContainer = styled.div`
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,.1);
    margin-bottom: 30px;

    .team {
        display: flex;
        align-items: flex-start;
        gap: 50px;
        margin: 20px 0px;
        flex-wrap: wrap;
    }

    .team-member {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 50px;
            height: auto;
            border-radius: 50%;
        }

        p {
            margin: 0px;
        }

        .role {
            opacity: .5;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .links-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 5px;

            button {
                cursor: pointer;
                background-color: #0C4C88;
                padding: 8px;
                box-sizing: border-box;
                border: 0px;
                box-shadow: 0px;
                display: flex;

                img {
                    width: 12px;
                }
            }
        }

        
        
    }
`;


function Project(props) {
    const { projects } = props;

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        props.fetchSelfProjects();
    }, [])

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <Container>
            <ContentContainer>
                <FormContainer
                    visible={visible}
                    handleCancel={handleCancel}
                    create={props.createProject}
                    update={props.updateProject}
                />

                <TitleAddSection
                    title="Project(s)"
                    handleClick={() => setVisible(true)}
                />

                {projects.map((project) => (
                    <ProjectContainer>
                        <div className='header'>
                            <h3>{project.name}</h3>

                            <div className='links-container'>
                                <Link to={"/dashboard/reports/" + project.id}> <button><img src="/assets/icons/edit.svg" alt="" /></button></Link>
                                <Link to={"/dashboard/projects/" + project.id}> <button><img src="/assets/icons/link.svg" alt="" /></button></Link>

                            </div>


                        </div>
                        <p>{project.description}</p>

                        <div className='team'>
                            {project.users.map((member) => (
                                <div key={member.id} className='team-member'>
                                    <img src={"https://wave-labs.org/" + member.photo} alt="profile picture" />
                                    <div className='details'>
                                        <p className='name'>{member.userable.user.name}</p>
                                        {/* <p className='role'>{member.role}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ProjectContainer>
                ))}

            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelfProjects: () => dispatch(fetchSelfProjects()),
        updateProject: (id, data) => dispatch(updateProject(id, data)),
        createProject: (data) => dispatch(createProject(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.project.loading,
        user: state.auth.user,
        projects: state.project.selfData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);