/* eslint-disable no-shadow */
import React from 'react';
import {PieChart, Pie, Cell, Label} from 'recharts';

interface NimbleGaugeChartProps {
  gaugeColor?: string;
  chartHeight?: number;
  fontFamily?: string;
  title?: string;
  titleFontSize?: string;
  chartValue: number;
  amountLabel?: string;
  amountFontSize?: string;
  variance?: number;
  varianceFontSize?: string;
  variancePositiveColor?: string;
  varianceNegativeColor?: string;
  description?: string;
  descriptionFontSize?: string;
  maxValue: number;
  threshold?: number;
}

const NimbleGaugeChart: React.FC<NimbleGaugeChartProps> = ({
  gaugeColor,
  chartHeight = 300,
  fontFamily,
  title,
  titleFontSize,
  chartValue,
  amountLabel,
  amountFontSize = '28px',
  variance,
  varianceFontSize = '16px',
  variancePositiveColor,
  varianceNegativeColor,
  description,
  descriptionFontSize = '12px',
  maxValue,
  threshold,
}) => {
  const gaugeValue = [
    {value: chartValue, color: gaugeColor},
    {value: maxValue - chartValue, color: 'transparent'},
  ];

  const thresholdValue = threshold
    ? [
        {value: threshold - 1, color: '#FFFFFF'},
        {value: 1, color: 'red'},
        {value: maxValue - threshold - 1, color: '#FFFFFF'},
      ]
    : [{value: maxValue, color: '#FFFFFF'}];

  const type = variance && Math.sign(variance);
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
        data={thresholdValue}
        cx={cx}
        cy={cy}
        innerRadius={iR - 5}
        outerRadius={oR + 5}
        fill="transparent"
        stroke="#cbcbcb">
        {thresholdValue?.map((entry, index: number) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color}
            stroke={index === 1 ? entry.color : '#cbcbcb'}
            strokeWidth={index === 1 ? 2 : 1}
          />
        ))}
      </Pie>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={gaugeValue}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        stroke="none">
        {gaugeValue?.map((entry, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
        <Label
          position="center"
          content={
            <>
              <text
                x={cx + 5}
                y={cy - height / 2.5}
                textAnchor="middle"
                dominantBaseline="central"
                style={{fontSize: titleFontSize, color: '#3c4859', fontFamily: ''}}>
                {title}
              </text>
              <text
                x={cx + 5}
                y={cy - height / 10}
                style={{fontSize: amountFontSize}}
                textAnchor="middle"
                dominantBaseline="central">
                {amountLabel}
              </text>
              <text
                x={cx - 8}
                y={height / 2}
                style={{fontSize: varianceFontSize, color: type === -1 ? varianceNegativeColor : variancePositiveColor}}
                fill={type !== -1 ? varianceNegativeColor : variancePositiveColor}>
                {variance}
              </text>
              <text
                x={cx + 5}
                y={cy + 30}
                textAnchor="middle"
                dominantBaseline="central"
                style={{fontSize: descriptionFontSize, color: '#3c4859', fontFamily: ''}}>
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
      {type && <use x={cx - 30} y={cy - 10} xlinkHref="#Triangle" />}
    </PieChart>
  );
};
export default NimbleGaugeChart;
