import { BouncingBall, SpinnerContainer } from "./spinner-styles";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <BouncingBall />
      <BouncingBall />
      <BouncingBall />
    </SpinnerContainer>
  );
};

export default Spinner;
