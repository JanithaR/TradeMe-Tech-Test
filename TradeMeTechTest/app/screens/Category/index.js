import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, AsyncStorage, StatusBar } from 'react-native';
import { getCategories } from '../../api';
import { List } from 'react-native-paper';
import Colors from '../../res/colors';

type Props = {};

export default class CategoryScreen extends Component<Props> {
    state = {
        isLoading: false,
        categories: {}
    };

    static navigationOptions = ({ navigation }) => {
        title = navigation.getParam('category') ? navigation.getParam('category').Name : 'Trade Me Tech Test - JanithaR';

        return {
            title
        };
    };

    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            this.checkCache();
        });
    }

    checkCache = async () => {
        const { navigation } = this.props;

        const cacheKey = navigation.getParam('category') ? navigation.getParam('category').Number : 'Root';
        console.log('looking for cache key = ', cacheKey);
        const categories = await AsyncStorage.getItem(cacheKey);
        console.log('cache found = ', categories);

        if (categories) {
            this.setState({
                isLoading: false,
                categories: JSON.parse(categories)
            });
        } else {
            this.loadCategories(cacheKey === 'Root' ? undefined : cacheKey);
        }
    };

    loadCategories = async (categoryNumber) => {
        // const category = this.props.navigation.getParam('category', {});
        const categories = await getCategories(categoryNumber);

        // cache
        await AsyncStorage.setItem(categoryNumber ? categoryNumber : 'Root', JSON.stringify(categories));

        this.setState({
            isLoading: false,
            categories
        });
    };

    navigateToSubcategory = (category) => {
        this.props.navigation.push('CategoryScreen', { category });
    };

    navigateToListing = (category) => {
        this.props.navigation.push('ListingScreen', { category });
    };

    renderCategories = categories => {
        const { Subcategories } = categories;

        if (Subcategories) {
            return Subcategories.map(subCategory => {
                const { Subcategories: innerSubCategories } = subCategory;

                if (innerSubCategories) {
                    return (
                        <List.Accordion
                            title={subCategory.Name}
                            // left={props => <List.Icon {...props} icon="xxx" />}
                            key={subCategory.Number}
                            style={styles.accordion}>

                            {innerSubCategories.map(innerSubCategory => {
                                return (
                                    <List.Item
                                        title={innerSubCategory.Name}
                                        key={innerSubCategory.Number}
                                        // left={() => <List.Icon icon="folder" />}
                                        onPress={innerSubCategory.IsLeaf ? () => this.navigateToListing(innerSubCategory) : () => this.navigateToSubcategory(innerSubCategory)}
                                        style={styles.listItem}
                                    />
                                );
                            })}

                        </List.Accordion>
                    );
                } else {
                    return (
                        <List.Item
                            title={subCategory.Name}
                            key={subCategory.Number}
                            // left={() => <List.Icon icon="folder" />}
                            onPress={() => this.navigateToListing(subCategory)}
                            style={styles.listItem}
                        />
                    );
                }
            });
        }
    }

    render() {
        const { isLoading, categories = [] } = this.state;

        if (isLoading) {
            return (
                <View style={styles.containerActivity}>

                    <StatusBar
                        backgroundColor={Colors.tradeMeYellow}
                        barStyle="light-content"
                        animated={true} />

                    <ActivityIndicator
                        size='large'
                        color={Colors.tradeMeBlue} />

                </View>
            );
        } else {
            return (
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.loadCategories}
                        />
                    }>

                    <StatusBar
                        backgroundColor={Colors.tradeMeYellow}
                        barStyle="light-content"
                        animated={true} />

                    <View>

                        {this.renderCategories(categories)}

                    </View>

                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerActivity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    accordion: {
        backgroundColor: Colors.accordionBackgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.accordionBorderBottomColor
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.accordionBorderBottomColor
    }
});