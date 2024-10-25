import React from 'react';
import FaceBook from "./IconSVGs/FaceBook";
import Twitter from "./IconSVGs/Twitter";
import Quote from "./IconSVGs/Quote";

const list = {
  FaceBook: FaceBook,
  Twitter: Twitter,
  Quote: Quote,
};

type IconName = keyof typeof list; 

interface IconProps {
  name?: IconName; 
  className?: string;
}

export default function Icon({ name = "FaceBook", className }: IconProps) {
  const IconComponent = list[name];

  return (
    <span className={className}>
      <IconComponent />
    </span>
  );
}
