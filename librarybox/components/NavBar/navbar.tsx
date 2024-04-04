import React, { useEffect, useState } from 'react';
import { useStyles } from './styles/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import Image from 'next/image'; 
import BookNestLogo from '../../public/assets/img/lib.png'; 
import Book from '../../public/assets/img/roman.jpg'; 
import { useLoginState, useUser } from '../../Providers/LoginProviders';
import { useTransaction, useTransactionState } from '../../Providers/TransactionProvider';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Catalogue", href: "/catalog" },
  { name: "About", href: "/about" },
  { name: "Bookings", href: "/contact" },
];

const NavBar = () => {
  const state = useLoginState();
  const { getUserDetails } = useUser();
  useEffect(() => {
    getUserDetails && getUserDetails();
  }, []);
 
  const status = useTransactionState();
  const data=status.FetchTransaction && status.FetchTransaction[0] && status.FetchTransaction[0].book?.url;
  const { fetchtransaction } = useTransaction();


  useEffect(() => {
    if (fetchtransaction) {
      if (state.currentUser?.id) {
        fetchtransaction(state.currentUser.id);
      }
    }
  }, []);
  const haveToken = localStorage.getItem("token") !== null;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { styles } = useStyles();
  const {logOutUser} =useUser();
  
  // Check if the user is on the login page
  const isLoginPage = pathname === '/login';

  // Hide the navbar if the user is on the login page
  if (isLoginPage) {
    return null;
  }

  return (
    <nav className={styles.navContainer}>
      <div>
        <a><Image className={styles.img} src={BookNestLogo} alt="BookNest Logo" /></a>
      </div>
      <div className={styles.list}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link href={link.href} key={link.name}>
              <span className={`${styles.items} ${isActive ? styles.active : ''}`}>{link.name}</span>
            </Link>
          );
        })}
      </div>
      {haveToken?
      <div>
        
          <Button onClick={() => setOpen(true)} className={styles.profileButton} >
            <UserOutlined />
          </Button>
        
        <Drawer title="Profile" onClose={() => setOpen(false)} open={open} style={{ background: '#873e23' }}>
          <div className={styles.drawerItems}>
            <h3>{state.currentUser?.name}</h3>
            <h3>{state.currentUser?.surname}</h3>
            <h3>{state.currentUser?.emailAddress}</h3>
            <br />
            <Button style={{ backgroundColor: 'transparent'}}>
              <Link href="/">Update profile</Link>
            </Button>
            <hr style={{ margin: '15px 0', borderColor: '#eab676'}} />
            <h2>Recently borrowed</h2>
            <div>
              <a><img className={styles.img} src={data} alt="Book" /></a>
            </div>
            <br/>
            <Button style={{ backgroundColor: 'transparent'}}>
              <Link href="/history">View more</Link>
            </Button>
            <hr style={{ margin: '15px 0', borderColor: '#eab676'}} />
          </div>
          <div>
            <h4 className={`${styles.logout} ${styles.logoutHover}`} onClick={logOutUser}><LogoutOutlined /> Logout</h4>
          </div>
        </Drawer>
      </div>
      :null
    }
    </nav>
  );
}

export default NavBar;
