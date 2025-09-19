"use client";

import React, { useState } from "react";
import ReactCountUp, { CountUpProps } from "react-countup";
import { useInView } from "react-intersection-observer";

export default function CountUp(props: CountUpProps) {
  const [startCounter, setStartCounter] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false, // Always trigger when the section is in view
    threshold: 0.5,     // Trigger when 50% of the section is visible
  });

  React.useEffect(() => {
    if (inView) {
      setStartCounter(true); // Start counter when in view
    } else {
      setStartCounter(false); // Reset counter when out of view
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {startCounter && <ReactCountUp
        {...props}
        duration={1}
      />}
    </div>
  );
}
