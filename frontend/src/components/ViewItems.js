import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import 'semantic-ui-css/semantic.min.css';
import { Table, Icon, Button, Modal, Form } from 'semantic-ui-react';

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
			deleted : false,
			added : false,
			showModal : false
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

	handleInputNameChange(e) {
		this.setState({
			name : e.target.value,
			added: false
		});
	}

	handleInputQtyChange(e) {
		this.setState({
			qty : e.target.value,
			added: false
		});
		console.log(this.state.qty)
	}

	handleInputAmountChange(e) {
		this.setState({
			amount : e.target.value,
			added: false
		});
	}

	handleAddedChange(){
		this.setState({
			added: true
		});
		console.log("Added: " + this);
	}
	closeModal = () => {
		this.setState({ showModal: false })
	}

	addItem() {
		if(this.state.name != '') {
			axios.post('http://localhost:3001/add-item', {
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					name: this.state.name,
					qty: this.state.qty,
					amount: this.state.amount
				}
			})
			.then(function (response) {
			})
			.catch(err => {
				console.log(err);
			});
			this.handleAddedChange();
			this.closeModal();
		}
	}

	handleDeletedChange() {
		this.setState({
			deleted : true
		});
	}

	deleteItem(e) {
		console.log(e.target.value);
		axios.post('http://localhost:3001/delete-item', {
			headers: {
				'Content-Type' : 'application/json'
			},
			data: {
				id : e.target.value
			}
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(err => {
			console.error(err);
		});
		this.handleDeletedChange();
	}

	editItem(e) {
		console.log(e.target.value);
		console.log(this.state.name)		
		axios.post('http://localhost:3001/edit-item/', {
			headers: {
				'Content-Type' : 'application/json'
			},
			data: {
				id : e.target.value,
				name : this.state.name,
				qty : this.state.qty,
				amount : this.state.amount
			}
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(err => {
			console.error(err);
		});
	}

	render() {
		let submit = null;
		
		return(
			<div>
				<h1 align="center"> Inventory Details </h1>

				<div>
				<Table singleLine>
					<Table.Header>	
						<Table.Row>
							<Table.HeaderCell> ID </Table.HeaderCell>
							<Table.HeaderCell> Name </Table.HeaderCell>
							<Table.HeaderCell> Quantity </Table.HeaderCell>
							<Table.HeaderCell> Amount </Table.HeaderCell>
							<Table.HeaderCell> Delete </Table.HeaderCell>
							<Table.HeaderCell> Edit </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
					
					{this.state.items.map((item) => {
						return(
							<Table.Row> 
									<Table.Cell>{item.id}</Table.Cell>
									<Table.Cell>{item.name}</Table.Cell>
									<Table.Cell>{item.qty}</Table.Cell>
									<Table.Cell>{item.amount}</Table.Cell>
									<Table.Cell> <Button value={item.id} onClick={this.deleteItem}> Delete </Button> </Table.Cell>
									<Table.Cell> 
										<Modal trigger = {<Button > Edit </Button> }>
											<Modal.Header> Edit Item </Modal.Header>
											<Modal.Content>
												<Form>
													<Form.Field>
														<label> Item Name </label>
														<input onChange = {this.handleInputNameChange}/>
													</Form.Field>
													<Form.Field>
														<label> Quantity </label>
														<input type='number'  onChange = {this.handleInputQtyChange}/>
													</Form.Field>
													<Form.Field>
														<label> Amount </label>
														<input type='number' step='0.01' onChange = {this.handleInputAmountChange}/>
													</Form.Field>
												<Button type='submit' value={item.id} data-dismiss="modal" onClick={this.editItem}> Save </Button>
												</Form>
											</Modal.Content>
										</Modal>
									</Table.Cell>
							</Table.Row>	
						)
					})}
					</Table.Body>	
					
				</Table>
				</div>
				<br/>
				<div>
				<Modal trigger={
					<Button animated='vertical'>
					<Button.Content visible>Add Item</Button.Content>
					<Button.Content hidden> 
						<Icon link name='add' />
					</Button.Content>
					</Button>
					}>
					<Modal.Header> Add Item </Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Field>
								<label> Item Name </label>
								<input placeholder = 'Item Name' onChange = {this.handleInputNameChange}/>
							</Form.Field>
							<Form.Field>
								<label> Quantity </label>
								<input type='number' placeholder = 'Quantity' onChange = {this.handleInputQtyChange}/>
							</Form.Field>
							<Form.Field>
								<label> Amount </label>
								<input type='number' step='0.01' placeholder = 'Amount' onChange = {this.handleInputAmountChange}/>
							</Form.Field>
							<Button type='submit' onClick={this.addItem} data-dismiss="modal"> Submit </Button>
						</Form>
						<label id="success-message">
						{
							this.state.added ? 'Item Successfully Added!' : ''
						}
               			 </label>
					</Modal.Content>
				</Modal>
				</div>
			</div>
		)
	}
}

export default ViewItems;