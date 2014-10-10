/** @jsx React.DOM */
'use strict';

var Cellinput = React.createClass({
    "propTypes": {
        "type": React.PropTypes.string,
        "label": React.PropTypes.renderable,
        "help": React.PropTypes.renderable,
        "addonBefore": React.PropTypes.renderable,
        "addonAfter": React.PropTypes.renderable,
        "style": function(props) {
            if (props.type === 'submit') {
                return;
            };  
            return React.PropTypes.oneOf(['success','warning','error']).apply(null,arguments);
        },
        "hasFeedback": React.PropTypes.bool,
        "groupClassName": React.PropTypes.string,
        "wrapperClassName": React.PropTypes.string,
        "labelClassName": React.PropTypes.string,
        "disabled": React.PropTypes.bool,
        "state": React.PropTypes.string
    },
    "getInitialState": function() {
        return {
            "value": this.props.value
        }
    },
    "getInputDOMNode": function() {
        return this.refs.input.getDOMNode();
    },
    "getValue": function() {
        if (this.props.type === 'static') {
            return this.props.value;
        } else if (this.props.type) {
            return this.getInputDOMNode().value;
        } else {
            throw Error('cannot use getValue without specifying input type');
        };
    },
    "getChecked": function() {
        return this.getInputDOMNode().checked;
    },
    "changeHandle": function() {
        console.log('change');
        this.setState({
            value: this.getValue()
        });
    },
    "isCheckboxOrRadio": function() {
        return this.props.type === 'radio' || this.props.type === 'checkbox';
    },
    "renderInput": function() {
        var input = null;
        
        if (!this.props.type) {
            return this.props.children;
        };

        switch (this.props.type) {
            case 'select':
                input = (
                    <select className="form-control" ref="input" key="input">
                        {this.props.children}
                    </select>
                );
                break;
            case 'textarea':
                input = (
                    <textarea className="form-control" ref="input" key="input" /> 
                );
                break;
            case 'static':
                input = (
                   <p className="form-control-static" ref="input" key="input">
                        {this.props.value}
                   </p>
                );
                break;
            case 'submit':
                input = this.transferPropsTo(
                    <Button componentClass={React.DOM.input} ref="input" key="input" />      
                );
                break;
            default:
                var className = this.isCheckboxOrRadio() ? '' : 'form-control',
                    changeHandle = null;
                if (this.props.value) {
                    changeHandle = this.changeHandle;
                };

                input = <input placeholder={this.props.placeholder} 
                                className={className} 
                                value={this.state.value}
                                onChange={changeHandle}
                                ref="input" 
                                key="input" />;
        };

        return this.transferPropsTo(input);
    },
    "renderLabel": function(children) {
        var classes = {
            "control-label": !this.isCheckboxOrRadio()
        }; 
        classes[this.props.labelClassName] = this.props.labelClassName;

        return this.props.label ? (
            <label htmlFor={this.props.id} className={classSet(classes)} key="label">
                {children}
                {this.props.label}
            </label>
        ) : children;
    },
    "renderInputGroup": function(children) {
        var addonBefore = this.props.addonBefore ? (
                <span className="input-group-addon" key="addonBefore">
                    {this.props.addonBefore}
                </span>
            ) : null;
        var addonAfter = this.props.addonAfter ? (
                <span className="input-group-addon" key="addonAfter">
                    {this.props.addonAfter}
                </span>
            ) : null;

        return addonBefore || addonAfter ? (
                    <div className="input-group">
                        {addonBefore}
                        {children}
                        {addonAfter}
                    </div>
               ) : children;
    },
    "renderWrapper": function(children) {
        return this.props.wrapperClassName ? (
                    <div className={this.props.wrapperClassName} key="wrapper">
                        {children}
                    </div>
               ) : children;
    },
    "renderChecboxAndRadioWrapper": function(children) {
        var classes = {
            "checkbox": this.props.type === 'checkbox',
            "radio": this.props.type === 'radio'
        };

        return (
            <div className={classSet(classes)} key="checkboxRadioWrapper">
                {children}
            </div>
        );
    },
    "renderFormGroup": function(children) {
        var classes = {
            "form-group": true,
            "has-feedback": this.props.hasFeedback,
            "succes": this.props.state === 'success',
            "error": this.props.state === 'error',
            "warning": this.props.state === 'warning'
        };

        classes[this.props.groupClassName] = this.props.groupClassName;

        return (
            <div className={classSet(classes)} data-state={this.props.state}>
                {children}
            </div>
        );
    },
    "renderIcon": function() {
        var classes = {
            "glyphicon": true,
            "form-control-feedback": true,
            "glyphicon-success": this.props.state === 'success',
            "glyphicon-warning": this.props.state === 'warning',
            "glyphicon-error": this.props.state === 'error'
        };

        return this.props.hasFeedback ? (
            <span className={classSet(classes)} key="icon">{this.props.state}</span>    
        ) : null;
    },
    "renderHelp": function() {
        return this.props.help ? (
            <span className="help-block" key="help">
                {this.props.help}
            </span>
        ) : null; 
    },
    "render": function() {
        if (this.isCheckboxOrRadio()) {
            return this.renderFormGroup(
                this.renderWrapper([
                    this.renderCheckboxandRadioWrapper(
                       this.renderLabel(
                        this.renderInput()  
                       )
                    ),
                    this.renderHelp()
                ])      
            );
        } else {
           return this.renderFormGroup([
                this.renderLabel(),
                this.renderWrapper([
                    this.renderInputGroup(
                        this.renderInput()    
                    ),
                    this.renderIcon(),
                    this.renderHelp()
                ])
           ]);
        };
    }
});

var classSet = function(classNames) {
    if (typeof classNames == 'object') {
        return Object.keys(classNames).filter(function (className) {
            return classNames[className]
        }).join(' ');
    } else {
        return Array.prototype.join.call(arguments,' ');
    }
};

module.exports = Cellinput;
