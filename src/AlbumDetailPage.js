import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
} from 'react-native';

import TrackItem from './TrackItem';
import HttpUtil from './HttpUtils';

export default class AlbumDetailPage extends Component {
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

        let hasTrackInfo = false;
        let trackInfo = null;
        if (typeof(params.album.cd_list[params.index].tracks) == "undefined" ||
            params.album.cd_list[params.index].tracks.length == 0) {
            trackInfo = '曲目信息: 无';
        } else {
            trackInfo = '曲目信息:';
            hasTrackInfo = true;
        }

        return (
            <View style={[styles.root]}>
                <Text style={styles.title}>
                    {params.album.cd_list[params.index].title}
                </Text>
                <View style={styles.coverContainer}>
                    <Image style={styles.coverImage} source={{uri: imgUrl}}/>
                    <Text style={styles.coverText}>{params.album.cd_list[params.index].lossless_type}</Text>
                </View>
                {
                    hasTrackInfo ? <Text style={[styles.track, {textAlign: 'left'}]}>
                        {trackInfo}
                    </Text> : <Text style={styles.track}>
                        {trackInfo}
                    </Text>
                }

                {
                    hasTrackInfo ? <FlatList style={[styles.list]}
                                             data={[...params.album.cd_list[params.index].tracks]}
                                             keyExtractor={item => (item)}
                                             renderItem={({item}) => <TrackItem name={item}/>}
                                             ItemSeparatorComponent={this._renderSeparator}
                                             showsVerticalScrollIndicator={false}/> : null
                }
            </View>
        );
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
        width: 200,
        height: 200,
        marginTop: 10,
    },

    coverImage: {
        width: "100%",
        height: "100%",
    },

    coverText: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: 2,
        marginTop: 2,
        backgroundColor: '#fff',
        padding: 1,
        fontWeight: 'bold',
    },

    track: {
        width: "80%",
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },

    list: {
        flex: 1,
        width: '80%',
        marginTop: 10,
    }
});