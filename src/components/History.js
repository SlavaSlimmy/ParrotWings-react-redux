import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Typography from 'material-ui/Typography'
import Table, {
  TableBody,
  TableCell,
  TableRow,
} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import ContentCopy from 'material-ui-icons/ContentCopy'
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import TransactionsTableHead from './TransactionsTableHead'

const styles = theme => ({
  progress: {
  	textAlign: 'center',
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

class History extends Component {
	createCopyTransHandler = data => event => {
		this.props.onRequestCopyTrans(event, data);
	}	

	render() {
		const { classes, transactions, onRequestSort } = this.props
		return (
			<div className="history">
				{!transactions.isLoading &&
					<div>
				      <Typography type="title" gutterBottom>
				        History
				      </Typography>				
				      <div className="table-responsive">
					      <Table>
							<TransactionsTableHead
								order={transactions.order}
								orderBy={transactions.orderBy}
								onRequestSort={onRequestSort}
							/>			      	
					      	<TableBody>
					          {transactions.allIds.map(id =>
						      		<TableRow key={id}>
						      			<TableCell>{ transactions.byId[id].date }</TableCell>
						      			<TableCell>{ transactions.byId[id].username }</TableCell>
						      			<TableCell numeric className={classnames({
						      				debit: transactions.byId[id].amount > 0, 
						      				credit: transactions.byId[id].amount < 0 })
						      			}>{ transactions.byId[id].amount }</TableCell>
						      			<TableCell numeric>{ transactions.byId[id].balance }</TableCell>
						      			<TableCell>
								          <IconButton color="primary" aria-label="Copy transaction" onClick={ this.createCopyTransHandler(transactions.byId[id]) }>
								            <ContentCopy />
								          </IconButton>		      			
						      			</TableCell>
						      		</TableRow>			            	
								)}
					      	</TableBody>
					      </Table>
				      </div>
				    </div>
				}
				{transactions.isLoading &&
					<div className={classes.progress}>
					    <Typography type="title" gutterBottom>LOADING...</Typography>	
					    <CircularProgress color="accent" />
				    </div>
				}

		    </div>
		)
	}
}

History.propTypes = {
  transactions: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onRequestCopyTrans: PropTypes.func.isRequired,
}

History.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(History)