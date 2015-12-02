import React = require('react');
import TextField = require('material-ui/lib/text-field');

export default class IrasutoSearch extends React.Component<{}, {}> {
    componentDidMount() {
        (this.refs['text_field'] as TextField).focus();
    }

    render() {
        return (
            <div className="search-input">
                <TextField
                    fullWidth
                    hintText="Search..."
                    ref="text_field"
                />
            </div>
        );
    }
}
