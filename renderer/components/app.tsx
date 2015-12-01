import React = require('react');
import {connect} from 'react-redux';
import List = require('material-ui/lib/lists/list');
import ListDivider = require('material-ui/lib/lists/list-divider');
import ListItem = require('material-ui/lib/lists/list-item');
import Avatar = require('material-ui/lib/avatar');
import MenuItem = require('material-ui/lib/menus/menu-item');
import IconMenu = require('material-ui/lib/menus/icon-menu');
import IconButton = require('material-ui/lib/icon-button');
import FontIcon = require('material-ui/lib/font-icon');
import TextField = require('material-ui/lib/text-field');
import {StateType} from '../reducers';

const InsetStyle = {
    paddingTop: process.platform === 'darwin' ? '48px' : undefined
};

class App extends React.Component<{}, {}> {
    render() {
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

        const divStyle = {
            paddingLeft: '108px',
            paddingTop: '32px',
            paddingBottom: '32px',
        };

        return (
            <div className="root" style={InsetStyle}>
                <div className="search-input">
                    <TextField
                        fullWidth
                        hintText="Search..." />
                </div>
                <List>
                    <ListItem
                        leftAvatar={<Avatar size={72} src="images/ok-128.jpg" />}
                        innerDivStyle={divStyle}
                        rightIconButton={rightIconMenu}
                        primaryText="Brendan Lim"
                        secondaryText={
                            <p>
                                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                            </p>
                        }
                        secondaryTextLines={2} />
                    <ListDivider inset={true} />
                    <ListItem
                        leftAvatar={<Avatar size={72} src="images/kolage-128.jpg" />}
                        innerDivStyle={divStyle}
                        rightIconButton={rightIconMenu}
                        primaryText="me, Scott, Jennifer"
                        secondaryText={
                            <p>
                                Wish I could come, but I&apos;m out of town this weekend.
                            </p>
                        }
                        secondaryTextLines={2} />
                    <ListDivider inset={true} />
                    <ListItem
                        leftAvatar={<Avatar size={72} src="images/uxceo-128.jpg" />}
                        innerDivStyle={divStyle}
                        rightIconButton={rightIconMenu}
                        primaryText="Grace Ng"
                        secondaryText={
                            <p>
                                Do you have any Paris recs? Have you ever been?
                            </p>
                        }
                        secondaryTextLines={2} />
                    <ListDivider inset={true} />
                    <ListItem
                        leftAvatar={<Avatar size={72} src="images/kerem-128.jpg" />}
                        innerDivStyle={divStyle}
                        rightIconButton={rightIconMenu}
                        primaryText="Kerem Suer"
                        secondaryText={
                            <p>
                                Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                            </p>
                        }
                        secondaryTextLines={2} />
                    <ListDivider inset={true} />
                    <ListItem
                        leftAvatar={<Avatar size={72} src="images/raquelromanp-128.jpg" />}
                        innerDivStyle={divStyle}
                        rightIconButton={rightIconMenu}
                        primaryText="Raquel Parrado"
                        secondaryText={
                            <p>
                                We should eat this: grated squash. Corn and tomatillo tacos.
                            </p>
                        }
                        secondaryTextLines={2} />
                    </List>
            </div>
        );
    }
}

function select(state: StateType) {
    console.log('foooooooooooo', state);
    return state;
}

export default connect(select)(App);
