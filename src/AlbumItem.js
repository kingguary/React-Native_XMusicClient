import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import HttpUtil from './HttpUtils';

export default class AlbumItem extends Component {
    constructor(props) {
        super(props);
    }

    _onPress() {
        this.props.onPressItem(this.props.album);
    }

    render() {
        let imgUrl = HttpUtil.getHostUrl() + '/covers/error.jpg';
        if (typeof(this.props.album.cover) != "undefined") {
            imgUrl = HttpUtil.getHostUrl() + '/covers/' + this.props.album.cover;
        }

        // console.log('img url:' + imgUrl);
        return (
            <TouchableOpacity onPress={this._onPress.bind(this)} style={[styles.itemHeight]}>
                <View style={[styles.flex, styles.flexDirection]}>
                    <Image source={{uri: imgUrl}} style={[styles.image]}>
                    </Image>
                    <View style={[styles.intro_container, styles.flex]}>
                        <Text numberOfLines={3} style={[styles.intro]}>{this.props.album.title}</Text>
                        <Text numberOfLines={2} style={[styles.path]}>{this.props.album.path}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemHeight: {
        height: 100,
    },

    flex: {
        flex: 1,
    },

    flexDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    image: {
        width: 80,
        height: 80,
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