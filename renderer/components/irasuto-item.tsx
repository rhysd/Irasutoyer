import React = require('react');
import {Irasuto} from 'node-irasutoya';
import IconMenu = require('material-ui/lib/menus/icon-menu');
import IconButton = require('material-ui/lib/icon-button');
import MenuItem = require('material-ui/lib/menus/menu-item');
import Avatar = require('material-ui/lib/avatar');
import FontIcon = require('material-ui/lib/font-icon');
import ListItem = require('material-ui/lib/lists/list-item');
import ListDivider = require('material-ui/lib/lists/list-divider');

const openExternal = global.require('shell').openExternal as (uri: string) => boolean;

interface Props {
    irasuto: Irasuto;
    key?: string;
}

export default class IrasutoItem extends React.Component<Props, {}> {
    render() {
        const {irasuto, key} = this.props;

        const divStyle = {
            paddingLeft: '108px',
            paddingTop: '32px',
            paddingBottom: '32px',
        };

        const iconButton = (
            <IconButton tooltip="Actions">;
                <FontIcon className="material-icons">more_vert</FontIcon>
            </IconButton>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButton}>
                <MenuItem primaryText="Copy URL to Clipboard" />
                <MenuItem primaryText="Open Category" />
            </IconMenu>
        );

        const irasutoAvatar = (
            <Avatar
                size={72}
                src={irasuto.image_url}
                style={{borderRadius: '15%'}}
            />
        );

        return (
            <div key={key}>
                <ListItem
                    leftAvatar={irasutoAvatar}
                    innerDivStyle={divStyle}
                    rightIconButton={rightIconMenu}
                    primaryText={irasuto.name}
                    secondaryText={irasuto.category.title}
                    style={{height: '108px'}}
                    onClick={() => openExternal(irasuto.detail_url)}
                />
                <ListDivider inset/>
            </div>
        );
    }
}
