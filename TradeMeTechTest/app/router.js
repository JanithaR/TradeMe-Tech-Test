import { createAppContainer, createStackNavigator } from 'react-navigation';
import CategoryScreen from './screens/Category';
import ListingScreen from './screens/Listing';
import DetailScreen from './screens/Detail';

const AppStack = createStackNavigator({
    CategoryScreen,
    ListingScreen,
    DetailScreen
}, {
        initialRouteName: 'CategoryScreen'
    });

export default createAppContainer(AppStack);