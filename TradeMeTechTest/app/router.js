import { createAppContainer, createStackNavigator } from 'react-navigation';
import CategoryScreen from './screens/Category';
import ListingScreen from './screens/Listing';
import DetailScreen from './screens/Detail';
import Colors from './res/colors';

const AppStack = createStackNavigator({
    CategoryScreen,
    ListingScreen,
    DetailScreen
}, {
        initialRouteName: 'CategoryScreen',
        defaultNavigationOptions: {
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                backgroundColor: Colors.tradeMeYellow
            },
            headerTitleStyle: {
                color: Colors.yellowHeaderTextColor
            },
            headerTintColor: Colors.yellowHeaderTextColor,
        }
    });

export default createAppContainer(AppStack);