import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-img-div">
          <img
            src={`${process.env.PUBLIC_URL}/assets/pchrLogo.png`}
            alt="logo"
            className="logo-img"
          />
        </div>
        <div className="footer-txt">PCHR Co.,Ltd. Copyright © PCHR. All rights reserved.</div>
      </div>
    </footer>
  );
}
