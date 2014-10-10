(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b2JleW91dGgvcHJvamVjdC9jZWxsLW1vYmlsZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdG9iZXlvdXRoL3Byb2plY3QvY2VsbC1tb2JpbGUvLmJ1aWxkL2Zvcm0vZmFrZV8xMzkzOTM0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2VsbGlucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQ2VsbGlucHV0JyxcbiAgICBcInByb3BUeXBlc1wiOiB7XG4gICAgICAgIFwidHlwZVwiOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBcImxhYmVsXCI6IFJlYWN0LlByb3BUeXBlcy5yZW5kZXJhYmxlLFxuICAgICAgICBcImhlbHBcIjogUmVhY3QuUHJvcFR5cGVzLnJlbmRlcmFibGUsXG4gICAgICAgIFwiYWRkb25CZWZvcmVcIjogUmVhY3QuUHJvcFR5cGVzLnJlbmRlcmFibGUsXG4gICAgICAgIFwiYWRkb25BZnRlclwiOiBSZWFjdC5Qcm9wVHlwZXMucmVuZGVyYWJsZSxcbiAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbihwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTsgIFxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3N1Y2Nlc3MnLCd3YXJuaW5nJywnZXJyb3InXSkuYXBwbHkobnVsbCxhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICBcImhhc0ZlZWRiYWNrXCI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBcImdyb3VwQ2xhc3NOYW1lXCI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFwid3JhcHBlckNsYXNzTmFtZVwiOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBcImxhYmVsQ2xhc3NOYW1lXCI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFwiZGlzYWJsZWRcIjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIFwic3RhdGVcIjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgXCJnZXRJbml0aWFsU3RhdGVcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJnZXRJbnB1dERPTU5vZGVcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQuZ2V0RE9NTm9kZSgpO1xuICAgIH0sXG4gICAgXCJnZXRWYWx1ZVwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW5wdXRET01Ob2RlKCkudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignY2Fubm90IHVzZSBnZXRWYWx1ZSB3aXRob3V0IHNwZWNpZnlpbmcgaW5wdXQgdHlwZScpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgXCJnZXRDaGVja2VkXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJbnB1dERPTU5vZGUoKS5jaGVja2VkO1xuICAgIH0sXG4gICAgXCJjaGFuZ2VIYW5kbGVcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgXCJpc0NoZWNrYm94T3JSYWRpb1wiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudHlwZSA9PT0gJ3JhZGlvJyB8fCB0aGlzLnByb3BzLnR5cGUgPT09ICdjaGVja2JveCc7XG4gICAgfSxcbiAgICBcInJlbmRlcklucHV0XCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaW5wdXQgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgICAgICAgIGlucHV0ID0gKFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00uc2VsZWN0KHtjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIsIHJlZjogXCJpbnB1dFwiLCBrZXk6IFwiaW5wdXRcIn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgICAgICAgICBpbnB1dCA9IChcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRleHRhcmVhKHtjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIsIHJlZjogXCJpbnB1dFwiLCBrZXk6IFwiaW5wdXRcIn0pIFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdGF0aWMnOlxuICAgICAgICAgICAgICAgIGlucHV0ID0gKFxuICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5wKHtjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sLXN0YXRpY1wiLCByZWY6IFwiaW5wdXRcIiwga2V5OiBcImlucHV0XCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgICAgICAgICAgaW5wdXQgPSB0aGlzLnRyYW5zZmVyUHJvcHNUbyhcbiAgICAgICAgICAgICAgICAgICAgQnV0dG9uKHtjb21wb25lbnRDbGFzczogUmVhY3QuRE9NLmlucHV0LCByZWY6IFwiaW5wdXRcIiwga2V5OiBcImlucHV0XCJ9KSAgICAgIFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLmlzQ2hlY2tib3hPclJhZGlvKCkgPyAnJyA6ICdmb3JtLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIYW5kbGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUhhbmRsZSA9IHRoaXMuY2hhbmdlSGFuZGxlO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpbnB1dCA9IFJlYWN0LkRPTS5pbnB1dCh7cGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGNoYW5nZUhhbmRsZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImlucHV0XCJ9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2ZlclByb3BzVG8oaW5wdXQpO1xuICAgIH0sXG4gICAgXCJyZW5kZXJMYWJlbFwiOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFwiY29udHJvbC1sYWJlbFwiOiAhdGhpcy5pc0NoZWNrYm94T3JSYWRpbygpXG4gICAgICAgIH07IFxuICAgICAgICBjbGFzc2VzW3RoaXMucHJvcHMubGFiZWxDbGFzc05hbWVdID0gdGhpcy5wcm9wcy5sYWJlbENsYXNzTmFtZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5sYWJlbCA/IChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCh7aHRtbEZvcjogdGhpcy5wcm9wcy5pZCwgY2xhc3NOYW1lOiBjbGFzc1NldChjbGFzc2VzKSwga2V5OiBcImxhYmVsXCJ9LCBcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5sYWJlbFxuICAgICAgICAgICAgKVxuICAgICAgICApIDogY2hpbGRyZW47XG4gICAgfSxcbiAgICBcInJlbmRlcklucHV0R3JvdXBcIjogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGFkZG9uQmVmb3JlID0gdGhpcy5wcm9wcy5hZGRvbkJlZm9yZSA/IChcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImlucHV0LWdyb3VwLWFkZG9uXCIsIGtleTogXCJhZGRvbkJlZm9yZVwifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkb25CZWZvcmVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIDogbnVsbDtcbiAgICAgICAgdmFyIGFkZG9uQWZ0ZXIgPSB0aGlzLnByb3BzLmFkZG9uQWZ0ZXIgPyAoXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJpbnB1dC1ncm91cC1hZGRvblwiLCBrZXk6IFwiYWRkb25BZnRlclwifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkb25BZnRlclxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkgOiBudWxsO1xuXG4gICAgICAgIHJldHVybiBhZGRvbkJlZm9yZSB8fCBhZGRvbkFmdGVyID8gKFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaW5wdXQtZ3JvdXBcIn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkb25CZWZvcmUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sIFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkb25BZnRlclxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICApIDogY2hpbGRyZW47XG4gICAgfSxcbiAgICBcInJlbmRlcldyYXBwZXJcIjogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMud3JhcHBlckNsYXNzTmFtZSA/IChcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiB0aGlzLnByb3BzLndyYXBwZXJDbGFzc05hbWUsIGtleTogXCJ3cmFwcGVyXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICkgOiBjaGlsZHJlbjtcbiAgICB9LFxuICAgIFwicmVuZGVyQ2hlY2JveEFuZFJhZGlvV3JhcHBlclwiOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFwiY2hlY2tib3hcIjogdGhpcy5wcm9wcy50eXBlID09PSAnY2hlY2tib3gnLFxuICAgICAgICAgICAgXCJyYWRpb1wiOiB0aGlzLnByb3BzLnR5cGUgPT09ICdyYWRpbydcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBjbGFzc1NldChjbGFzc2VzKSwga2V5OiBcImNoZWNrYm94UmFkaW9XcmFwcGVyXCJ9LCBcbiAgICAgICAgICAgICAgICBjaGlsZHJlblxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH0sXG4gICAgXCJyZW5kZXJGb3JtR3JvdXBcIjogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB7XG4gICAgICAgICAgICBcImZvcm0tZ3JvdXBcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaGFzLWZlZWRiYWNrXCI6IHRoaXMucHJvcHMuaGFzRmVlZGJhY2ssXG4gICAgICAgICAgICBcInN1Y2Nlc1wiOiB0aGlzLnByb3BzLnN0YXRlID09PSAnc3VjY2VzcycsXG4gICAgICAgICAgICBcImVycm9yXCI6IHRoaXMucHJvcHMuc3RhdGUgPT09ICdlcnJvcicsXG4gICAgICAgICAgICBcIndhcm5pbmdcIjogdGhpcy5wcm9wcy5zdGF0ZSA9PT0gJ3dhcm5pbmcnXG4gICAgICAgIH07XG5cbiAgICAgICAgY2xhc3Nlc1t0aGlzLnByb3BzLmdyb3VwQ2xhc3NOYW1lXSA9IHRoaXMucHJvcHMuZ3JvdXBDbGFzc05hbWU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogY2xhc3NTZXQoY2xhc3NlcyksICdkYXRhLXN0YXRlJzogdGhpcy5wcm9wcy5zdGF0ZX0sIFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfSxcbiAgICBcInJlbmRlckljb25cIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0ge1xuICAgICAgICAgICAgXCJnbHlwaGljb25cIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZm9ybS1jb250cm9sLWZlZWRiYWNrXCI6IHRydWUsXG4gICAgICAgICAgICBcImdseXBoaWNvbi1zdWNjZXNzXCI6IHRoaXMucHJvcHMuc3RhdGUgPT09ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIFwiZ2x5cGhpY29uLXdhcm5pbmdcIjogdGhpcy5wcm9wcy5zdGF0ZSA9PT0gJ3dhcm5pbmcnLFxuICAgICAgICAgICAgXCJnbHlwaGljb24tZXJyb3JcIjogdGhpcy5wcm9wcy5zdGF0ZSA9PT0gJ2Vycm9yJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmhhc0ZlZWRiYWNrID8gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogY2xhc3NTZXQoY2xhc3NlcyksIGtleTogXCJpY29uXCJ9LCB0aGlzLnByb3BzLnN0YXRlKSAgICBcbiAgICAgICAgKSA6IG51bGw7XG4gICAgfSxcbiAgICBcInJlbmRlckhlbHBcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmhlbHAgPyAoXG4gICAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImhlbHAtYmxvY2tcIiwga2V5OiBcImhlbHBcIn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGVscFxuICAgICAgICAgICAgKVxuICAgICAgICApIDogbnVsbDsgXG4gICAgfSxcbiAgICBcInJlbmRlclwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDaGVja2JveE9yUmFkaW8oKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRm9ybUdyb3VwKFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyV3JhcHBlcihbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3hhbmRSYWRpb1dyYXBwZXIoXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGFiZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcklucHV0KCkgIFxuICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySGVscCgpXG4gICAgICAgICAgICAgICAgXSkgICAgICBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1Hcm91cChbXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMYWJlbCgpLFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyV3JhcHBlcihbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySW5wdXRHcm91cChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySW5wdXQoKSAgICBcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJY29uKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySGVscCgpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgfVxufSk7XG5cbnZhciBjbGFzc1NldCA9IGZ1bmN0aW9uKGNsYXNzTmFtZXMpIHtcbiAgICBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNsYXNzTmFtZXMpLmZpbHRlcihmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lc1tjbGFzc05hbWVdXG4gICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcmd1bWVudHMsJyAnKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENlbGxpbnB1dDtcbiJdfQ==
