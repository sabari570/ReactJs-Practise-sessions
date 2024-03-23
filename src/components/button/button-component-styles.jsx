import styled from "styled-components";

export const BaseButtonContainer =  styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 12px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Poppins';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

// Here we are already taking the base button designs into consideration and then updating the styles accordingly for google sign in
// Styled components gives us the feasibilty to actually inherit another components styles and then some more styles on to it as preferred
export const GoogleSignInButton = styled(BaseButtonContainer)`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

export const InvertedButtonContainer = styled(BaseButtonContainer)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;