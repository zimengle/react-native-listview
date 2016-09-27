import React from 'react';

import {
    Text,
    ScrollView,
} from 'react-native';


import {
    Form,
    Separator, InputField, LinkField,
    SwitchField, PickerField, DatePickerField, TimePickerField
} from 'react-native-form-generator';

export default class FormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }
    }

    handleFormChange(formData) {
        /*
         formData will contain all the values of the form,
         in this example.

         formData = {
         first_name:"",
         last_name:"",
         gender: '',
         birthday: Date,
         has_accepted_conditions: bool
         }
         */

        this.setState({formData: formData})
        this.props.onFormChange && this.props.onFormChange(formData);
    }

    handleFormFocus(e, component) {
        //console.log(e, component);
    }

    openTermsAndConditionsURL() {

    }

    render() {
        return (<ScrollView  style={{paddingTop:100,paddingBottom:100,paddingLeft:30,paddingRight:30}}>
            <Form
                ref='registrationForm'
                onFocus={this.handleFormFocus.bind(this)}
                onChange={this.handleFormChange.bind(this)}
                label="Personal Information">
                <Separator />
                <InputField
                    ref='first_name'
                    label='First Name'
                    placeholder='First Name'
                    helpText={((self)=> {

                        if (Object.keys(self.refs).length !== 0) {
                            if (!self.refs.registrationForm.refs.first_name.valid) {
                                return self.refs.registrationForm.refs.first_name.validationErrors.join("\n");
                            }

                        }
                        // if(!!(self.refs && self.refs.first_name.valid)){
                        // }
                    })(this)}
                    validationFunction={[(value)=> {
                        /*
                         you can have multiple validators in a single function or an array of functions
                         */

                        if (value == '') return "Required";
                        //Initial state is null/undefined
                        if (!value) return true;
                        // Check if First Name Contains Numbers
                        var matches = value.match(/\d+/g);
                        if (matches != null) {
                            return "First Name can't contain numbers";
                        }

                        return true;
                    }, (value)=> {
                        ///Initial state is null/undefined
                        if (!value) return true;
                        if (value.indexOf('4') != -1) {
                            return "I can't stand number 4";
                        }
                        return true;
                    }]}
                />
                <InputField ref='last_name' placeholder='Last Name'/>
                <InputField
                    multiline={true}
                    ref='other_input'
                    placeholder='Other Input'
                    helpText='this is an helpful text it can be also very very long and it will wrap'/>
                <Separator />
                <LinkField label="test test test" onPress={()=> {
                }}/>
                <SwitchField label='I accept Terms & Conditions'
                             ref="has_accepted_conditions"
                             helpText='Please read carefully the terms & conditions'/>
                <PickerField ref='gender'
                             label='Gender'
                             options={{
                                 "": '',
                                 male: 'Male',
                                 female: 'Female'
                             }}/>
                <DatePickerField ref='birthday'
                                 minimumDate={new Date('1/1/1900')}
                                 maximumDate={new Date()}
                                 placeholder='Birthday'/>
                <TimePickerField ref='alarm_time'
                                 placeholder='Set Alarm'/>
                <DatePickerField ref='meeting'
                                 minimumDate={new Date('1/1/1900')}
                                 maximumDate={new Date()} mode="datetime" placeholder='Meeting'/>
            </Form>

        </ScrollView>);
    }
}