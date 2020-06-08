import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import AccountBalance from './AccountBalance';

class Credits extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalCredits: 0,
            credits: [],
        }
    }

    componentDidMount() {
        // load debits API
        axios.get("https://moj-api.herokuapp.com/credits").then((credits) => {
            const data = credits.data;

            //console.log(data);

            let totalCred = 0;

            for (let i = 0; i < data.length; i++) {
                totalCred += data[i].amount;
                //console.log("totalDeb: ", totalDeb);
            }

            // object to hold all the new assignments from API
            const creditSearchObj = {
                totalCredits: totalCred,
                credits: data,
            };

            // changing state of variables according to API data
            this.setState(creditSearchObj);

        }).catch((err) => console.log(err));
    }

    render() {

        var creditList = this.state.credits.map((credit) =>
            <ul>
                <li key={this.state.credits.id}>
                    Description: {credit.description}
                </li>

                <li key={this.state.credits.id}>
                    Amount: {credit.amount}
                </li>

                <li key={this.state.credits.id}>
                    Date: {credit.date}
                </li>
            </ul>
        );

        return (
            <div>
                <Link to="/">Home</Link>
                <h1>Credits</h1>
                <AccountBalance accountBalance={this.props.accountBalance} />
                <h2>Total Credits: {this.state.totalCredits}</h2>
                <h2>Credits List</h2>
                {creditList}

                <form onSubmit={this.addItem}>
                    <input
                        className="creditDescription"
                        type="text"
                        name="newCreditDescription"
                        placeholder="Enter item description"
                    />
                    <input
                        className="creditAmount"
                        type="number"
                        name="newCreditAmount"
                        placeholder="Enter item cost"
                    />
                    <button onChange = {this.handleAmount} onClick = {this.addItem} className="creditEntry">Submit Debit</button>
                </form>

            </div>
        );
    }
}

export default Credits;