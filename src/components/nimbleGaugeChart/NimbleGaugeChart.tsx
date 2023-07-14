/* eslint-disable no-shadow */
import React from 'react';
import {PieChart, Pie, Cell, Label} from 'recharts';

const RADIAN = Math.PI / 180;

const value = 20; // could be useful to mark red line

const NimbleGaugeChart = ({
  data,
  chartHeight,
  title,
  amount,
  variance,
  description,
  variancePositiveColor,
  varianceNegativeColor,
  minValue,
  maxValue,
}) => {
  const type = Math.sign(variance);
  const height = chartHeight;
  const width = height;
  const cx = height / 2;
  const cy = width / 2;
  const oR = height / 3;
  const iR = oR - 15;

  return (
    <PieChart width={width} height={height}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR - 5}
        outerRadius={oR + 5}
        fill="#FFFFFF"
        stroke="#cbcbcb"></Pie>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        stroke="none">
        {data.map((entry: {name: string; value: number; color: string}, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
        <Label
          position="center"
          content={
            <>
              <text
                x={cx + 5}
                y={cy - height / 10}
                style={{fontSize: '28px'}}
                textAnchor="middle"
                dominantBaseline="central">
                {amount}
              </text>
              <text
                x={cx - 5}
                y={height / 2}
                style={{fontSize: '16px', color: type === -1 ? varianceNegativeColor : variancePositiveColor}}
                fill={type !== -1 ? varianceNegativeColor : variancePositiveColor}>
                {variance}
              </text>
              <text
                x={cx + 5}
                y={cy + 30}
                textAnchor="middle"
                dominantBaseline="central"
                style={{fontSize: '16px', color: '#3c4859', fontFamily: ''}}>
                {description}
              </text>
            </>
          }></Label>
      </Pie>
      <defs>
        <polygon
          id="Triangle"
          points={type !== -1 ? '10,0 5,10 15,10' : '5,0 10,10 15,0'}
          style={{fill: type !== -1 ? varianceNegativeColor : variancePositiveColor}}
        />
      </defs>
      <use x={cx - 25} y={cy - 10} xlinkHref="#Triangle" />
    </PieChart>
  );
};
export default NimbleGaugeChart;
