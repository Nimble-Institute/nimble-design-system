/* eslint-disable no-shadow */
import React from 'react';
import {PieChart, Pie, Cell, Label} from 'recharts';

interface NimbleGaugeChartProps {
  gaugeColor?: string;
  chartHeight?: number;
  fontFamily?: string;
  fontColor?: string;
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
  thresholdColor?: string;
}

export const NimbleGaugeChart: React.FC<NimbleGaugeChartProps> = ({
  gaugeColor = '#1194a8',
  chartHeight = 300,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  fontColor = '#263238',
  title,
  titleFontSize,
  chartValue,
  amountLabel,
  amountFontSize = '28px',
  variance,
  varianceFontSize = '16px',
  variancePositiveColor = '#66bb6a',
  varianceNegativeColor = '#f44336',
  description,
  descriptionFontSize = '12px',
  maxValue,
  threshold,
  thresholdColor = '#f44336',
}) => {
  const gaugeValue = [
    {value: chartValue, color: gaugeColor},
    {value: maxValue - chartValue, color: 'transparent'},
  ];

  const thresholdValue = threshold
    ? [
        {value: threshold - 1, color: 'transparent'},
        {value: 1, color: thresholdColor},
        {value: maxValue - threshold - 1, color: 'transparent'},
      ]
    : [{value: maxValue, color: 'transparent'}];

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
            strokeWidth={index === 1 ? 2 : 1}
            {...(index === 1 && {stroke: entry.color})}
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
                style={{fontSize: titleFontSize, fill: fontColor, fontFamily: fontFamily}}>
                {title}
              </text>
              <text
                x={cx + 5}
                y={cy - height / 10}
                style={{fontSize: amountFontSize, fontFamily: fontFamily, fill: fontColor}}
                textAnchor="middle"
                dominantBaseline="central">
                {amountLabel}
              </text>
              <text
                x={cx - 8}
                y={height / 2}
                style={{
                  fontSize: varianceFontSize,
                  color: type === -1 ? varianceNegativeColor : variancePositiveColor,
                  fontFamily: fontFamily,
                }}
                fill={type !== -1 ? varianceNegativeColor : variancePositiveColor}>
                {variance}
              </text>
              <text
                x={cx + 5}
                y={cy + 30}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: descriptionFontSize,
                  fill: fontColor,
                  fontFamily: fontFamily,
                }}>
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
