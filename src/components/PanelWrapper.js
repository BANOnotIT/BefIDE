import React, {Component} from "react";
import PropTypes from "prop-types";
import "../styles/PanelWrapper.sass";

export default class Wrapper extends Component {

    constructor() {

        super();

        console.log(arguments);

        this.registerPanel = this.registerPanel.bind(this);

        this.state = {
            panels: []
        }
    }

    getChildContext() {
        return {
            registerPanel: this.registerPanel,
            direction: this.props.dir
        }
    }

    registerPanel(handler, init = -1, id) {

        let sizer = {
            get size() {
                return init;
            },
            set size(value) {

                if (value !== init)
                    handler(init = value);

                return value

            },
            id,
            next: undefined,
            prev: undefined
        };

        this.setState(state => ({
            panels: [
                ...state.panels, sizer
            ]
        }), () => {
            if ([].concat(this.props.children).length === this.state.panels.length)
                this.recountAllPanels();
        });
    }

    recountAllPanels() {

        let
            unknown = [],
            all = 1;

        this.state.panels.forEach((el, i, panels) => {
            if (el.size === -1 || all < el.size)
                unknown.push(el);
            else
                all -= el.size;

            if (i < panels.length)
                el.next = panels[i + 1];

            if (0 < i)
                el.prev = panels[i - 1];

        });


        let size = all / Math.max(1, unknown.length);

        unknown.forEach(el => el.size = size);

    }

    render() {

        return (
            <div
                className={["panel-wrapper", this.props.dir, this.props.className || ''].join(" ")}
                style={{...this.props.style}}
            >
                {this.props.children}
            </div>
        )
    }

}

Wrapper.childContextTypes = {
    registerPanel: PropTypes.func,
    direction: PropTypes.string
};

Wrapper.propTypes = {
    dir: PropTypes.string
};

Wrapper.defaultProps = {
    dir: "row"
};
