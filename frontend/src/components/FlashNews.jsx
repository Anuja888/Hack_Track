import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Megaphone } from 'lucide-react';

const FlashNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hackathons');
        setNews(res.data);
      } catch (err) {
        console.error('Failed to fetch hackathons');
      }
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {news.map((item) => (
          <div key={item._id} className="news-item">
            <Megaphone size={16} color="var(--secondary)" />
            <span className="news-badge">{item.domain}</span>
            <strong>{item.title}</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>- Prize: {item.prize} | Deadline: {new Date(item.deadline).toLocaleDateString()}</span>
          </div>
        ))}
         {/* Duplicate for infinite effect */}
         {news.map((item) => (
          <div key={`${item._id}-dup`} className="news-item">
            <Megaphone size={16} color="var(--secondary)" />
            <span className="news-badge">{item.domain}</span>
            <strong>{item.title}</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>- Prize: {item.prize} | Deadline: {new Date(item.deadline).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashNews;
