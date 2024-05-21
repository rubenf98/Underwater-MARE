import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSelfProjects } from '../../../redux/redux-modules/project/actions';
import styled from 'styled-components'

const Container = styled.section`
    width: 100%;
    display: flex;
    margin: 50px 0px;
    box-sizing: border-box;
`;

const UserDataContainer = styled.div`
    width: 30%;
    padding: 0px 50px;
    box-sizing: border-box;

    .profile {
        margin-top: 50px;
        width: 90%;
        border-radius: 50%;
    }

    .name {
        font-weight: bold;
        font-size: clamp(20px, 3vw, 30px);
        margin-bottom: 0px;
    }
`;

const ProjectsContainer = styled.div`
    width: 70%;
    
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


function Dashboard(props) {
    const { user, projects } = props;
    const profilePic = "https://wave-labs.org/storage/uploaded/photo/profilePicture//default-profile.png";
    // const projects = [
    //     {
    //         title: "MARE-Madeira",
    //         description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
    //         team: [{ name: "Sandra Sousa", role: "analyst", photo: profilePic }, { name: "Sandra Sousa", role: "analyst", photo: profilePic }, { name: "Sandra Sousa", role: "analyst", photo: profilePic }, { name: "Sandra Sousa", role: "analyst", photo: profilePic }, { name: "Sandra Sousa", role: "analyst", photo: profilePic }, { name: "Sandra Sousa", role: "analyst", photo: profilePic }],
    //         role: "analyst"
    //     },
    //     {
    //         title: "MARE-Leiria",
    //         description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
    //         team: [{ name: "Sandra Sousa", role: "analyst", photo: profilePic }, { name: "Sandra Sousa", role: "analyst", photo: profilePic }, { name: "Sandra Sousa", role: "analyst", photo: profilePic }],
    //         role: "analyst"
    //     }
    // ]
    useEffect(() => {
        props.fetchSelfProjects();
    }, [])


    console.log(user)
    return (
        <Container>
            <UserDataContainer>
                <img className='profile' src={import.meta.env.VITE_API + user.photo} alt="profile picture" />
                <p className='name'>{user.userable.user.name}</p>
                <p>{user.email}</p>
            </UserDataContainer>
            <ProjectsContainer>
                <h2>Project(s)</h2>
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

            </ProjectsContainer>
        </Container >
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelfProjects: () => dispatch(fetchSelfProjects()),
    };
};


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        projects: state.project.selfData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);