import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table'

const styles = theme => ({
  cell: {
    color: theme.palette.primary[500],
  },	

})

const columnData = [
  { id: 'date', numeric: false, label: 'Date/Time' },
  { id: 'username', numeric: false, label: 'Corr. name' },
  { id: 'amount', numeric: true, label: 'Amount' },
]

class TransactionsTableHead extends Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	}

	render() {
		const { classes, order, orderBy } = this.props;
	    return (
	      <TableHead>
	        <TableRow>
	          {columnData.map(column => {
	            return (
	              <TableCell
	                key={column.id}
	                numeric={column.numeric}
 					className={classes.cell}
	              >
	                <TableSortLabel
	                  active={orderBy === column.id}
	                  direction={order}
	                  onClick={this.createSortHandler(column.id)}
	                >
	                  {column.label}
	                </TableSortLabel>
	              </TableCell>
	            );
	          }, this)}
	          <TableCell className={classes.cell} numeric>Balance</TableCell>
	          <TableCell></TableCell>
	        </TableRow>
	      </TableHead>
	    );		
	}
}

TransactionsTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
}

export default withStyles(styles)(TransactionsTableHead)