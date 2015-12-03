import React = require('react');
import {Irasuto} from 'node-irasutoya';
import IconMenu = require('material-ui/lib/menus/icon-menu');
import IconButton = require('material-ui/lib/icon-button');
import MenuItem = require('material-ui/lib/menus/menu-item');
import Avatar = require('material-ui/lib/avatar');
import FontIcon = require('material-ui/lib/font-icon');
import ListItem = require('material-ui/lib/lists/list-item');
import ListDivider = require('material-ui/lib/lists/list-divider');
import {TouchTapEvent} from 'material-ui';

const openExternal = global.require('shell').openExternal as (uri: string) => boolean;
const clipboard = global.require('clipboard');
const writeText: (text: string, type?: string) => void = clipboard.writeText;
const writeImage: (image: GitHubElectron.NativeImage) => void = clipboard.writeImage;
const NativeImage = global.require('native-image') as typeof GitHubElectron.NativeImage;

interface Props {
    irasuto: Irasuto;
    key?: string;
}

export default class IrasutoItem extends React.Component<Props, {}> {
    onItemSelected(e: TouchTapEvent, item: React.ReactElement<any>) {
        e.preventDefault();

        const irasuto = this.props.irasuto;

        switch (item.key) {
            case 'copy-url-to-clipboard': {
                writeText(irasuto.detail_url);
                break;
            }
            case 'copy-md-link-to-clipboard': {
                writeText(`[${irasuto.name}](${irasuto.detail_url})`);
                break;
            }
            case 'copy-image-to-clipboard': {
                writeImage(NativeImage.createFromDataURL(irasuto.image_url));
                break;
            }
            case 'open-category': {
                openExternal(irasuto.category.url);
                break;
            }
            default:
                console.error(`Invalid action name: ${item.key}`);
                break;
        }
    }

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
            <IconMenu desktop iconButtonElement={iconButton} onItemTouchTap={this.onItemSelected.bind(this)}>
                <MenuItem primaryText="Copy URL to Clipboard" key="copy-url-to-clipboard"/>
                <MenuItem primaryText="Copy Markdown Link to Clipboard" key="copy-md-link-to-clipboard"/>
                <MenuItem primaryText="Copy Image to Clipboard" key="copy-image-to-clipboard"/>
                <MenuItem primaryText="Open Category" key="open-category"/>
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
                    onTouchTap={() => openExternal(irasuto.detail_url)}
                />
                <ListDivider inset/>
            </div>
        );
    }
}
