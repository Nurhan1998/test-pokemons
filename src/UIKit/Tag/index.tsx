import React from "react";

import "./Tag.scss";

interface ITag {
  children: React.ReactElement;
  bgColor: string;
}

const Tag = ({ children, bgColor }: ITag) => {
  return <span className={`tag color-type-${bgColor}`}>{children}</span>;
};

export default Tag;
