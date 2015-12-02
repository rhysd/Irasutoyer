import React = require('react');
import {connect} from 'react-redux';
import {Irasuto} from 'node-irasutoya';
import Dialog = require('material-ui/lib/dialog');
import {StateType} from '../reducers';
import {clearScrapingError} from '../actions';
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
    scrapingError?: Error;
}

class App extends React.Component<Props, {}> {
    render() {
        const {candidates, dispatch, nowScraping, scrapingError} = this.props;

        return (
            <div className="root" style={InsetStyle}>
                <IrasutoSearch dispatch={dispatch}/>
                <ScrapingButton dispatch={dispatch} nowScraping={nowScraping}/>
                <IrasutoList irasutoya={candidates}/>
                <Dialog
                    title="Scraping failure"
                    actions={[{ text: 'Close', onClick: () => dispatch(clearScrapingError()) }]}
                    open={scrapingError !== null}
                >
                    {scrapingError !== null ? scrapingError.message : undefined}
                </Dialog>
            </div>
        );
    }
}

function select(state: StateType) {
    return {
        candidates: state.candidates,
        nowScraping: state.now_scraping,
        scrapingError: state.scraping_error,
    };
}

export default connect(select)(App);
