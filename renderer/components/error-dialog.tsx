import React = require('react');
import Dialog = require('material-ui/lib/dialog');
import {clearScrapingError} from '../actions';

interface Props {
    dispatch: Redux.Dispatch;
    scrapingError: Error;
}

export default class ErrorDialog extends React.Component<Props, {}> {
    render() {
        const {dispatch, scrapingError} = this.props;
        const should_show = scrapingError !== null;
        const actions = [
            { text: 'Close', onClick: () => dispatch(clearScrapingError()) }
        ];

        return (
            <Dialog
                title="Scraping failure"
                actions={actions}
                open={should_show} >
                {should_show ? scrapingError.message : undefined}
            </Dialog>
        );
    }
}
