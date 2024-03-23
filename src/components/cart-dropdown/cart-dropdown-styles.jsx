import styled from "styled-components";
import { 
  BaseButtonContainer, 
  GoogleSignInButton, 
  InvertedButtonContainer } from "../button/button-component-styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  // This is how we use styling on already defined styled components that is nested inside a container
  ${BaseButtonContainer},
  ${GoogleSignInButton},
  ${InvertedButtonContainer} {
    margin-top: auto;
  }
`;

// If you want to apply seperate styles for these already defined components that is not inside a div
// This is how its done
// export const ExampleContainer = styled(InvertedButtonContainer)`
//   color: white;
//   background-color: black;
// `;

export const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;