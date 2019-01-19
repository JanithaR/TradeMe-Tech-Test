import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

type Props = {};

export default class CategoryScreen extends Component<Props> {
    navigateToSubcategory = () => {
        this.props.navigation.push('CategoryScreen');
    };

    navigateToListing = () => {
        this.props.navigation.push('ListingScreen');
    };

    render() {
        return (
            <View>
                <Text>Category screen</Text>
                <Button
                    title='Go to a subcategory'
                    onPress={this.navigateToSubcategory} />
                <Text>-------</Text>
                <Button
                    title='Go to a listing'
                    onPress={this.navigateToListing} />
            </View>
        );
    }
}