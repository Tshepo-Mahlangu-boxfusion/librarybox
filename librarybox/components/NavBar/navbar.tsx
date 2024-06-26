import React, { useEffect, useReducer, useState } from 'react';
import { useStyles } from './styles/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import Image from 'next/image'; 
import BookNestLogo from '../../public/assets/img/lib.png'; 
import { useLoginState, useUser } from '../../Providers/LoginProviders';
import { useTransaction, useTransactionState } from '../../Providers/TransactionProvider';
import { IUser } from '../../Providers/LoginProviders/context';
import { useConfigState } from '../../Providers/ConfigProvider';
import { ConfigReducer } from '../../Providers/ConfigProvider/reducer';
import { ConfigAction } from '../../Providers/ConfigProvider/actions';
import { IConfig } from '../../Providers/ConfigProvider/context';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Catalogue", href: "/catalog" },
  { name: "About", href: "/about" },
];

const NavBar = () => {
  const state = useLoginState();
  const status = useTransactionState();
  const { getUserDetails } = useUser();
  const { fetchtransaction } = useTransaction();
  const [userId, setUserId] = useState('');

  const states = useConfigState();
  const [s, dispatch]=useReducer(ConfigReducer,states);

  const title = s.FetchConfig && s.FetchConfig[0] && s.FetchConfig[0].name;
  const color = s.FetchConfig && s.FetchConfig[0] && s.FetchConfig[0].primaryColor;

  useEffect(()=>{
   
    if(localStorage.getItem('Config') ){
    
      const ans = localStorage.getItem('Config');
      const newtypeAns:IConfig[] = ans? JSON.parse(ans): [];
 
      dispatch(ConfigAction(newtypeAns));
      const dataConfig: IConfig[] = ans ? JSON.parse(ans) : [];

    }
  },[states])
  
  
  useEffect(() => {
    getUserDetails && getUserDetails().then((user: IUser) => {
      if (user && user.id) {
        setUserId(user.id); // Set the userId state when user details are fetched
      }
    });
  }, [states]);
  
  useEffect(() => {
    if (fetchtransaction && userId) { // Ensure userId is not null
      fetchtransaction(Number(userId)); // Call fetchtransaction with userId
    }
  }, [state]);

  const data=status.FetchTransaction && status.FetchTransaction[status.FetchTransaction.length-1] && status.FetchTransaction[status.FetchTransaction.length-1].book?.url;
  
  const haveToken = localStorage.getItem("token") !== null;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { styles } = useStyles();
  const {logOutUser} =useUser();
  
  // Check if the user is on the login page
  const isLoginPage = pathname === '/login';
  const isRegister =pathname==='/register'

  // Hide the navbar if the user is on the login page
  if (isLoginPage) {
    return null;
  }
  if(isRegister){
    return null
  }


  

  return (
    <nav className={styles.navContainer} style={{backgroundColor: color}}>
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
        
          <Button onClick={() => setOpen(true)} className={styles.profileButton} style={{backgroundColor: color}}>
            <UserOutlined />
          </Button>
        
        <Drawer title="Profile" onClose={() => setOpen(false)} open={open} style={{backgroundColor: color}}>
          <div className={styles.drawerItems}>
            <h2>{state.currentUser?.name}</h2>
            <h2>{state.currentUser?.surname}</h2>
            <h2>{state.currentUser?.emailAddress}</h2>
            <br />
          
            {data && data.length > 0 && (
                <>
                  <hr style={{ margin: '15px 0', borderColor: '#eab676' }} />
                  <h2>Recently borrowed</h2>
                  <div>
                    <a><img className={styles.img} src={data} alt="Book" /></a>
                  </div>
                  <br/>
                  <Button style={{ backgroundColor: ' #d3a962' }}>
                    <Link href="/history">View more</Link>
                  </Button>
                  <hr style={{ margin: '15px 0', borderColor: '#eab676' }} />
                </>
              )}
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
