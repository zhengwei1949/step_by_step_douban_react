import React,{Component} from 'react';
import {Router,Route,browserHistory,IndexRoute,Redirect} from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';
import In_theaters from './In_theaters.jsx';

export default class MyRouter extends Component{
    render(){
        return (
            <Router history={browserHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home} />
                    <Route path='home' component={Home} />
                    <Redirect from='in_theaters' to='in_theaters/1' component={In_theaters} />
                    <Route path='in_theaters/:page' component={In_theaters}/>
                    <Route path='coming_soon' component={In_theaters}/>
                    <Route path='top250' component={In_theaters}/>
                </Route>
            </Router>
        )
    }
}