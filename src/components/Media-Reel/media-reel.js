import React, { useEffect, useRef, useState } from "react";
import "./media-reel.css";
import { useConveyer } from "@egjs/react-conveyer";
import { ReactComponent as NextArrow } from "../../assets/next-arrow.svg";
import { ReactComponent as PreviousArrow } from "../../assets/prev-arrow.svg";

export function Slider(props) {
  const conveyorRef = useRef(null);
  const { scrollIntoView, updateItems } = useConveyer(conveyorRef, {
    horizontal: true,
    preventClickOnDrag: true,
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

  useEffect(() => {
    updateItems();
  });

  return (
    <div className="horizontal-slider">
      <button
        aria-label="previous"
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
        aria-label="next"
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
      <div onScroll={onScroll} ref={conveyorRef} className="media-reel overflowing">
        {props.children}
      </div>
    </div>
  );
}
