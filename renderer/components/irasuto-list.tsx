import React = require('react');
import List = require('material-ui/lib/lists/list');
import Infinite = require('react-infinite');
import {Irasuto} from 'node-irasutoya';
import IrasutoItem from './irasuto-item';

interface Props {
    irasutoya: Irasuto[];
}

export default class IrasutoList extends React.Component<Props, {}> {
    renderItem(irasuto: Irasuto, idx: number) {
        return (
            <IrasutoItem irasuto={irasuto} key={'item-' + idx}/>
        );
    }

    // Note:
    // This component assumes the window height is 1000px.
    render() {
        return (
            <List style={{height: '904px'}}>
                <Infinite elementHeight={108} containerHeight={904}>
                    {this.props.irasutoya.map((i, idx) => this.renderItem(i, idx))}
                </Infinite>
            </List>
        );
    }
}
