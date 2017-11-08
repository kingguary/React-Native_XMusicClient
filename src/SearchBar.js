import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Image,
    View,
    TouchableHighlight
} from 'react-native';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {keyword: ''};
    }

    searchClick() {
        if (this.props.searchCallback) {
            this.props.searchCallback(this.state.keyword);
        }
    }

    clearTextInput() {
        this.refs.myInput.clear();
        this.setState({keyword: ''});
    }

    render() {
        return (
            <View style={[styles.container]}>
                <TextInput
                    ref='myInput'
                    style={[styles.input]}
                    placeholder="请输入搜索内容"
                    numberOfLines={1}
                    autoFocus={true}
                    underlineColorAndroid={'transparent'}
                    returnKeyType="search"
                    onChangeText={(keyword) => this.setState({keyword})}
                    onSubmitEditing={() => this.searchClick()}
                />
                {
                    this.state.keyword.length > 0 ? <TouchableHighlight
                        onPress={() => this.clearTextInput()}
                        underlayColor="#E1F6F0">
                        <Image source={require('../res/image/ic_close.png')} resizeMode="contain" style={styles.btn}/>
                    </TouchableHighlight> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#A3D0C3',
        borderRadius: 4,
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: 45,
    },

    btn: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginRight: 5,
    },
});