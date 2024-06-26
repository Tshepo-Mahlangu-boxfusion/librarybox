'use client'
import React from 'react';
import Search from '../../../../components/Search/search';
import { useStyles } from './styles/style';
import TopChoice from '../../../../components/topChoices/page';
import Shelves from '../../../../components/shelves/shelves';
import UpcomingBook from '../../../../components/upcomingBooks/page';

const Catalog = () => {
  const { styles } = useStyles();
  
  return (
    <div className={styles.main}>
      <Search>
        <div className={styles.scroll}>
          <Shelves />   
          <TopChoice/>
        </div>
      </Search>
    </div>
  );
}

export default Catalog;
