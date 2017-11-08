import React, {Component} from 'react';
import {
    StackNavigator,
} from 'react-navigation';

import HomePage from './HomePage';
import AlbumDetailPage from './AlbumDetailPage';
import BoxsetDetailPage from './BoxsetDetailPage';

export const SimpleApp = StackNavigator({
    Home: {screen: HomePage},
    Album: {screen: AlbumDetailPage},
    Boxset: {screen: BoxsetDetailPage},
});

export default class App extends Component {
    render() {
        return <SimpleApp />;
    }
};