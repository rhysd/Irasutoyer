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
    candidates?: Irasuto[];
    dispatch?: Redux.Dispatch;
}

class App extends React.Component<Props, {}> {
    render() {
        const {candidates, dispatch} = this.props;
        return (
            <div className="root" style={InsetStyle}>
                <IrasutoSearch dispatch={dispatch}/>
                <IrasutoList irasutoya={candidates}/>
            </div>
        );
    }
}

function select(state: StateType) {
    return {
        candidates: state.candidates
    };
}

export default connect(select)(App);
