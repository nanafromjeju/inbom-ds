import { useState } from 'react';
import styles from './NavBar.module.scss';
import MobileMenu from '../MobileMenu/MobileMenu';

interface NavItem {
  id: number;
  icon: string;
  label: string;
  path: string | null;
}

const navItems: NavItem[] = [
  { id: 1, icon: '/icons/navbar-icon-1.svg', label: '홈', path: '/' },
  {
    id: 2,
    icon: '/icons/navbar-icon-2.svg',
    label: '마이페이지',
    path: '/mypage',
  },
  {
    id: 3,
    icon: '/icons/navbar-icon-3.svg',
    label: '견적작성',
    path: '/estimate',
  },
  {
    id: 4,
    icon: '/icons/navbar-icon-4.svg',
    label: '시공사례',
    path: '/portfolio',
  },
  { id: 5, icon: '/icons/navbar-icon-5.svg', label: '전체메뉴', path: null },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav className={styles.bottomNav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={styles.navItem}
            onClick={() => item.id === 5 && setIsMenuOpen((prev) => !prev)}
            aria-label={item.label}
          >
            {item.id === 3 ? (
              <div className={styles.specialIcon}>
                <img src={item.icon} alt={item.label} role="presentation" />
                <span className={styles.label}>{item.label}</span>
              </div>
            ) : (
              <>
                <span className={styles.icon}>
                  <img src={item.icon} alt={item.label} role="presentation" />
                </span>
                <span className={styles.label}>{item.label}</span>
              </>
            )}
          </button>
        ))}
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default NavBar;
