/_ src/components/ToggleSwitch/index.js 

import PropTypes from 'prop-types';
import classnames from 'classnames';
import isString from 'lodash/isString';
import React, {Components} from 'react';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';

import "./index.css";

class ToggleSwitch extends Components{
    state = {enabled:this.enabledFromProps()}

    isEnabled = () => this.state.enabled
    
    // This Method resolves the enabled prop that was passed as a boolean  
    enabledFromProps(){
        let{enabled} = this.props;

        enabled = isFunction(enabled) ? enabled() : enabled;

        return isBoolean(enabled) && enabled;
    }

    toggleSwitch = evt => {
        evt.persist();
        evt.perventDefault();

        const {onClick, onStateChanged} = this.props;

        this.setState({enabled: !this.state.enabled},() => {
            const state = this.state;

            const switchEvent = Object.assign(evt, {SWITCH_STATE: state});

            isFunction(onClick) && onClick(switchEvent);
            isFunction(onStateChanged) && onStateChanged(state);
        });
    }

    render(){
        const { enabled } = this.state;

        // Isolate special props and store the remaining as restProps

        const { enabled: _enabled,theme,onClick,className, onStateChanged, ...restPorps } = this.props;

        const switchTheme = (theme && isString(theme)) ? theme : 'default';

        const switchClasses = classnames(
            `switch switch--${switchTheme}`,
            className
        )

        const toggleClasses = classnames(
            'switch-toogle',
            `switch-toggle--${enabled? 'on' : 'off'}`
        )

        return(
            <div className = {switchClasses} onClick = {this.toggleSwitch} {...restPorps}>
                <div className = {toggleClasses}></div>
            </div>
        )
    }
}

ToggleSwitch.propTypes = {
    // Indicating the style and color to be used for the Toggle Switch
    theme:PropTypes.string,
    // Can be either a boolean or a function that returns a boolean
    enabled: ProppTypes.oneOfType([
        ProppTypes.bool,
        ProppTypes.func
    ]),
    // CallBack Function changes the state of the toggle
    onStateChanged: ProppTypes.func
}

export default ToggleSwitch;