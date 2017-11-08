import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const titles = ['专辑', '表演者', '歌曲名', '厂牌', '风格'];

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {currentIndex: 0};
    }

    _onItemSelect(index) {
        this.setState({currentIndex: index});
        if (this.props.callback) {
            this.props.callback(index);
        }
    }

    render() {
        let items = [];
        let length = titles.length;
        for (let i = 0; i < length; i++) {
            let name = titles[i];
            if (this.state.currentIndex == i) {
                items.push(<TouchableOpacity key={name} style={[{flex: 1}]} onPress={() => (this._onItemSelect(i))}><Text
                    style={[styles.font, styles.textSelectedBg]}
                >{name}</Text></TouchableOpacity>);
            } else {
                items.push(<TouchableOpacity key={name} style={[{flex: 1}]} onPress={() => (this._onItemSelect(i))}><Text
                    style={[styles.font, styles.textNormalBg]}
                >{name}</Text></TouchableOpacity>);
            }
        }
        return (
            <View style={[styles.flex]}>
                {[...items]}
            </View>
        );
    }
}

styles = StyleSheet.create({
    flex: {
        marginTop: 25,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    font: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
    },

    textNormalBg: {
        backgroundColor: '#A3D0C3',
    },

    textSelectedBg: {
        backgroundColor: '#A39FFF',
    }
});