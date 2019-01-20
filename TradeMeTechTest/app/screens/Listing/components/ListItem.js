import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { List, Colors } from 'react-native-paper';

export default class ListItem extends PureComponent {
    renderThumb = item => {
        const { PictureHref } = item;

        if (PictureHref) {
            return (
                <Image
                    source={{ uri: PictureHref }}
                    style={{ width: 85, height: 64 }} />
            );
        } else {
            return (
                <List.Icon
                    color={Colors.grey500}
                    icon="broken-image" />
            );
        }
    };

    getDescription = item => {
        const { PriceDisplay } = item;

        return `${PriceDisplay}`;
    }

    render() {
        const { item, onPress } = this.props;

        return (
            <List.Item
                title={item.Title}
                description={this.getDescription(item)}
                left={() => this.renderThumb(item)}
                onPress={() => onPress(item)}
            />
        );
    }
}