import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { search } from '../../api';
import ListItem from './components/ListItem';
import ListEmpty from '../../components/ListEmpty';
import Colors from '../../res/colors';
import { Searchbar } from 'react-native-paper';

type Props = {};

export default class ListingScreen extends Component<Props> {
    state = {
        isLoading: false,
        listings: [],
        searchPhrase: '',
        filteredListings: []
    };

    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam('category') ? navigation.getParam('category').Name : '...';

        return {
            title,
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
            this.loadListings();
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchPhrase, listings } = this.state;

        if (searchPhrase !== prevState.searchPhrase) {
            this.setState({
                filteredListings: this.filterListings(searchPhrase, listings)
            });
        }
    }

    filterListings = (searchPhrase, listings) => {
        searchPhrase = searchPhrase.toLowerCase().trim();

        return {
            ...listings,
            List: listings.List.filter(item => {
                return item.Title.toLowerCase().trim().contains(searchPhrase);
            })
        };
    };

    loadListings = async () => {
        const category = this.props.navigation.getParam('category', {});
        const listings = await search(category);

        this.setState({
            isLoading: false,
            listings
        });
    };

    renderListItem = ({ item }) => <ListItem
        item={item}
        onPress={this.onItemPress} />;

    onItemPress = (item) => {
        this.props.navigation.navigate('DetailScreen', { 'listing': item });
    };

    getListData = () => {
        const { listings, filteredListings } = this.state;

        if (filteredListings.length === 0) {
            return this.state.listings.List;
        } else {
            return this.state.filteredListings.List;
        }
    };

    renderListEmptyComponent = () => {
        return (
            <ListEmpty />
        );
    };

    render() {
        const { isLoading, searchPhrase } = this.state;

        return (
            <View style={styles.container}>

                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ searchPhrase: query }); }}
                    value={searchPhrase} />

                <FlatList
                    data={this.getListData()}
                    renderItem={this.renderListItem}
                    ListEmptyComponent={this.renderListEmptyComponent}
                    keyExtractor={item => item.ListingId.toString()}
                    refreshing={isLoading}
                    onRefresh={this.loadListings} />

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