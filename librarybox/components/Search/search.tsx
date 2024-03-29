import React, { useState } from 'react';
import { Input, Card } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useStyles } from './styles/styles';
import data from './template.json';
import Image from 'next/image';
import Shelves from '../shelves/shelves';
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { styles } = useStyles();
  const { Search } = Input;
  const [search, setSearch] = useState<boolean>(false); // Initialize search state

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    setSearch(true); // Set search state to true when user performs a search
  };

  const filteredData = data.filter(item =>
    searchTerm !== '' &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value !== ''); // Toggle search state based on whether there's a search term
  };

  return (
    <div className={styles.searchContainer}>
      <Search
        placeholder="Search Shelves"
        allowClear
        prefix={<SearchOutlined />}

        onSearch={onSearch}
        onChange={handleSearchChange}
        className={styles.searchBox}
      />
      {!search && searchTerm === '' && !filteredData.length && ( // Show shelves if search is not active, there's no search term, and there are no search results
        <div className={styles.container}>
          <br/>
          <h2>Browse through the shelves</h2>
          <br />
          <div>
            <Shelves />
          </div>
        </div>
      )}
      {searchTerm !== '' && (
        <>
          {filteredData.length > 0 ? (
            <div className={styles.data}>
              {filteredData.map(item => (
                <Card key={item.id} className={styles.searchCard} cover={<Image src="/assets/img/book.png" alt="Stack of books" width={240} height={160} />}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>Authors: {item.authors.join(', ')}</p>
                    <p>ISBN: {item.isbn}</p>
                    <p>Category: {item.category}</p>
                    <p>Shelf: {item.shelf}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className={styles.container}>
              <h2>No results found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
