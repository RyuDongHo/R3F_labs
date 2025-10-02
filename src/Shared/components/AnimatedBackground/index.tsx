import React from "react";
import useAnimatedBackground from "./model/useAnimatedBackground";

const AnimatedBackground = (): React.ReactElement => {
  const backgroundColor = useAnimatedBackground();

  return <color attach="background" args={[backgroundColor]} />;
};

export default AnimatedBackground;