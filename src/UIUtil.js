import React from 'react';
import {
    Dimensions, //用于获取设备屏幕的宽高
    ActivityIndicator
} from 'react-native';

const UiUtil = {
    //屏幕尺寸
    windowSize: {
        width: Dimensions.get("window").width,
        height:Dimensions.get("window").height
    },

    // loading效果
    loading:<ActivityIndicator style={{marginTop: 200}}/>
};

module.exports = UiUtil;