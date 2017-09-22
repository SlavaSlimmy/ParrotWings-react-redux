import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withStyles } from 'material-ui/styles'

function renderInput(inputProps) {
  const { classes, disabled, home, value, ref, ...other } = inputProps;

  return (
    <TextField
      margin="normal"
      label="Search user"
      className={classes.textField}
      value={value}
      disabled={disabled}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square style={{zIndex: 2}}>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
  	fontSize: '16px',
    width: '100%',
  },
})

class Autocomplete extends Component { 

  render() {
    const { classes, autocomplete, onSuggestionsFetchRequested, onSuggestionsClearRequested, onChangeAutocompleteValueRequested, disabled } = this.props; 

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={autocomplete.suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          value: autocomplete.value,
          onChange: onChangeAutocompleteValueRequested,
          disabled: disabled
        }}
      />
    );
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  autocomplete: PropTypes.object.isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  onChangeAutocompleteValueRequested: PropTypes.func.isRequired,  
  disabled: PropTypes.bool.isRequired,  
}

export default withStyles(styles)(Autocomplete)