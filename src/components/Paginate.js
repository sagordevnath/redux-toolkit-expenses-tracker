import React from "react";
import { useSelector } from "react-redux";

export default function Paginate({type, handlePaginate}) {
  const { totalCount } = useSelector((state) => state.filter);
  const page = Math.ceil(totalCount / 5);
  const pageArr = new Array(+page || 0).fill(false);
  
  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {pageArr.map((p, index) => (
        <button
        key={index}
          style={{
            background: "#5547FF",
            color: "#fff",
            padding: "5px 15px",
            outline: "none",
            border: "none",
            fontSize: "20px",
            marginRight: 1,
            cursor: "pointer",
          }}
          name={index + 1}
          onClick={handlePaginate}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
