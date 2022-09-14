import styles from '../../CSS/authcss/AuthFooter.module.css';
export function AuthFooter() {
  return (
    <>
      <div className={styles.FooterContainer}>
        <div className={styles.LogoImgDiv}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/pchrLogo.png`}
            alt="logo"
            className={styles.LogoImg}
          />
        </div>
        <div className={styles.FooterTxt}>PCHR Co.,Ltd. Copyright © PCHR. All rights reserved.</div>
      </div>
    </>
  );
}
