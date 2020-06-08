import React, { Component } from 'react';
import axios from "axios";

//Making the Account Balance dynamic:
// GIVEN I am on any page displaying the Account Balance
// WHEN I view the Account Balance display area
// THEN I should see an Account Balance that accurately represents my Debits subtracted from my Credits
// AND I should be able to see a negative account balance if I have more Debits than Credits

class AccountBalance extends Component {
    constructor() {
        super();

        this.state = {
            accBal: 0,
            totalDebits: 0,
            totalCredits: 0,
        }

        // we need to 
        // get total debit amount from API
        // get total credit amount from API
        // update accBal to totalCredits - totalDebits
    }

    componentDidMount() {
        // load debits API
        axios.get("https://moj-api.herokuapp.com/debits").then((debits) => {
            const data = debits.data;

            console.log(data);

            let totalDeb = 0;

            for (let i = 0; i < data.length; i++) {
                totalDeb += data[i].amount;
                console.log("totalDeb: ", totalDeb);
            }

            // object to hold all the new assignments from API
            const creditSearchObj = {
                totalDebits: totalDeb,
            };

            // changing state of variables according to API data
            this.setState(creditSearchObj);

        }).catch((err) => console.log(err));

        console.log("totalDebits: ", this.state.totalDebits);

        // load credits API
        axios.get("https://moj-api.herokuapp.com/credits").then((credits) => {
            const myData = credits.data;

            console.log(myData);

            let totalCred = 0;

            for (let i = 0; i < myData.length; i++) {
                totalCred += myData[i].amount;
                console.log("totalCred: ", totalCred);
            }

            // object to hold all the new assignments from API
            const creditSearchObj = {
                totalCredits: totalCred,
            };

            // changing state of variables according to API data
            this.setState(creditSearchObj);

            console.log("totalCredits: ", this.state.totalCredits);

            // update accBal
            console.log("account balance before: ", this.state.accBal);
            let difference = (this.state.totalCredits - this.state.totalDebits);
            let formattedDiff = (Math.round(difference * 100)/100).toFixed(2);
            this.setState({ accBal: formattedDiff });
            console.log("account balance after: ", this.state.accBal);

        }).catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                Balance: {this.state.accBal}
            </div>
        );
    }
}

export default AccountBalance;