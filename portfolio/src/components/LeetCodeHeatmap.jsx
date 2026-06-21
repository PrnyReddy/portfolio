import React, { useState, useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

export const LeetCodeHeatmap = ({ username, theme, blockSize, blockMargin, fontSize }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateFullYear = () => {
      const result = [];
      const end = new Date();
      const start = new Date();
      start.setFullYear(start.getFullYear() - 1);

      let current = new Date(start);
      while (current <= end) {
        result.push({
          date: current.toISOString().split('T')[0],
          count: 0,
          level: 0,
        });
        current.setDate(current.getDate() + 1);
      }
      return result;
    };

    fetch(`https://leetcode-sub-endpoint.vercel.app/leetcode/${username}`)
      .then(res => res.json())
      .then(apiData => {
        const fullYear = generateFullYear();
        const finalData = fullYear.map(day => {
          const count = apiData[day.date] || 0;
          return {
            ...day,
            count: count,
            level: count > 0 ? Math.min(count, 4) : 0
          };
        });
        setData(finalData);
      })
      .catch(err => {
        console.error("Failed to fetch LeetCode data", err);
        setData(generateFullYear()); // Show empty year on error
      });
  }, [username]);

  if (data.length === 0) return null;

  return (
    <ActivityCalendar 
      data={data}
      theme={theme}
      blockSize={blockSize}
      blockMargin={blockMargin}
      fontSize={fontSize}
      hideColorLegend={false}
      hideMonthLabels={false}
      labels={{
        totalCount: `Total submissions: ${data.reduce((acc, curr) => acc + curr.count, 0)}`,
      }}
    />
  );
};
