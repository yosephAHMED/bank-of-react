import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import LogIn from './Components/LogIn';
import Debits from './Components/Debits';

class App extends Component {
    constructor() {
        super();

        this.state = {
            accountBalance: 14568.27,
            currentUser: {
                userName: 'bob_loblaw',
                memberSince: '08/23/99',
            }
        }
    }

    mockLogIn = (logInInfo) => {
        const newUser = {...this.state.currentUser}
        newUser.userName = logInInfo.userName;
        this.setState({currentUser: newUser});
    }

    render() {

        const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
        const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>);
        const UserProfileComponent = () => (<UserProfile userName = {this.state.currentUser.userName} memberSince = {this.state.currentUser.memberSince}/>);
        const DebitsComponent = () => (<Debits />);

        return (
            <Router>
                <div>
                    <Route exact path="/" render={HomeComponent} />
                    <Route exact path="/userProfile" render={UserProfileComponent} />
                    <Route exact path="/login" render={LogInComponent}/>
                    <Route exact path="/debits" render={DebitsComponent}/>
                </div>
            </Router>
        );
    }
}

export default App;