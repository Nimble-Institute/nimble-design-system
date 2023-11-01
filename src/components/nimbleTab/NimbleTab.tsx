import React, {useState, useMemo} from 'react';
import {Tabs, Tab, Box} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';

import theme from './CustomTheme';

interface TabData {
  value: number;
  label: string;
  activeImage?: any;
  inactiveImage?: any;
  content?: any;
}

interface NimbleTabProps {
  width?: string;
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  activeColor?: string;
  tabs: TabData[];
  activeTabValue?: number
  onChangeTab?: (tabValue: number) => void;
  showInlineContent?: boolean;
  type?: 'default' | 'card';
  activeCardColor?: string;
  inActiveCardColor?: string;
  variant?: 'fullWidth' | 'scrollable' | 'standard';
}

export const Nimbletab: React.FC<NimbleTabProps> = ({
  width = '100%',
  tabs,
  activeTabValue = 1,
  fontFamily,
  fontSize = '16px',
  color = '#0C1B2A',
  activeColor = '#9FC540',
  onChangeTab,
  showInlineContent,
  type = 'default',
  activeCardColor,
  inActiveCardColor,
  variant = 'fullWidth',
}) => {
  const [value, setValue] = useState(activeTabValue);

  const customTheme = useMemo(() => {
    return theme(activeColor, fontSize, color, fontFamily, type, activeCardColor, inActiveCardColor);
  }, [activeColor, fontSize, color, fontFamily, type, activeCardColor, inActiveCardColor]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChangeTab && onChangeTab(newValue);
  };

  return (
    <Box sx={{width}}>
      <ThemeProvider theme={customTheme}>
        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" variant={variant}>
          {tabs?.map((item, index) => (
            <Tab
              value={item.value}
              label={item.label}
              key={`tab-${index}`}
              icon={
                item.activeImage &&
                item.inactiveImage && <Box>{item.value === value ? item.activeImage : item.inactiveImage}</Box>
              }
              iconPosition="start"
            />
          ))}
        </Tabs>
      </ThemeProvider>
      {showInlineContent && <Box sx={{height: '100%'}}>{tabs.find(item => item.value === value)?.content}</Box>}
    </Box>
  );
};
