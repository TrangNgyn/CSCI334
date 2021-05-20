import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { Input, InputGroup } from "@chakra-ui/react";
 
export default function LocationSearchInput(props) {
 
    const handleChange = (address) => {
        props.setProperty("address", address);
    };

    // DBMS schema has different object type to component/google api default return
    // function parseLatLong() {
    //     let longlat = {};
    // }
 
    const handleSelect = (address) => {
        props.setProperty("address", address);
        geocodeByAddress(address)
        .then(results => { props.setProperty("place_id", results[0].place_id); 
                            getLatLng(results[0])
                            .then(latLng => props.setProperty("gps", latLng))
                            .catch(error => console.error('Error', error)); })
        
    };

    return (
        <PlacesAutocomplete
            value={props.address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <InputGroup size="md">
                        <Input
                            {...getInputProps({
                                isRequired: true,
                                name: "address",
                                placeholder: 'Search your address...' ,
                                variant: 'filled',
                                bg: '#efefef' ,
                                className: 'location-search-input',
                            })} />
                    </InputGroup>
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, i) => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div key={i}
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}
