import React, {Component}   from 'react';
import Routing, { Router }  from './Router';
import history              from './RouteHistory';
import urls                 from '../utils/urls.js';

//Screens
import Posts from '../screens/Posts';
import Post  from '../screens/Post';
import Home  from '../screens/Home';

const { Route, Switch, Redirect } = Routing;

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='' component={Home}/>
                    <Route exact path={urls.posts}
                        component={(props) => <Posts {...props} {...props.location.state}/>}
                    />
                    <Route exact path={urls.post}
                        component={(props) => <Post {...props} {...props.location.state}/>}
                    />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
}

export default Routes;