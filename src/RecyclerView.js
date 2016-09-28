import React, {Component} from 'react';
import {UIManager, View, ReactNativeComponentTree,requireNativeComponent,StyleSheet} from 'react-native';

var styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});

var NativeAndroidRecyclerView = requireNativeComponent(
    'AndroidRecyclerViewBackedScrollView',
    RecyclerView, {
        nativeOnly: {onViewBind: true}
    }
);

let RecyclerView = class RecyclerView extends React.Component {

    constructor(){
        super();
        this._children = [];
    }

    renderChildren(){
        this._children = this.props.datas.map((data,i)=>{
            return <View
                key={i}
                collapsable={false}
                style={styles.absolute}>
                {this.props.renderRow(data)}
            </View>
        });
        return this._children;
    }

    render(){
        let that = this;
        let props = {
            ...this.props,
            onTouchStart: this.scrollResponderHandleTouchStart,
            onTouchMove: this.scrollResponderHandleTouchMove,
            onTouchEnd: this.scrollResponderHandleTouchEnd,
            onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
            onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
            onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
            onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
            onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
            onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
            onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
            onResponderGrant: this.scrollResponderHandleResponderGrant,
            onResponderRelease: this.scrollResponderHandleResponderRelease,
            onResponderReject: this.scrollResponderHandleResponderReject,
            onScroll: this.scrollResponderHandleScroll,
            onViewBind: (event)=>{
                that.props.onBindView(event.nativeEvent.dataPosition,event.nativeEvent.viewId);
            },
            style: ([{flex: 1}, this.props.style])
        }


        return (
            <NativeAndroidRecyclerView ref='view' {...props}>
                {this.renderChildren()}
            </NativeAndroidRecyclerView>
        );
    }
}



RecyclerView.PropTypes = {
    ...View.propTypes,
    renderRow:React.PropTypes.func,
    datas:React.PropTypes.array
}

export default RecyclerView;