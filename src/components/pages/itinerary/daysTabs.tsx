import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Day, Place } from '../../../reducers/interfaces';
import { ListOfPlaces } from './listOfPlaces';
import { RootState } from '../../../reducers';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: "-webkit-fill-available" }}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: "90%",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export function DaysTabs() {
    const classes = useStyles();
    
    const itinerary = useSelector((state: RootState) => state.itinerary);

    const days = itinerary.days;

    const isDays: boolean = days.length > 0;

    const initDay: number = isDays ? 1 : 0;

    const [dayValue, setDayValue] = React.useState(initDay);

    const handleChange = (event: React.ChangeEvent<{}>, newDayValue: number) => {
        setDayValue(newDayValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={dayValue}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {days.map((item: Day, index: number) => {
                    return (<Tab key={index} label={item.name} {...a11yProps(index)} />);
                })}
            </Tabs>
            <TabPanel value={dayValue} index={dayValue}>
                <ListOfPlaces day={isDays ? days[dayValue].name : ""} />
            </TabPanel>
        </div>
    );
}
