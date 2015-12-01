import React = require('react');
import {connect} from 'react-redux';
import {StateType} from '../reducers';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="root">
                Hello, world!
            </div>
        );
    }
}

function select(state: StateType) {
    return state;
}

export default connect(select)(App);
