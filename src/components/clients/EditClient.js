import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {compose } from "redux"
import {connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/spinner"


class EditClient extends Component {
    constructor(props) {
    super(props);
    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
    }

    onSubmit = e => {
        e.preventDefault();
        const { client, firestore } = this.props;

        // Updated client
        const updClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === "" ? 0 : this.balanceInput.current.value

        };

        // Update Client in firestore
        firestore
        .update({ collection: "clients", doc: client.id }, updClient)
        .then(History.push('/')); // get history back to small letter
    };
    render() {
        const { client } = this.props;
        const { disableBalanceOnEdit } =this.props.settings

        if(client) {
            return (   <div>
                <div className="row">
                    <div className="col-md-6">
                    <Link to="/" className="btn btn-link">
                        <i className="fas fa-arrow-circle-left">Back to Dashboard</i>
                    </Link>
                    </div>
                </div>
    
                <div className="card">
                    <div className="card-header">Edit Client</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="firstName"></label>
                                    First Name
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    minLength="2" 
                                    required    
                                    ref={this.firstNameInput}
                                    defaultvalue={client.firstName}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName"></label>
                                    Last Name
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    minLength="2" 
                                    required    
                                    ref={this.lastNameInput}
                              
                                    defaultvalue={client.lastName}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"></label>
                                    email
                                    <input 
                                    type="email"
                                    className="form-control"
                                    name="email" 
                                   ref={this.emailInput}
                                    defaultvalue={client.email}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"></label>
                                    phone
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    minLength="10" 
                                    required    
                                    ref={this.phoneInput}
                                    defaultvalue={client.phone}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance"></label>
                                    Balance
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="balance"
                                    ref={this.balanceInput}
                                  
                                    defaultvalue={client.balance}
                                    disabled={disableBalanceOnEdit}
                                    />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block "/>
                        </form>
                    </div>
                </div>
             </div>)
        } else {
           return <Spinner />
        }
        
    }
}

EditClient.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: "clients", storeAs: "client", doc: props.match.params.id }
    ]),
    connect(({ firestore: {ordered }, settings }, props) => ({
        clients: ordered.client && ordered.client[0],
        settings: settings

    }))
)(EditClient);