import React from 'react'
import FaceBook from "./IconSVGs/FaceBook";
import Twitter from "./IconSVGs/Twitter";
import Quote from "./IconSVGs/Quote";
import "./Icons.css";

const list = {
  FaceBook: FaceBook,
  Twitter: Twitter,
  Quote: Quote,
};


const Icons = ({ name = "FaceBook" }) => {
  const Icon = list[name];

  return (
    <span className="Icons">
      <Icon />
    </span>
  );
};

export default Icons
