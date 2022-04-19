import * as React from 'react';
import Paper from '@mui/material/Paper';
import {ArgumentAxis, BarSeries, Chart, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {EventTracker, HoverState, Title} from '@devexpress/dx-react-chart';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const data = [
    { year: '1950', population: 2.525 },
    { year: '1960', population: 3.018 },
    { year: '1970', population: 3.682 },
    { year: '1980', population: 4.440 },
    { year: '1990', population: 5.310 },
    { year: '2000', population: 6.127 },
    { year: '2010', population: 6.930 },
];

const data2 = [
    { year: '1950', population: 100 },
    { year: '1960', population: 90 },
    { year: '1970', population: 30 },
    { year: '1980', population: 80 },
    { year: '1990', population: 66 },
    { year: '2000', population: 66 },
    { year: '2010', population: 66 },
];


const data3 = [
    { year: '1950', population: 88 },
    { year: '1960', population: 88 },
    { year: '1970', population: 88 },
    { year: '1980', population: 88 },
    { year: '1990', population: 88 },
    { year: '2000', population: 88 },
    { year: '2010', population: 88 },
];

// a single chart
function SingleGameResult({ data , type }){
    return(
        <Chart data={data}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
                valueField="population"
                argumentField="year"
            />
            <EventTracker />
            <HoverState />
        </Chart>
    )
}

export default function GameResultChart(){
    // state types: "correct" "time" "most"
    const [tabValue, setTabValue] = React.useState("correct");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Paper>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="result tabs" variant="scrollable">
                    <Tab label="Percentage of correct" value="correct"/>
                    <Tab label="Average Time" value="time"/>
                    <Tab label="Most choosed answer" value="most"/>
                </TabList>
                </Box>
                <TabPanel value="correct">
                    <SingleGameResult data={data} type='correct'/>
                </TabPanel>
                <TabPanel value="time">
                    <SingleGameResult data={data2} type='time'/>
                </TabPanel>
                <TabPanel value="most">
                    <SingleGameResult data={data3} type='most'/>
                </TabPanel>
                
            </TabContext>
        </Paper>
    );
}
