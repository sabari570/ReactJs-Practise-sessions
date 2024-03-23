import styled from 'styled-components';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// Here we are directly applying styles for the ShoppingIcon component where the particular SVG is imported as a component
// and now on returning this to the component file we can directly use the ShoppingIconContainer which will already have the styles and the SVG inside it
export const ShoppingIconContainer = styled(ShoppingIcon)`
  width: 24px;
  height: 24px;
`;

export const ItemCountContainer = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;