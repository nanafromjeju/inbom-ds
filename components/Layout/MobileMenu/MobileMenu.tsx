import { useState } from 'react';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: '/icons/mobile-menu1.svg', label: '전문업체', path: '/provider' },
  { icon: '/icons/mobile-menu2.svg', label: '시공사례', path: '/portfolio' },
  { icon: '/icons/mobile-menu3.svg', label: '커뮤니티', path: '/community' },
  { icon: '/icons/mobile-menu4.svg', label: '이용가이드', path: '/guide' },
];

const quickMenuItems = [
  { icon: '/icons/mobile-menu7.svg', label: '나의 활동', path: '/mypage' },
  {
    icon: '/icons/mobile-menu6.svg',
    label: '견적 내역',
    path: '/mypage?tab=history',
  },
  {
    icon: '/icons/mobile-menu8.svg',
    label: '혜택 현황',
    path: '/mypage?tab=reward',
  },
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuHeader}>
        <button className={styles.homeButton} aria-label="홈으로 이동">
          <img src="/icons/home-icon.svg" alt="홈" role="presentation" />
        </button>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="메뉴 닫기"
        >
          <img src="/icons/close-icon.svg" alt="닫기" role="presentation" />
        </button>
      </div>

      <div className={styles.userSection}>
        <div className={styles.infoSection}>
          <div className={styles.userMenu}>
            <button className={styles.profileInfo}>
              <img
                src="/images/avatar.png"
                alt="홍길동 프로필"
                className={styles.profileImage}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>홍길동</span>
                <span className={styles.userRole}>일반회원</span>
              </div>
            </button>
            <button className={styles.logoutButton}>로그아웃</button>
          </div>

          <div className={styles.quickMenu}>
            {quickMenuItems.map((item, index) => (
              <button key={index} className={styles.quickMenuItem}>
                <img src={item.icon} alt={item.label} role="presentation" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.menuContent}>
        <h2>전체메뉴</h2>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <img src={item.icon} alt="" role="presentation" />
              <span>{item.label}</span>
              <img
                src="/icons/arrow-right.svg"
                alt=">"
                className={styles.arrow}
                role="presentation"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
