import { Link } from 'react-router-dom';
import './header.css';
export default function Header() {
  return (
    <div className="header">
      <Link to="/">헤더</Link>
    </div>
  );
}
