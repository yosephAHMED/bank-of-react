import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import AccountBalance from './AccountBalance';

class Debits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalDebits: 0,

            // debits will hold all the API data
            debits: [],

            newDebitDescription: "",
            newDebitAmount: 0,
        }
        
        // add items to debit list
        this.addItem = this.addItem.bind(this);
    }

    addItem = (event) => {
        // event.preventDefault();
        // console.log("entered addItem");

        // this.props.newDeb(this.state.newDebitAmount);

        // //console.log("newdebits: ", newDebits);

        // this.state.debits.forEach( (data) => {
        //     let newItem = Object.assign({}, data);
        //     newItem.date = new Date();
        //     newItem.description = this.state.newDebitDescription;
        //     this.props.newItem(newItem.amount);
        //     this.setState({
        //         debits: [newItem, ...this.state.debits],
        //     })
        //     newItem.amount = this.state.newDebitAmount;
        // });
    }

    handleAmount = (event) => {
        this.setState({ newDebitAmount: event.target.value })
    }

    componentDidMount() {
        // load debits API
        axios.get("https://moj-api.herokuapp.com/debits").then((debits) => {
            const data = debits.data;

            //console.log(data);

            let totalDeb = 0;

            for (let i = 0; i < data.length; i++) {
                totalDeb += data[i].amount;
                //console.log("totalDeb: ", totalDeb);
            }

            // object to hold all the new assignments from API
            const creditSearchObj = {
                totalDebits: totalDeb,
                debits: data,
            };

            // changing state of variables according to API data
            this.setState(creditSearchObj);

        }).catch((err) => console.log(err));
    }

    render() {

        var debitList = this.state.debits.map((debit) =>
            <ul>
                <li key={this.state.debits.id}>
                    Description: {debit.description}
                </li>

                <li key={this.state.debits.id}>
                    Amount: {debit.amount}
                </li>

                <li key={this.state.debits.id}>
                    Date: {debit.date}
                </li>
            </ul>
        );

        return (
            <div>
                <Link to="/">Home</Link>
                <h1>Debits</h1>
                <AccountBalance accountBalance={this.props.accountBalance} />
                <h2>Total Debits: {this.state.totalDebits}</h2>
                <h2>Debit List</h2>
                {debitList}

                <form onSubmit={this.addItem}>
                    <input
                        className="debitDescription"
                        type="text"
                        name="newDebitDescription"
                        placeholder="Enter item description"
                    />
                    <input
                        className="debitAmount"
                        type="number"
                        name="newDebitAmount"
                        placeholder="Enter item cost"
                    />
                    <button onChange = {this.handleAmount} onClick = {this.addItem} className="debitEntry">Submit Debit</button>
                </form>

            </div>
        );
    }
}

export default Debits;