import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import React, { useState } from "react";

export const Select = ({ data }) => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <select value={age} onChange={handleChange}>
      <option value={data && data[0].id}>{data && data[0].content}</option>
      <option value={data && data[1].id}>{data && data[1].content}</option>
      <option value={data && data[2].id}>{data && data[2].content}</option>
      <option value={data && data[3].id}>{data && data[3].content}</option>
      {/* <option value={data && data[4].id}>{data && data[4].content}</option> */}
    </select>
  );
};
