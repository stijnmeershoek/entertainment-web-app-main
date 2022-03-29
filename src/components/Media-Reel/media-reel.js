import React, { useRef, useState } from "react";
import "./media-reel.css";
import { useConveyer } from "@egjs/react-conveyer";
import { ReactComponent as NextArrow } from "../../assets/next-arrow.svg";
import { ReactComponent as PreviousArrow } from "../../assets/prev-arrow.svg";

export function Slider(props) {
  const conveyorRef = useRef(null);
  const { scrollIntoView } = useConveyer(conveyorRef, {
    horizontal: true,
  });

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    if (conveyorRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = conveyorRef.current;
      if (scrollLeft + clientWidth === scrollWidth) {
        setAtEnd(true);
        return;
      }
      if (scrollLeft === 0) {
        setAtStart(true);
        return;
      }
      setAtEnd(false);
      setAtStart(false);
    }
  };

  return (
    <div className="horizontal-slider">
      <button
        className="prev btn"
        disabled={atStart}
        onClick={() => {
          scrollIntoView("start", {
            align: "end",
            duration: 500,
          });
        }}
      >
        <PreviousArrow />
      </button>
      <button
        className="next btn"
        disabled={atEnd}
        onClick={() => {
          scrollIntoView("end", {
            align: "start",
            duration: 500,
          });
        }}
      >
        <NextArrow />
      </button>
      <div onScroll={onScroll} ref={conveyorRef} className="media-reel overflowing" role="list">
        {props.children}
      </div>
    </div>
  );
}
