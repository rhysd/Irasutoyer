import React = require('react');
import {connect} from 'react-redux';
import {Irasuto} from 'node-irasutoya';
import {StateType} from '../reducers';
import IrasutoList from './irasuto-list';
import IrasutoSearch from './irasuto-search';
import ScrapingButton from './scraping-button';

const InsetStyle = {
    paddingTop: process.platform === 'darwin' ? '48px' : undefined
};

interface Props {
    candidates?: Irasuto[];
    dispatch?: Redux.Dispatch;
    nowScraping?: boolean;
}

class App extends React.Component<Props, {}> {
    render() {
        const {candidates, dispatch, nowScraping} = this.props;
        return (
            <div className="root" style={InsetStyle}>
                <IrasutoSearch dispatch={dispatch}/>
                <ScrapingButton dispatch={dispatch} nowScraping={nowScraping}/>
                <IrasutoList irasutoya={candidates}/>
            </div>
        );
    }
}

function select(state: StateType) {
    return {
        candidates: state.candidates,
        nowScraping: state.now_scraping,
    };
}

export default connect(select)(App);
