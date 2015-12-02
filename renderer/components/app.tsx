import React = require('react');
import {connect} from 'react-redux';
import {Irasuto} from 'node-irasutoya';
import List = require('material-ui/lib/lists/list');
import ListDivider = require('material-ui/lib/lists/list-divider');
import ListItem = require('material-ui/lib/lists/list-item');
import Avatar = require('material-ui/lib/avatar');
import MenuItem = require('material-ui/lib/menus/menu-item');
import IconMenu = require('material-ui/lib/menus/icon-menu');
import IconButton = require('material-ui/lib/icon-button');
import FontIcon = require('material-ui/lib/font-icon');
import TextField = require('material-ui/lib/text-field');
import Infinite = require('react-infinite');
import {StateType} from '../reducers';

const InsetStyle = {
    paddingTop: process.platform === 'darwin' ? '48px' : undefined
};

interface Props {
    irasutoya?: Irasuto[];
}

class App extends React.Component<Props, {}> {
    renderItems() {
        const divStyle = {
            paddingLeft: '108px',
            paddingTop: '32px',
            paddingBottom: '32px',
        };

        const iconButton = (
            <IconButton iconClassName="menu-icon-button" tooltip="Actions">;
                <FontIcon className="muidocs-icon-navigation-more-vert"/>
            </IconButton>
        )

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButton}>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Send feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );

        const itemStyle = {
            height: '108px'
        };

        return this.props.irasutoya.map((irasuto, idx) =>
            <ListItem
                key={'item-' + idx}
                leftAvatar={<Avatar size={72} src={irasuto.image_url} style={{borderRadius: '15%'}}/>}
                innerDivStyle={divStyle}
                rightIconButton={rightIconMenu}
                primaryText={irasuto.name}
                secondaryText={(irasuto as any).category.title}
                style={itemStyle}
            />
        );
    }

    render() {
        return (
            <div className="root" style={InsetStyle}>
                <div className="search-input">
                    <TextField
                        fullWidth
                        hintText="Search..." />
                </div>
                <List style={{height: '888px'}}>
                    <Infinite elementHeight={108} containerHeight={888}>
                        {this.renderItems()}
                    </Infinite>
                </List>
            </div>
        );
    }
}

function select(state: StateType) {
    return state;
}

export default connect(select)(App);
