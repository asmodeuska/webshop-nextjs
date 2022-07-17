import React, {useState} from "react";
import { Autocomplete, TextField, Stack } from "@mui/material";


export default function AutocompleteInputField({ ...props }) {
    const [autoCompleteValue, setAutoCompleteValue] = useState([]);
    return (
        <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={props.options}
                disabled={props.disabled}
                value={autoCompleteValue}
                onChange={(e, newval, reason) => {
                    setAutoCompleteValue(newval);
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={props.label}
                        placeholder={props.placeholder}
                        onKeyDown={e => {
                            if (e.code === "Enter" && e.target.value) {
                                setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                            }
                        }}
                    />
                )}
            />
        </Stack>
    );
}