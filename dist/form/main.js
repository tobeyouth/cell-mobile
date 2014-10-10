(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var Cellform = require('./form');
var Cellinput = require('./input');
var formExample = (
	Cellform({action: "http://www.baidu.com", method: "post"}, 
		Cellinput({type: "text", 
					label: "Working", 
					addonBefore: "手机号码:", 
					hasFeedback: true})
	)
);

React.renderComponent(formExample,document.getElementById('form-wrapper'));
},{"./form":2,"./input":3}],2:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Cellform = React.createClass({displayName: 'Cellform',
    "render": function () {
        return (
            React.DOM.form({onSubmit: this.subHandle, action: this.props.action, method: this.props.method}, 
            	this.props.children
            )
        );
    },
    "subHandle": function() {
    	
    }
});

module.exports = Cellform;

},{}],3:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Cellinput = React.createClass({displayName: 'Cellinput',
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
                    React.DOM.select({className: "form-control", ref: "input", key: "input"}, 
                        this.props.children
                    )
                );
                break;
            case 'textarea':
                input = (
                    React.DOM.textarea({className: "form-control", ref: "input", key: "input"}) 
                );
                break;
            case 'static':
                input = (
                   React.DOM.p({className: "form-control-static", ref: "input", key: "input"}, 
                        this.props.value
                   )
                );
                break;
            case 'submit':
                input = this.transferPropsTo(
                    Button({componentClass: React.DOM.input, ref: "input", key: "input"})      
                );
                break;
            default:
                var className = this.isCheckboxOrRadio() ? '' : 'form-control',
                    changeHandle = null;
                if (this.props.value) {
                    changeHandle = this.changeHandle;
                };

                input = React.DOM.input({placeholder: this.props.placeholder, 
                                className: className, 
                                value: this.state.value, 
                                onChange: changeHandle, 
                                ref: "input", 
                                key: "input"});
        };

        return this.transferPropsTo(input);
    },
    "renderLabel": function(children) {
        var classes = {
            "control-label": !this.isCheckboxOrRadio()
        }; 
        classes[this.props.labelClassName] = this.props.labelClassName;

        return this.props.label ? (
            React.DOM.label({htmlFor: this.props.id, className: classSet(classes), key: "label"}, 
                children, 
                this.props.label
            )
        ) : children;
    },
    "renderInputGroup": function(children) {
        var addonBefore = this.props.addonBefore ? (
                React.DOM.span({className: "input-group-addon", key: "addonBefore"}, 
                    this.props.addonBefore
                )
            ) : null;
        var addonAfter = this.props.addonAfter ? (
                React.DOM.span({className: "input-group-addon", key: "addonAfter"}, 
                    this.props.addonAfter
                )
            ) : null;

        return addonBefore || addonAfter ? (
                    React.DOM.div({className: "input-group"}, 
                        addonBefore, 
                        children, 
                        addonAfter
                    )
               ) : children;
    },
    "renderWrapper": function(children) {
        return this.props.wrapperClassName ? (
                    React.DOM.div({className: this.props.wrapperClassName, key: "wrapper"}, 
                        children
                    )
               ) : children;
    },
    "renderChecboxAndRadioWrapper": function(children) {
        var classes = {
            "checkbox": this.props.type === 'checkbox',
            "radio": this.props.type === 'radio'
        };

        return (
            React.DOM.div({className: classSet(classes), key: "checkboxRadioWrapper"}, 
                children
            )
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
            React.DOM.div({className: classSet(classes), 'data-state': this.props.state}, 
                children
            )
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
            React.DOM.span({className: classSet(classes), key: "icon"}, this.props.state)    
        ) : null;
    },
    "renderHelp": function() {
        return this.props.help ? (
            React.DOM.span({className: "help-block", key: "help"}, 
                this.props.help
            )
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b2JleW91dGgvcHJvamVjdC9jZWxsLW1vYmlsZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdG9iZXlvdXRoL3Byb2plY3QvY2VsbC1tb2JpbGUvLmJ1aWxkL2Zvcm0vZmFrZV9kNDIwMzNlYy5qcyIsIi9Vc2Vycy90b2JleW91dGgvcHJvamVjdC9jZWxsLW1vYmlsZS8uYnVpbGQvZm9ybS9mb3JtLmpzIiwiL1VzZXJzL3RvYmV5b3V0aC9wcm9qZWN0L2NlbGwtbW9iaWxlLy5idWlsZC9mb3JtL2lucHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQ2VsbGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcbnZhciBDZWxsaW5wdXQgPSByZXF1aXJlKCcuL2lucHV0Jyk7XG52YXIgZm9ybUV4YW1wbGUgPSAoXG5cdENlbGxmb3JtKHthY3Rpb246IFwiaHR0cDovL3d3dy5iYWlkdS5jb21cIiwgbWV0aG9kOiBcInBvc3RcIn0sIFxuXHRcdENlbGxpbnB1dCh7dHlwZTogXCJ0ZXh0XCIsIFxuXHRcdFx0XHRcdGxhYmVsOiBcIldvcmtpbmdcIiwgXG5cdFx0XHRcdFx0YWRkb25CZWZvcmU6IFwi5omL5py65Y+356CBOlwiLCBcblx0XHRcdFx0XHRoYXNGZWVkYmFjazogdHJ1ZX0pXG5cdClcbik7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChmb3JtRXhhbXBsZSxkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS13cmFwcGVyJykpOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2VsbGZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdDZWxsZm9ybScsXG4gICAgXCJyZW5kZXJcIjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmZvcm0oe29uU3VibWl0OiB0aGlzLnN1YkhhbmRsZSwgYWN0aW9uOiB0aGlzLnByb3BzLmFjdGlvbiwgbWV0aG9kOiB0aGlzLnByb3BzLm1ldGhvZH0sIFxuICAgICAgICAgICAgXHR0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcInN1YkhhbmRsZVwiOiBmdW5jdGlvbigpIHtcbiAgICBcdFxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENlbGxmb3JtO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDZWxsaW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdDZWxsaW5wdXQnLFxuICAgIFwicHJvcFR5cGVzXCI6IHtcbiAgICAgICAgXCJ0eXBlXCI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFwibGFiZWxcIjogUmVhY3QuUHJvcFR5cGVzLnJlbmRlcmFibGUsXG4gICAgICAgIFwiaGVscFwiOiBSZWFjdC5Qcm9wVHlwZXMucmVuZGVyYWJsZSxcbiAgICAgICAgXCJhZGRvbkJlZm9yZVwiOiBSZWFjdC5Qcm9wVHlwZXMucmVuZGVyYWJsZSxcbiAgICAgICAgXCJhZGRvbkFmdGVyXCI6IFJlYWN0LlByb3BUeXBlcy5yZW5kZXJhYmxlLFxuICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyAgXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnc3VjY2VzcycsJ3dhcm5pbmcnLCdlcnJvciddKS5hcHBseShudWxsLGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGFzRmVlZGJhY2tcIjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIFwiZ3JvdXBDbGFzc05hbWVcIjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgXCJ3cmFwcGVyQ2xhc3NOYW1lXCI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFwibGFiZWxDbGFzc05hbWVcIjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgXCJkaXNhYmxlZFwiOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgXCJzdGF0ZVwiOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcbiAgICBcImdldEluaXRpYWxTdGF0ZVwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcImdldElucHV0RE9NTm9kZVwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dC5nZXRET01Ob2RlKCk7XG4gICAgfSxcbiAgICBcImdldFZhbHVlXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09PSAnc3RhdGljJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJbnB1dERPTU5vZGUoKS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdjYW5ub3QgdXNlIGdldFZhbHVlIHdpdGhvdXQgc3BlY2lmeWluZyBpbnB1dCB0eXBlJyk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBcImdldENoZWNrZWRcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElucHV0RE9NTm9kZSgpLmNoZWNrZWQ7XG4gICAgfSxcbiAgICBcImNoYW5nZUhhbmRsZVwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdldFZhbHVlKClcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBcImlzQ2hlY2tib3hPclJhZGlvXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50eXBlID09PSAncmFkaW8nIHx8IHRoaXMucHJvcHMudHlwZSA9PT0gJ2NoZWNrYm94JztcbiAgICB9LFxuICAgIFwicmVuZGVySW5wdXRcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMucHJvcHMudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgICAgICAgaW5wdXQgPSAoXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5zZWxlY3Qoe2NsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgcmVmOiBcImlucHV0XCIsIGtleTogXCJpbnB1dFwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICAgICAgICAgIGlucHV0ID0gKFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGV4dGFyZWEoe2NsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgcmVmOiBcImlucHV0XCIsIGtleTogXCJpbnB1dFwifSkgXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0YXRpYyc6XG4gICAgICAgICAgICAgICAgaW5wdXQgPSAoXG4gICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnAoe2NsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wtc3RhdGljXCIsIHJlZjogXCJpbnB1dFwiLCBrZXk6IFwiaW5wdXRcIn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHRoaXMudHJhbnNmZXJQcm9wc1RvKFxuICAgICAgICAgICAgICAgICAgICBCdXR0b24oe2NvbXBvbmVudENsYXNzOiBSZWFjdC5ET00uaW5wdXQsIHJlZjogXCJpbnB1dFwiLCBrZXk6IFwiaW5wdXRcIn0pICAgICAgXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuaXNDaGVja2JveE9yUmFkaW8oKSA/ICcnIDogJ2Zvcm0tY29udHJvbCcsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUhhbmRsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGFuZGxlID0gdGhpcy5jaGFuZ2VIYW5kbGU7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlucHV0ID0gUmVhY3QuRE9NLmlucHV0KHtwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlciwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogY2hhbmdlSGFuZGxlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaW5wdXRcIn0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZmVyUHJvcHNUbyhpbnB1dCk7XG4gICAgfSxcbiAgICBcInJlbmRlckxhYmVsXCI6IGZ1bmN0aW9uKGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0ge1xuICAgICAgICAgICAgXCJjb250cm9sLWxhYmVsXCI6ICF0aGlzLmlzQ2hlY2tib3hPclJhZGlvKClcbiAgICAgICAgfTsgXG4gICAgICAgIGNsYXNzZXNbdGhpcy5wcm9wcy5sYWJlbENsYXNzTmFtZV0gPSB0aGlzLnByb3BzLmxhYmVsQ2xhc3NOYW1lO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmxhYmVsID8gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKHtodG1sRm9yOiB0aGlzLnByb3BzLmlkLCBjbGFzc05hbWU6IGNsYXNzU2V0KGNsYXNzZXMpLCBrZXk6IFwibGFiZWxcIn0sIFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLCBcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxhYmVsXG4gICAgICAgICAgICApXG4gICAgICAgICkgOiBjaGlsZHJlbjtcbiAgICB9LFxuICAgIFwicmVuZGVySW5wdXRHcm91cFwiOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgICB2YXIgYWRkb25CZWZvcmUgPSB0aGlzLnByb3BzLmFkZG9uQmVmb3JlID8gKFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwiaW5wdXQtZ3JvdXAtYWRkb25cIiwga2V5OiBcImFkZG9uQmVmb3JlXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGRvbkJlZm9yZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkgOiBudWxsO1xuICAgICAgICB2YXIgYWRkb25BZnRlciA9IHRoaXMucHJvcHMuYWRkb25BZnRlciA/IChcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImlucHV0LWdyb3VwLWFkZG9uXCIsIGtleTogXCJhZGRvbkFmdGVyXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGRvbkFmdGVyXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGFkZG9uQmVmb3JlIHx8IGFkZG9uQWZ0ZXIgPyAoXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJpbnB1dC1ncm91cFwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRvbkJlZm9yZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRvbkFmdGVyXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICkgOiBjaGlsZHJlbjtcbiAgICB9LFxuICAgIFwicmVuZGVyV3JhcHBlclwiOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy53cmFwcGVyQ2xhc3NOYW1lID8gKFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IHRoaXMucHJvcHMud3JhcHBlckNsYXNzTmFtZSwga2V5OiBcIndyYXBwZXJcIn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgKSA6IGNoaWxkcmVuO1xuICAgIH0sXG4gICAgXCJyZW5kZXJDaGVjYm94QW5kUmFkaW9XcmFwcGVyXCI6IGZ1bmN0aW9uKGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0ge1xuICAgICAgICAgICAgXCJjaGVja2JveFwiOiB0aGlzLnByb3BzLnR5cGUgPT09ICdjaGVja2JveCcsXG4gICAgICAgICAgICBcInJhZGlvXCI6IHRoaXMucHJvcHMudHlwZSA9PT0gJ3JhZGlvJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IGNsYXNzU2V0KGNsYXNzZXMpLCBrZXk6IFwiY2hlY2tib3hSYWRpb1dyYXBwZXJcIn0sIFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcInJlbmRlckZvcm1Hcm91cFwiOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFwiZm9ybS1ncm91cFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJoYXMtZmVlZGJhY2tcIjogdGhpcy5wcm9wcy5oYXNGZWVkYmFjayxcbiAgICAgICAgICAgIFwic3VjY2VzXCI6IHRoaXMucHJvcHMuc3RhdGUgPT09ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIFwiZXJyb3JcIjogdGhpcy5wcm9wcy5zdGF0ZSA9PT0gJ2Vycm9yJyxcbiAgICAgICAgICAgIFwid2FybmluZ1wiOiB0aGlzLnByb3BzLnN0YXRlID09PSAnd2FybmluZydcbiAgICAgICAgfTtcblxuICAgICAgICBjbGFzc2VzW3RoaXMucHJvcHMuZ3JvdXBDbGFzc05hbWVdID0gdGhpcy5wcm9wcy5ncm91cENsYXNzTmFtZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBjbGFzc1NldChjbGFzc2VzKSwgJ2RhdGEtc3RhdGUnOiB0aGlzLnByb3BzLnN0YXRlfSwgXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9LFxuICAgIFwicmVuZGVySWNvblwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB7XG4gICAgICAgICAgICBcImdseXBoaWNvblwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmb3JtLWNvbnRyb2wtZmVlZGJhY2tcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZ2x5cGhpY29uLXN1Y2Nlc3NcIjogdGhpcy5wcm9wcy5zdGF0ZSA9PT0gJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgXCJnbHlwaGljb24td2FybmluZ1wiOiB0aGlzLnByb3BzLnN0YXRlID09PSAnd2FybmluZycsXG4gICAgICAgICAgICBcImdseXBoaWNvbi1lcnJvclwiOiB0aGlzLnByb3BzLnN0YXRlID09PSAnZXJyb3InXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGFzRmVlZGJhY2sgPyAoXG4gICAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBjbGFzc1NldChjbGFzc2VzKSwga2V5OiBcImljb25cIn0sIHRoaXMucHJvcHMuc3RhdGUpICAgIFxuICAgICAgICApIDogbnVsbDtcbiAgICB9LFxuICAgIFwicmVuZGVySGVscFwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVscCA/IChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwiaGVscC1ibG9ja1wiLCBrZXk6IFwiaGVscFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWxwXG4gICAgICAgICAgICApXG4gICAgICAgICkgOiBudWxsOyBcbiAgICB9LFxuICAgIFwicmVuZGVyXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94T3JSYWRpbygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtR3JvdXAoXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJXcmFwcGVyKFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveGFuZFJhZGlvV3JhcHBlcihcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMYWJlbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySW5wdXQoKSAgXG4gICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIZWxwKClcbiAgICAgICAgICAgICAgICBdKSAgICAgIFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRm9ybUdyb3VwKFtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxhYmVsKCksXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJXcmFwcGVyKFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJbnB1dEdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJbnB1dCgpICAgIFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckljb24oKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIZWxwKClcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICBdKTtcbiAgICAgICAgfTtcbiAgICB9XG59KTtcblxudmFyIGNsYXNzU2V0ID0gZnVuY3Rpb24oY2xhc3NOYW1lcykge1xuICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY2xhc3NOYW1lcykuZmlsdGVyKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWVzW2NsYXNzTmFtZV1cbiAgICAgICAgfSkuam9pbignICcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuam9pbi5jYWxsKGFyZ3VtZW50cywnICcpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2VsbGlucHV0O1xuIl19
