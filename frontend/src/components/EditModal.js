import React, { Component } from 'react';
import autobind from 'react-autobind';
import 'semantic-ui-css/semantic.min.css';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';
class EditModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id : 0,
            name : '',
            qty : 0,
            amount : 0,
            showModal : false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name : nextProps.name,
            qty : nextProps.qty,
            amount : nextProps.amount,
            showModal : nextProps.showModal
        });
        return null;
    }

    nameHandler(e) {
        console.log(e.target.value);
        this.setState({
            name : e.target.value
        });
    }
    
    qtyHandler(e) {
        this.setState({
            qty: e.target.value
        });
    }

    amountHandler(e) {
        this.setState({
            amount : e.target.value
        });
    }

    handleSave(e) {
        const edited_item = this.state;
        this.props.saveModalDetails(edited_item);

        console.log(e.target.value);
        console.log(this.state.name);
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
        
        this.closeModal();
    }
    closeModal = () => {
        this.setState({
            showModal: false
        });
    }

    show = dimmer => () => this.setState({ dimmer,showModal: true })
    close = () => this.setState({showModal: false })
    
    render() {
        const { showModal, dimmer } = this.state
        console.log(this.state.showModal)
        return(
            <div> 
                <Modal dimmer={dimmer} open={this.state.showModal} onClose={this.close}>
                <Modal.Header> Edit Item </Modal.Header>
                
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label> Item Name </label>
                                <input defaultValue={this.state.name} onChange = {(e) => {this.nameHandler(e)}} />
                            </Form.Field>
                            <Form.Field>
                                <label> Quantity </label>
                                <input type='number' defaultValue={this.state.qty} onChange = { (e) => {this.qtyHandler(e)}}/>
                            </Form.Field>
                            <Form.Field>
                                <label> Amount </label>
                                <input type='number' step='0.01' defaultValue={this.state.amount} onChange = {(e) => {this.amountHandler(e)}}/>
                            </Form.Field>
                        <Button type='submit' value={this.state.id} data-dismiss="modal" onClick={(e) => {this.handleSave(e)}}> Save </Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default EditModal;