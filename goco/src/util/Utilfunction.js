import "moment/locale/ko";
import moment from "moment";
import { Button } from "@mui/material";

export function myTeamStatus(data) {
  let result = "";
  let check = "";
  if (data.vacation_approve === "APPROVE_SUCCESS") {
    result = `${moment(data.vacation_start_date).format(
      "YYYY-MM-DD"
    )} ~ ${moment(data.vacation_end_date).format("YYYY-MM-DD")}`;
    check = (
      <Button
        style={{
          backgroundColor: "#FCC967",
          color: "#FFFFFF",
          fontSize: "16px",
          border: "1px solid #B3B3B3",
          fontWeight: "700",
        }}
      >
        휴가
      </Button>
    );
  } else if (data.business_approve === "APPROVE_SUCCESS") {
    result = `${moment(data.business_trip_start_date).format(
      "YYYY-MM-DD"
    )} ~ ${moment(data.business_trip_end_date).format("YYYY-MM-DD")}`;
    check = (
      <Button
        style={{
          backgroundColor: "green",
          color: "#FFFFFF",
          fontSize: "16px",
          border: "1px solid #B3B3B3",
          fontWeight: "700",
        }}
      >
        출장
      </Button>
    );
  } else {
    if (
      moment(data.clock_out).format("HH") === "00" &&
      moment(data.clock_in).format("HH") !== "00"
    ) {
      result = `출근 ${moment(data.clock_in).format("HH시mm분")}`;
      check = (
        <Button
          style={{
            backgroundColor: "#00AAFF",
            color: "#FFFFFF",
            fontSize: "16px",
            border: "1px solid #B3B3B3",
            fontWeight: "700",
          }}
        >
          근무 중
        </Button>
      );
    } else if (
      moment(data.clock_out).format("HH") === "00" &&
      moment(data.clock_in).format("HH") === "00"
    ) {
      result = `미출근`;
      check = (
        <Button
          style={{
            backgroundColor: "black",
            color: "#FFFFFF",
            fontSize: "16px",
            border: "1px solid #B3B3B3",
            fontWeight: "700",
          }}
        >
          미출근
        </Button>
      );
    } else {
      result = `출근 ${moment(data.clock_in).format("HH시mm분")} 
                  퇴근 ${moment(data.clock_out).format("HH시mm분")}
        `;
      check = (
        <Button
          style={{
            backgroundColor: "#FF8B8B",
            color: "#FFFFFF",
            fontSize: "16px",
            border: "1px solid #B3B3B3",
            fontWeight: "700",
          }}
        >
          퇴근
        </Button>
      );
    }
  }

  return { result, check };
}
