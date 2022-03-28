import React from "react";
function IconBase({ path, className, viewBox, type = "fill" }) {
  return React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: viewBox, fill: type === "fill" ? "currentColor" : "none", stroke: type === "stroke" ? "currentColor" : "none", width: "1em", className: className }, path);
}
export const createIcon = (path, displayName, viewBox, type = "fill") => {
  const Icon = ({ className }) => React.createElement(IconBase, { path: path, className: className, viewBox: viewBox, type: type });
  Icon.displayName = displayName;
  return Icon;
};
