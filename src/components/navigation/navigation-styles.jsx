import styled from "styled-components";
import { Link } from "react-router-dom";


// this is how we use styled-components in reactJs
// First import styled from styled-components package
// then create a component and then the syntax is
// styled.div``; (`` -> is the back ticks used for string interpolation)
// We can also use inbuilt component in it like styled(Link)
// HTML tags like styled.div/ styled.h2/ styled.p, etc

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;