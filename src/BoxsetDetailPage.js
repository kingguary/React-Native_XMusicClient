import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
} from 'react-native';

import BoxsetItem from './BoxsetItem';
import HttpUtil from './HttpUtils';

export default class BoxsetDetailPage extends Component {
    // Disable show Navigator's header
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // Caution: this must be params.
        let {params} = this.props.navigation.state;
        let imgUrl = HttpUtil.getHostUrl() + '/covers/error.jpg';
        if (typeof(params.album.cover) != "undefined") {
            imgUrl = HttpUtil.getHostUrl() + '/covers/' + params.album.cover;
        }

        return (
            <View style={[styles.root]}>
                <Text style={styles.title}>
                    {params.album.title}
                </Text>
                <View style={styles.coverContainer}>
                    <Image style={styles.coverImage} source={{uri: imgUrl}}/>
                </View>
                <FlatList style={[styles.list]}
                          data={[...params.album.cd_list]}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                          ItemSeparatorComponent={this._renderSeparator}
                          showsVerticalScrollIndicator={false}/>
            </View>
        );
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => {
        return (
            <BoxsetItem onPressItem={this._onPressItem.bind(this)} item={item} index={index}/>
        );
    };

    _onPressItem(index) {
        const {navigate} = this.props.navigation;
        let {params} = this.props.navigation.state;
        navigate('Album', {album:params.album, index});
    }

    _renderSeparator() {
        var style = {
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style}/>
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F9F0DA',
    },

    title: {
        width: "80%",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },

    coverContainer: {
        width: 150,
        height: 150,
        marginTop: 10,
    },

    coverImage: {
        width: "100%",
        height: "100%",
    },

    list: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    }
});