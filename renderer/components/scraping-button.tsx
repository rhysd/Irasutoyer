import React = require('react');
import RefreshIndicator = require('material-ui/lib/refresh-indicator');
import {startScraping} from '../actions';

interface Props {
    nowScraping: boolean;
    dispatch: Redux.Dispatch;
}

export default class ScrapingButton extends React.Component<Props, {}> {
    onClick() {
        this.props.dispatch(startScraping());
    }

    render() {
        return (
            <div className="scraping-button" onClick={this.onClick.bind(this)}>
                <RefreshIndicator
                    percentage={100}
                    size={40}
                    left={10}
                    top={5}
                    status={this.props.nowScraping ? "loading" : "ready"}
                />
            </div>
        );
    }
}
