import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { getListing } from '../../api';
import { Title, Subheading, Card, Paragraph } from 'react-native-paper';
import Colors from '../../res/colors';

export default class Detail extends Component {
    state = {
        isLoading: false,
        listing: {}
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('listing').Title,
            headerStyle: {
                backgroundColor: Colors.tradeMeYellow
            },
            headerTitleStyle: {
                color: Colors.yellowHeaderTextColor
            },
            headerTintColor: Colors.yellowHeaderTextColor
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

    render() {
        const { ListingId = '', Title: title = '', Photos = [], Body = '' } = this.state.listing;

        return (
            <View style={styles.container}>

                <Card>

                    {this.renderGallery(Photos)}

                    <Card.Content>

                        <Title>{title}</Title>

                        <Subheading>{ListingId}</Subheading>

                        <Paragraph>{Body}</Paragraph>

                    </Card.Content>

                </Card>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});