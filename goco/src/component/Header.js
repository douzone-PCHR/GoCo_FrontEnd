import { Link } from "react-router-dom";
import "./header.css";
export default function Header() {
  return (
    <div className="header">
      <Link to="/">헤더</Link>
      <Link to="/manager">관리자 페이지</Link>
    </div>
  );
}
