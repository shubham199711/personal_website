import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 88vh;
  background-color: #1e1e1e;
  color: white;
  font-family: Arial, sans-serif;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    padding: 10vh 5vw;
  }
`;

const ProfileCircle = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #333;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileContent = styled.div`
  text-align: left;
  padding-left: 40px;
  max-width: 550px;
`;

const ProfileTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

const ProfileDescription = styled.p`
  font-size: 1rem;
  margin: 15px 0 20px 0;
  line-height: 1.6;
  max-width: 550px;
`;

const ProfileButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: left;
  flex-wrap: wrap;
`;

const ProfileButton = styled.a`
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &.resume {
    background-color: #d4a017;
    color: white;
  }

  &.projects {
    background-color: #c70039;
    color: white;
  }

  &.leetcode {
    background-color: gray;
    color: white;
  }

  &.contact {
    background-color: #008080;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const Home = () => {
  return (
    <ProfileContainer>
      <ProfileCircle>
        <ProfileImage src="/profile.jpeg" alt="Profile" />
      </ProfileCircle>
      <ProfileContent>
        <ProfileTitle>Hello</ProfileTitle>
        <ProfileDescription>
          <strong>A Bit About Me</strong>
          <br />
          I'm a Software Engineer. I'm passionate about creating innovative and
          user-friendly applications. I'm always looking for new challenges.
        </ProfileDescription>
        <ProfileButtons>
          <ProfileButton href="/resume" className="resume">
            Resume
          </ProfileButton>
          <ProfileButton href="/project" className="projects">
            Projects
          </ProfileButton>
          <ProfileButton href="/leetcode" className="leetcode">
            Leetcode
          </ProfileButton>
          <ProfileButton href="/contact" className="contact">
            Contact
          </ProfileButton>
        </ProfileButtons>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Home;
