import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import HttpUtil from './HttpUtils';

export default class BoxsetItem extends Component {
    constructor(props) {
        super(props);
    }

    _onPress() {
        this.props.onPressItem(this.props.index);
    }

    render() {
        let imgUrl = HttpUtil.getHostUrl() + '/covers/error.jpg';
        if (typeof(this.props.item.cover) != "undefined") {
            imgUrl = HttpUtil.getHostUrl() + '/covers/' + this.props.item.cover;
        }

        return (
            <TouchableOpacity onPress={this._onPress.bind(this)} style={[styles.itemHeight]}>
                <View style={[styles.flex, styles.flexDirection]}>
                    <Image source={{uri: imgUrl}} style={[styles.image]}>
                    </Image>
                    <View style={[styles.intro_container, styles.flex]}>
                        <Text numberOfLines={3} style={[styles.intro]}>{this.props.item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemHeight: {
        height: 80,
    },

    flex: {
        flex: 1,
    },

    flexDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    image: {
        width: 60,
        height: 60,
        marginLeft: 10,
    },

    intro_container: {
        marginLeft: 10,
        marginRight: 10,
        height: 80,
        justifyContent: 'space-around',
    },

    intro: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    path: {
        fontSize: 12,
        textAlign: 'left',
    },
});