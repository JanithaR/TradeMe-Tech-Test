import React, { PureComponent } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { List, Colors, Paragraph, Title } from 'react-native-paper';

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

    renderBuyNow = item => {
        const { HasBuyNow, BuyNowPrice } = item;

        if (HasBuyNow) {
            return (
                <View style={{ alignItems: 'flex-end', marginRight: 5 }}>

                    <Paragraph>Buy Now</Paragraph>

                    <Title>${BuyNowPrice}</Title>

                </View>
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
                right={() => this.renderBuyNow(item)}
                onPress={() => onPress(item)}
                style={styles.listItem} />
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey200
    }
});