import React from "react";

const Header = () => {
  return (
    <div className="flex w-full bg-gray-200">
      <div className="flex justify-between items-center w-[1440px] h-[108px] my-0 mx-auto">
        <h1>logo</h1>
        <nav className="flex items-center  gap-2">
          <h3>검색</h3>
          <h3>통합로그인</h3>
          <h3>마이페이지</h3>
        </nav>
      </div>
    </div>
  );
};

export default Header;
