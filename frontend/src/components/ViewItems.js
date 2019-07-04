import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import 'semantic-ui-css/semantic.min.css';
import { Table } from 'semantic-ui-react';

class ViewItems extends Component {
	constructor(props) {
		super(props);
		autobind(this);

		this.state = {
			items : [],
			id : 0,
			name : '',
			qty: 0,
			amount: 0,
			deleted : false
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/view-all-items')
		.then((response) => {return response.json () }) //Returns in JSON format
		.then((result) => {
			this.setState({items: result}); //Stores the result to items list
		})
		.catch((e) => { console.log(e); })
	}

	componentDidUpdate() {
		fetch('http://localhost:3001/view-all-items')
		.then((response) => {return response.json () })
		.then((result) => {
			this.setState({items: result});
		})
		.catch((e) => { console.log(e); })
	}

	render() {
		return(
			<div>
				<h1> Inventory Details </h1>

				<div>
				<Table singleLine>
					<Table.Header>	
						<Table.Row>
							<Table.HeaderCell> Name </Table.HeaderCell>
							<Table.HeaderCell> Quantity </Table.HeaderCell>
							<Table.HeaderCell> Amount </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
					
					{this.state.items.map((item) => {
						return(
							<Table.Row> 
									<Table.Cell>{item.name}</Table.Cell>
									<Table.Cell>{item.qty}</Table.Cell>
									<Table.Cell>{item.amount}</Table.Cell>
							</Table.Row>	
						)

					})}
					</Table.Body>	
					
				</Table>

				</div>
			</div>
		)
	}
}

export default ViewItems;