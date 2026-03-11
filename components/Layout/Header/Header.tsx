import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h1 className={styles.logo}>
            <a href="/">
              <img src="/logos/logo.svg" alt="인봄" />
            </a>
          </h1>

          <nav className={styles.menuList} aria-label="주요 메뉴">
            <ul>
              <li>전문업체</li>
              <li>시공사례</li>
              <li>커뮤니티</li>
              <li>이용가이드</li>
            </ul>
          </nav>
        </div>

        <div className={styles.rightSection}>
          <button type="button" className={styles.signInButton}>
            로그인
          </button>
          <button type="button" className={styles.signUpButton}>
            회원가입
          </button>
          <button type="button" className={styles.estimateButton}>
            견적요청
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
