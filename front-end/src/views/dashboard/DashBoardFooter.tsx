import React from "react";

export default function DashBoardFooter() {
  return (
    <footer className="h-[3rem] bg-[var(--secondary)] relative border-t-white border-t-2 px-8 ">
      <div className="text-white">
        <small className="font-bold">
          &#169;{" "}
          <span className="ml-2 md:text-left text-center ">2024 Edusphere</span>
        </small>
      </div>
    </footer>
  );
}
