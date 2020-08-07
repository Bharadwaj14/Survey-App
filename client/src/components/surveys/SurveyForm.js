import _ from 'lodash';
import React , { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {Form} from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component{
    renderFields(){
        return _.map(formFields, ({label, name})=>{
            return(
                <Field 
                    key={name}
                    label={label}
                    type="text" 
                    name={name} 
                    component={SurveyField}
                />  
            );
        });
    }
    render(){
        return(
            <div>
            <Form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">Next
                        <i className="material-icons right">done</i> 
                    </button>
             </Form> 
            </div>
        );
    }
}

function validate(values){
    const errors={}; 
    errors.recipients=validateEmails(values.recipients || '');
    _.each(formFields, ({name})=>{
         if(!values[name]){
             errors[name] = 'You must provide a value';
         }
    });
    
    return errors;
}
// online
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);