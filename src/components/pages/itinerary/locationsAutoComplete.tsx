import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export function LocationsAutoComplete(props: any) {
  const [address, setAddress] = React.useState("");

  const { setPlaceName, setPosition } = props;

  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setPosition(latLng);
    setPlaceName(value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({ placeholder: "Type address" })}
              id="outlined-basic"
              label="Type addres"
              variant="outlined"
              placeholder="Find a place"
            />

            <List component="nav">
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <ListItem
                    button
                    key={index}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
