import React, { Component } from 'react';
import { StyleSheet, Image, View, StatusBar, Text, ScrollView } from 'react-native';
import { getListing } from '../../api';
import { Title, Subheading, Card, Paragraph, FAB, Colors, Divider, List } from 'react-native-paper';
import AppColors from '../../res/colors';

export default class Detail extends Component {
    state = {
        isLoading: false,
        listing: {}
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Item',
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)'
            },
            headerTransparent: true,
            headerTitleStyle: {
                color: 'black'
            },
            headerTintColor: 'black',
        };
    };

    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            this.loadListing();
        });
    }

    loadListing = async () => {
        const lst = this.props.navigation.getParam('listing', {});
        const listing = await getListing(lst);

        this.setState({
            isLoading: false,
            listing
        });
    };

    renderGallery = (photos) => {
        if (photos.length > 0) {
            return (
                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>

                    <Image
                        source={{ uri: photos[0].Value.Large }}
                        style={{ width: 207, height: 207 }}
                        resizeMode='contain' />

                </View>
            );
        }
    };

    renderAttributes = (attributes) => {
        if (attributes.length > 0) {

            return (
                <List.Section title="Attributes">

                    {
                        attributes.map(attribute => <List.Item
                            title={attribute.DisplayName}
                            right={() => <Text>{attribute.Value}</Text>}
                            key={attribute.Name} />
                        )
                    }

                </List.Section>
            );
        }
    };

    render() {
        const { ListingId = '', Title: title = '', Photos = [], BuyNowPrice = '', Attributes = [] } = this.state.listing;

        return (
            <ScrollView>

                <View style={styles.container}>

                    <StatusBar
                        backgroundColor='white'
                        barStyle="dark-content"
                        animated={true} />

                    <Card elevation={0}>

                        {this.renderGallery(Photos)}

                        <Card.Content>

                            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 5 }}>

                                <Title style={{ fontSize: 30 }}>{title}</Title>

                                <Subheading>({ListingId})</Subheading>

                            </View>

                            <Title style={{ fontSize: 24, color: AppColors.tradeMeBlue, marginBottom: 5 }}>${BuyNowPrice}</Title>

                            <Paragraph style={{ marginBottom: 10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam luctus odio in molestie. Sed.</Paragraph>

                            <Divider />

                            {this.renderAttributes(Attributes)}

                        </Card.Content>

                    </Card>

                    <FAB
                        style={styles.fab}
                        icon="shop"
                        onPress={() => console.log('Pressed')}
                        color='white' />

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 300,
        backgroundColor: AppColors.tradeMeBlue
    }
});