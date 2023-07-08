import React, {useEffect} from 'react';
import {Typography} from '@mui/material';
import c3 from 'c3'
import 'c3/c3.css';

interface NimbleGaugeChartProps {
  label?: string,
  labelSize?: number,
  labelWeight?: string,
}

export function NimbleGaugeChart({
                                   label = '',
                                   labelSize = 14,
                                   labelWeight = '600',
                                   ...props
                                 }: NimbleGaugeChartProps) {
  const [data, setData] = React.useState(['data', 91.4]);
  useEffect(() => {
    const interval = setInterval(() => {
      setData(['data', 20.2]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    c3.generate({
      bindto: "#chart",
      data: {
        // @ts-ignore
        columns: [data],
        type: 'gauge',
        onclick: function (d, i) {
          console.log("onclick", d, i);
        },
        onmouseover: function (d, i) {
          console.log("onmouseover", d, i);
        },
        onmouseout: function (d, i) {
          console.log("onmouseout", d, i);
        }
      },
      gauge: {
//        label: {
//            format: function(value, ratio) {
//                return value;
//            },
//            show: false // to turn off the min/max labels.
//        },
//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
//    max: 100, // 100 is default
//    units: ' %',
//    width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
//            unit: 'value', // percentage is default
//            max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    })
  }, [])

  return (
    <span>
      <Typography variant={"h6"}>
        Gauge Chart
      </Typography>
      <div id="chart" />
    </span>
  );
}
