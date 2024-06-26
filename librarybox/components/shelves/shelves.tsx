
'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Card, Space } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import { useStyles } from './styles/style';
import { useBookAction, useBookState } from '../../Providers/BookProviders';
import { IShelf } from '../../Providers/BookProviders/context';
import Link from 'next/link';

const Shelves: React.FC = () => {
  const { styles } = useStyles();
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { fetchShelf } = useBookAction();
  const status = useBookState();

  useEffect(() => {
    fetchShelf && fetchShelf();
  }, []);

  const handleArrowClick = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollStep = 100; // You can adjust the scroll step as needed
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScrollLeft = scrollWidth - clientWidth;
    let newScrollLeft = container.scrollLeft + scrollStep;
    if (newScrollLeft > maxScrollLeft) {
      newScrollLeft = maxScrollLeft;
    }
    container.scrollLeft = newScrollLeft;
  };
  

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const x = event.clientX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 3;
      containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      if (!containerRef.current) return;
      containerRef.current.style.cursor = 'grab';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (!containerRef.current) return;
      setStartX(event.clientX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
      containerRef.current.style.cursor = 'grabbing';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [startX, scrollLeft]);

  return (
    <>
      <div className={styles.headercontainer}>
        <br />
        <h2 className={styles.header}>Browse the shelves</h2>
      </div>
      <br />
      <div className={styles.container}>
        <Space className={styles.cardBox}>
          {status.BookShelf?.map((item: IShelf, index: number) => (
            <Link href={{ pathname: `/catalog/shelf/${item.id}` }} key={item.id}>
              <Card className={styles.card}>
                <h1>{item.name}</h1>
              </Card>
            </Link>
          ))}
        </Space>
        <div className={styles.arrowContainer} onClick={handleArrowClick}>
          <RightCircleOutlined className={styles.arrow} />
        </div>
      </div>
    </>
  );
};

export default Shelves;
