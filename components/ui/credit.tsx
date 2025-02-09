import React from "react";
import Link from "next/link";

interface CreditProps {
  name: string;
  link?: string;
  role?: string;
}

const Credit: React.FC<CreditProps> = ({ name, link, role = "สร้างโดยใช้งาน AI เยี่ยงทาส by" }) => {
  return (
    <div className="mt-5 text-center bg-gradient-to-r from-[#ff4655] to-[#ff808a] inline-block text-transparent bg-clip-text">
      {/* <Separator /> */}
      <span>{role} </span>
      {link ? (
        <Link
          href={link}
          className="font-medium  hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </Link>
      ) : (
        <span className="font-medium">{name}</span>
      )}
    </div>
  );
};

export default Credit;
