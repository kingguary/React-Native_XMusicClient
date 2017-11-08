import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';

import Header from './SearchHeader';
import SearchBar from './SearchBar';
import HttpUtil from './HttpUtils';
import UiUtil from './UIUtil';
import AlbumItem from './AlbumItem';

const HOST_URL = HttpUtil.getHostUrl();
const ALBUM_SEARCH_URL = HOST_URL + '/album';
const LABEL_SEARCH_URL = HOST_URL + '/label';
const PERFORMER_SEARCH_URL = HOST_URL + '/performer';
const TRACK_SEARCH_URL = HOST_URL + '/track';

export default class HomePage extends Component {
    // Disable show Navigator's header
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            showList: false,
            showNothing: true,
            showLoading: false,
            currentType: 0
        };
    }

    onSearchTypeChanged(type) {
        this.setState({currentType: type});
    }

    onSearchCallback(keyword) {
        if (keyword == '') {
            alert('请输入搜索关键字');
            return;
        }

        let type = this.state.currentType;
        this.doSearch(type, keyword);
    }

    doSearch(type, keyword) {
        console.log('doSearch keyword=' + keyword + ' type=' + type);
        this.setState({
            showNothing: false,
            showLoading: true,
        });

        let url = ALBUM_SEARCH_URL;
        if (type == 1) {
            url = PERFORMER_SEARCH_URL;
        } else if (type == 2) {
            url = TRACK_SEARCH_URL;
        } else if (type == 3 || type == 4) {
            url = LABEL_SEARCH_URL;
        }
        let body = {name: keyword};
        HttpUtil.postRequest(url, body, this.onSearchResultOK.bind(this), this.onSearchResultError.bind(this));
    }

    onSearchResultOK(data) {
        console.log('onSearchResultOK data size= ' + data.length);
        if (!data || data.length == 0) {
            this.setState({
                listData: [],
                showList: false,
                showNothing: true,
                showLoading: false,
            });
            return alert("未查询到相关专辑！");
        }

        this.setState({
            showList: true,
            showNothing: false,
            showLoading: false,
            listData: data,
        });
    }

    onSearchResultError(error) {
        console.log('onSearchResultError error=' + error);
        alert(error);
    }

    render() {
        let mainContent = null;
        if (this.state.showList) {
            mainContent = <FlatList style={[styles.list]}
                                    data={[...this.state.listData]}
                                    keyExtractor={item => (item.path + item.title)}
                                    renderItem={({item}) => <AlbumItem onPressItem={this._onPressItem.bind(this)}
                                                                       album={item}/>}
                                    ItemSeparatorComponent={this._renderSeparator}/>;
        } else if (this.state.showLoading) {
            mainContent = UiUtil.loading;
        }

        return (
            <View style={[styles.flex]}>
                <Header callback={this.onSearchTypeChanged.bind(this)}></Header>
                <SearchBar searchCallback={this.onSearchCallback.bind(this)}></SearchBar>
                {mainContent}
            </View>
        );
    }

    _onPressItem(album) {
        const {navigate} = this.props.navigation;
        if (album.cd_list.length > 1) {
            navigate('Boxset', {album});
        } else {
            navigate('Album', {album, index: 0});
        }
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
    flex: {
        flex: 1,
        backgroundColor: '#F9F0DA',
    },

    list: {
        marginTop: 20,
    }
});