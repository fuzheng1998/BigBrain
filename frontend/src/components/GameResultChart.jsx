import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ArgumentAxis, BarSeries, Chart, ValueAxis, } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';
import PropTypes from 'prop-types'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const data = [
  { question: 'Q1', value: 77 },
  { question: 'Q2', value: 33 },
  { question: 'Q3', value: 55 },
  { question: 'Q4', value: 22 },
  { question: 'Q5', value: 85 },
  { question: 'Q6', value: 88 },
  { question: 'Q7', value: 10 },
]

const data2 = [
  { question: 'Q1', value: 20 },
  { question: 'Q2', value: 10 },
  { question: 'Q3', value: 3 },
  { question: 'Q4', value: 8 },
  { question: 'Q5', value: 32 },
  { question: 'Q6', value: 16 },
  { question: 'Q7', value: 20 },
];

const data3 = [
  { question: 'Q1', value: 32 },
  { question: 'Q2', value: 66 },
  { question: 'Q3', value: 12 },
  { question: 'Q4', value: 82 },
  { question: 'Q5', value: 43 },
  { question: 'Q6', value: 54 },
  { question: 'Q7', value: 22 },
];

// a single chart
function SingleGameResult ({ data, type }) {
  return (
    <Chart data={data}>
      <ArgumentAxis />
      <ValueAxis />

      <BarSeries
        valueField='value'
        argumentField='question'
      />
      <EventTracker />
      <HoverState />
    </Chart>
  )
}

SingleGameResult.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string
}

export default function GameResultChart () {
  // state types: 'correct' 'time' 'most'
  const [tabValue, setTabValue] = React.useState('correct');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label='result tabs' variant='scrollable'>
            <Tab label='Percentage of correct' value='correct' />
            <Tab label='Average Time' value='time' />
            <Tab label='Most choosed answer' value='most' />
          </TabList>
        </Box>
        <TabPanel value='correct'>
          <SingleGameResult data={data} type='correct' />
        </TabPanel>
        <TabPanel value='time'>
          <SingleGameResult data={data2} type='time' />
        </TabPanel>
        <TabPanel value='most'>
          <SingleGameResult data={data3} type='most' />
        </TabPanel>

      </TabContext>
    </Paper>
  );
}
