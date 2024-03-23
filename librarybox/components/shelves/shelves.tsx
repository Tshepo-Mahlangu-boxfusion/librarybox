import React, { useRef, useState, useEffect } from 'react';
import { Card, Space } from 'antd';
import { useStyles } from './styles/style';
import { useRouter } from 'next/navigation';
import { useBookAction, useBookState } from '../../Providers/BookProviders';
import { IShelf } from '../../Providers/BookProviders/context';

const Shelves: React.FC = () => {
  const { styles } = useStyles();
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router=useRouter();

  const {fetchShelf}=useBookAction();
  const status=useBookState();


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
  
  useEffect(()=>{
    fetchShelf&&fetchShelf();
  },[])


  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
      <Space className={styles.cardBox}>
        {status.BookShelf?.map((item, index:number) => (
          <Card className={styles.card} key={index} >
            <h1>{item.name}</h1>
          </Card>
        ))}
      </Space>
    </div>
  );
}

export default Shelves;
