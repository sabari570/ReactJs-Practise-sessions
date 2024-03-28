import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 80px;
    height: 80px;
`;

export const BouncingBall = styled.div`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #333;
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #333 transparent transparent transparent;

    &:nth-child(1) {
        animation-delay: -0.45s;
    }

    &:nth-child(2) {
        animation-delay: -0.3s;
    }

    &:nth-child(3) {
        animation-delay: -0.15s;
    }
`;
