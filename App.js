import React from 'react';

//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import all the screens needed
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrawerNavigationRoutes from './screens/DrawerNavigationRoutes';
import MemberScreen from './screens/MemberScreen';

const Auth = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Register',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
    },
  },
  DetailsScreen: {
    screen: DetailsScreen,
    navigationOptions: {
      title: 'SilverCar Community',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
    },
  },
  MemberScreen: {
    screen: MemberScreen,
    navigationOptions: {
      title: 'SILVERCAR COMMUNITY',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
    },
  },
});

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = createSwitchNavigator({ 
  SplashScreen: {
    /* SplashScreen which will come once for 5 Seconds */
    screen: SplashScreen,
    navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
    },
  },
  Auth: {
    /* Auth Navigator which includer Login Signup will come once */
    screen: Auth,
  },
  DrawerNavigationRoutes: {
    /* Navigation Drawer as a landing page */
    screen: DrawerNavigationRoutes,
    navigationOptions: {
      /* Hiding header for Navigation Drawer as we will use our custom header */
      headerShown: false,
    },
  },
});

export default createAppContainer(App);