import React from "react";
import { CATEGORIES } from "../constants";

export default function CategorySelect(props) {
  const handleChange = (e) => {
    props.onCategoryChange(e.target.value);
  };
  return (
    <select value={props.category} onChange={handleChange}>
      {Object.values(CATEGORIES).map((cateogry) => {
        return (
          <option value={cateogry.value} key={cateogry.value}>
            {cateogry.label}
          </option>
        );
      })}
    </select>
  );
}
