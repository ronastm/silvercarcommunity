/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App-google';
import App from './App';
//import App from './App-scc';
//import App from './App-stack';
//import App from './App-crud';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
