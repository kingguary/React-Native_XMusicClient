import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class TrackItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text numberOfLines={1} style={[styles.name]}>{this.props.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 30,
        width: '80%',
        justifyContent: 'center',
    },

    name: {
        width: '100%',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
    },
});