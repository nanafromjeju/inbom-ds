import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contact}>
            <h2 className={styles.phone}>1588-1234</h2>
            <p className={styles.hours}>
              평일 09:00 - 18:00
              <br />
              (점심시간 12:00 - 13:00 제외, 주말/공휴일 제외)
            </p>
          </div>

          <div className={styles.links}>
            <a href="/business/form" className={styles.link}>
              사업자 입점 신청
            </a>
            <span className={styles.divider}>|</span>
            <a href="/terms" className={styles.link}>
              이용약관
            </a>
            <span className={styles.divider}>|</span>
            <a href="/privacy" className={styles.link}>
              개인정보처리방침
            </a>
          </div>
        </div>

        <p className={styles.disclaimer}>
          상호명 : (주)인봄 | 대표자 : 홍길동 | 사업자등록번호 : 123-45-67890 |
          주소 : 서울특별시 강남구 테헤란로 123, 인봄타워 8층 | 통신판매번호 :
          2025-서울강남구-0001호
        </p>

        <p className={styles.copyright} aria-hidden="true">
          (주)인봄은 통신판매중개자로서 건축 공사의 주 거래 당사자가 아니며,
          시공전문가가 제공한 견적 및 공사 시공 서비스에 대해 일체 책임을 지지
          않습니다. <br />
          그러나 소비자 보호를 위해 허위 견적·사기 행위 차단과 안전한 거래 환경
          조성을 위한 다양한 서비스와 시스템을 제공하고 있습니다.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
