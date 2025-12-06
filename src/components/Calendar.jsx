import CalendarDay from './CalendarDay';
import { ARTICLES } from '../constants/articles';
import './Calendar.css';

const Calendar = () => {
  // 1日から25日までの配列を生成
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">🎄 Advent Calendar 2025 🎄</h1>
      <div className="calendar-grid">
        {days.map(day => (
          <CalendarDay 
            key={day} 
            day={day} 
            article={ARTICLES[day]} 
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
