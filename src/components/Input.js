import React, {Component} from "react";

export default class Input extends Component {

    constructor() {

        super()

    }

    render() {

        return <input {...this.props}/>

    }

}