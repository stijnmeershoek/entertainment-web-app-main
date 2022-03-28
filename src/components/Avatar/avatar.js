import React from "react";
export function Avatar({ src, alt = "" }) {
  return React.createElement("img", { className: "avatar", src: src, alt: alt, width: 40, height: 40 });
}
