import React, {Component} from 'react';
import {Text, ListView,RecyclerViewBackedScrollView} from 'react-native';
import RecyclerView from '../src/RecyclerView';
export default class Index extends Component {
    constructor() {
        super();
        this.data = [];
        for(let i = 0;i<1000;i++){
            this.data.push("row "+i);
        }
        this._data = [].concat(this.data);
        this.state = {
            datas: this.data
        };
    }

    switch(di,vi){
        this._data[vi] = this.data[di];
        this.setState({
            datas: this._data
        });
    }

    render() {
        return (
            <RecyclerView
                onBindView={(di,vi)=>{this.switch(di,vi)}}
                datas={this.state.datas}
                renderRow={(rowData) => <Text style={{height:100,color:'#000'}}>{rowData}</Text>}
            />
        );
    }
}