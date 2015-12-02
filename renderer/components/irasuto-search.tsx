import React = require('react');
import TextField = require('material-ui/lib/text-field');
import {search} from '../actions';

interface Props {
    dispatch: Redux.Dispatch;
}

export default class IrasutoSearch extends React.Component<Props, {}> {
    componentDidMount() {
        (this.refs['text_field'] as TextField).focus();
    }

    onChange(event: React.SyntheticEvent) {
        const elem = event.nativeEvent.target as HTMLInputElement;
        this.props.dispatch(search(elem.value));
    }

    render() {
        return (
            <div className="search-input">
                <TextField
                    fullWidth
                    hintText="Search..."
                    onChange={this.onChange.bind(this)}
                    ref="text_field"
                />
            </div>
        );
    }
}
