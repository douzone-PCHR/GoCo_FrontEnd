import { useEffect, useState } from "react";
import commuteAPI from "../api/commuteAPI";
import { loginDefaultValue } from "../api/work/workAPI";
import ManagerMain from "./manager/ManagerMain";

import Schedule from "./schedule/Schedule";

export default function Main({ replace }) {
  return (
    <div>
      <Schedule />
    </div>
  );
}
