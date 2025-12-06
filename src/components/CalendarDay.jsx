import './CalendarDay.css';

const CalendarDay = ({ day, article }) => {
  // 記事がある場合はリンク付きカード、ない場合は日付のみ表示
  if (article) {
    return (
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="calendar-day has-article"
      >
        <div className="day-number">{day}</div>
        <div className="day-title">{article.title}</div>
      </a>
    );
  }

  return (
    <div className="calendar-day no-article">
      <div className="day-number">{day}</div>
    </div>
  );
};

export default CalendarDay;
