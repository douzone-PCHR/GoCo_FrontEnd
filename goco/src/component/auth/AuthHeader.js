import styles from '../../CSS/authcss/AuthHeader.module.css';
export function Authheader() {
  return (
    <>
      <div className={styles.HeaderCSS}>
        <img src={`${process.env.PUBLIC_URL}/assets/gocoLogo.png`} alt="logo" className="Logo" />
      </div>
    </>
  );
}
