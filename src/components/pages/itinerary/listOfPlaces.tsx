import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from "@material-ui/icons/Place";
import HotelIcon from "@material-ui/icons/Hotel";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LanguageIcon from "@material-ui/icons/Language";
import Tooltip from '@material-ui/core/Tooltip';

import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Place } from '../../../reducers/interfaces';
import { RootState } from '../../../reducers';
import { updatePlaces } from '../../../actions/placesActions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

export interface ListOfPlacesProps {
    day: string;
}

export function ListOfPlaces(props: ListOfPlacesProps) {
    const classes = useStyles();
    const { day } = props;
    
    const itinerary = useSelector((state: RootState) => state.itinerary);

    const dispatch = useDispatch();

    const places = itinerary.places;

    const filteredPlaces = places.filter((item: Place) => item.day === day);

    const handleDeletePlace = (id: number) => {
        const filteredPlaces = places.filter((item: Place) => item.id !== id);

        dispatch(updatePlaces(filteredPlaces));
    }

    return (
        <div className={classes.root}>
            <List component="nav">
                {filteredPlaces.map((item: Place, index: number) => {
                    let icon = <PlaceIcon />;
                    if (item.sleeping) {
                        icon = <HotelIcon />;
                    }

                    return (
                        <Tooltip title={item.description}>
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="web" onClick={() => window.open(item.web, "_blank")}>
                                        <LanguageIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="edit" onClick={() => console.log("clicked on edit")}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePlace(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Tooltip>
                    );
                })}
            </List>
        </div>
    );
}
