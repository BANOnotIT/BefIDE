import React, {Component} from "react";
import PropTypes from "prop-types";

let count = 0;

export default class Panel extends Component {

    constructor({size}) {

        super();

        this.state = {registered: false, size: size};

        this.panelId = count++;

    }

    componentDidMount() {
        this.context.registerPanel(size => this.setState({size}), this.state.size, this.panelId);
        this.setState({registered: true})
    }

    componentWillUnmount() {
        this.context.forgotPanel(this.panelId);
    }

    render() {

        console.log(this.props.children.className);

        const child = React.Children.only(this.props.children);

        return React.cloneElement(
            child,
            {
                style: {
                    ...child.props.style,
                    [(({row: "width", column: "height"})[this.context.direction])]: this.state.size * 100 + '%'
                },
                className: ["panel"].concat(child.props.className).filter(a => a).join(" ")
            }
        )


    }
}

Panel.contextTypes = {
    registerPanel: PropTypes.func,
    forgotPanel: PropTypes.func,
    direction: PropTypes.string
};

Panel.propTypes = {
    size: PropTypes.number
};
Panel.defaultProps = {size: -1};
