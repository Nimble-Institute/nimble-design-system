/* eslint-disable no-shadow */
import React from 'react';
import {PieChart, Pie, Cell, Label} from 'recharts';

import './NimbleGaugeChart.css';

interface NimbleGaugeChartProps {
  gaugeColor?: string;
  chartWidth?: number;
  fontFamily?: string;
  amountColor?: string;
  title?: string;
  titleFontSize?: string;
  amount: number;
  amountLabel?: string;
  amountFontSize?: string;
  variance?: string;
  varianceFontSize?: string;
  varianceColor?: string;
  description?: string;
  descriptionFontSize?: string;
  maxValue: number;
  threshold?: number;
  thresholdColor?: string;
  segments?: {value: number; label: string}[];
}

export const NimbleGaugeChart: React.FC<NimbleGaugeChartProps> = ({
  gaugeColor = '#1194a8',
  chartWidth = 300,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  amountColor = '#263238',
  title,
  titleFontSize,
  amount,
  amountLabel,
  amountFontSize = '28px',
  variance,
  varianceFontSize = '16px',
  varianceColor = '#66bb6a',
  description,
  descriptionFontSize = '12px',
  maxValue,
  threshold,
  thresholdColor = '#f44336',
  segments,
}) => {
  const RADIAN = Math.PI / 180;

  let gaugeValue: {value: number; color: string}[] = [
    {value: amount, color: gaugeColor},
    {value: maxValue - amount, color: 'transparent'},
  ];

  if (threshold && threshold > amount) {
    gaugeValue = [
      {value: amount, color: gaugeColor},
      {value: maxValue - amount, color: 'transparent'},
    ];
  } else if (threshold) {
    gaugeValue = [
      {value: threshold, color: gaugeColor},
      {value: amount - threshold, color: 'red'},
      {value: maxValue - amount, color: 'transparent'},
    ];
  }

  const outerPie = [{value: maxValue, color: 'transparent'}];

  const width = chartWidth;
  const height = width;

  const cx = width / 2.4;
  const cy = height / 2;
  const oR = height / 3;
  const iR = oR - 15;

  const markThreshold = (
    value: number,
    data: {value: number; color: string}[],
    cx: number,
    cy: number,
    iR: number,
    oR: number,
    color: string,
  ) => {
    let total = 0;
    data.forEach(v => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xs = x0 + (oR + width * 0.014) * cos;
    const ys = y0 + (oR + width * 0.014) * sin;
    const xp = x0 + (iR - width * 0.015) * cos;
    const yp = y0 + (iR - width * 0.015) * sin;

    return [
      <path key={'threshold'} className="fade-in" d={`M${xs},${ys}L${xp},${yp}`} stroke={color} strokeWidth={2} />,
    ];
  };

  const showSegments = (data: {value: number; color: string}[], cx: number, cy: number, oR: number) => {
    let total = 0;
    data.forEach(v => {
      total += v.value;
    });
    const getList = (value: number) => {
      const ang = 180.0 * (1 - value / total);
      const sin = Math.sin(-RADIAN * ang);
      const cos = Math.cos(-RADIAN * ang);

      const x0 = cx + 5;
      const y0 = cy + 5;
      const xl = x0 + (oR + width * 0.07) * cos;
      const yl = y0 + (oR + width * 0.07) * sin;
      const xs = x0 + (oR + 8) * cos;
      const ys = y0 + (oR + 8) * sin;
      const xp = x0 + (oR + 5) * cos;
      const yp = y0 + (oR + 5) * sin;

      return [xs, ys, xp, yp, xl, yl];
    };
    return segments?.map((segment, index) => {
      return [
        <path
          key={`segment-${index}`}
          className="fade-in"
          d={`M${getList(segment.value)[0]},${getList(segment.value)[1]}L${getList(segment.value)[2]},${
            getList(segment.value)[3]
          }`}
          stroke={'#cbcbcb'}
          strokeWidth={2}
        />,
        <text
          key={`segment-label-${index}`}
          x={getList(segment.value)[4]}
          y={getList(segment.value)[5]}
          textAnchor="middle"
          dominantBaseline="central"
          className="fade-in"
          style={{fontSize: '10px', fill: '#9B9B9B', fontFamily: fontFamily}}>
          {segment.label}
        </text>,
      ];
    });
  };

  return (
    <div>
      <PieChart width={width - width / 10} height={height / 1.6}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={outerPie}
          cx={cx}
          cy={cy}
          innerRadius={iR - 5}
          outerRadius={oR + 5}
          fill="transparent"
          stroke="#cbcbcb">
          <Cell fill={'transparent'} strokeWidth={1} />
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
                  y={cy - height / 2.2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{fontSize: titleFontSize, fontFamily: fontFamily}}>
                  {title}
                </text>
                <text
                  x={cx + 5}
                  y={cy - height / 8}
                  style={{fontSize: amountFontSize, fontFamily: fontFamily, fill: amountColor}}
                  textAnchor="middle"
                  dominantBaseline="central">
                  {amountLabel}
                </text>
                <text
                  x={cx + 5}
                  y={height / 2}
                  style={{
                    fontSize: varianceFontSize,
                    color: varianceColor,
                    fontFamily: fontFamily,
                  }}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={varianceColor}>
                  {variance}
                </text>
                <text
                  x={cx + 5}
                  y={cy + height / 12}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    fontSize: descriptionFontSize,
                    fontFamily: fontFamily,
                  }}>
                  {description}
                </text>
              </>
            }></Label>
        </Pie>
        {threshold && markThreshold(threshold, outerPie, cx, cy, iR, oR, thresholdColor)}
        {segments && showSegments(outerPie, cx, cy, oR)}
      </PieChart>
    </div>
  );
};
