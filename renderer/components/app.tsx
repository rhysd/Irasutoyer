import React = require('react');
import {connect} from 'react-redux';
import {Irasuto} from 'node-irasutoya';
import {StateType} from '../reducers';
import IrasutoList from './irasuto-list';
import IrasutoSearch from './irasuto-search';

const InsetStyle = {
    paddingTop: process.platform === 'darwin' ? '48px' : undefined
};

interface Props {
    irasutoya?: Irasuto[];
}

class App extends React.Component<Props, {}> {
    render() {
        return (
            <div className="root" style={InsetStyle}>
                <IrasutoSearch/>
                <IrasutoList irasutoya={this.props.irasutoya}/>
            </div>
        );
    }
}

function select(state: StateType) {
    return state;
}

export default connect(select)(App);
