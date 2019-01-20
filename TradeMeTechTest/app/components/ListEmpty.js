import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

export default class ListEmpty extends PureComponent {
    render() {
        return (
            <View style={styles.container}>

                <Headline>

                    No listings found

                </Headline>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});