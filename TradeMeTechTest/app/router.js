import { createAppContainer, createStackNavigator } from 'react-navigation';
import CategoryScreen from './screens/Category';
import ListingScreen from './screens/Listing';

const AppStack = createStackNavigator({
    CategoryScreen,
    ListingScreen
}, {
        initialRouteName: 'CategoryScreen'
    });

export default createAppContainer(AppStack);