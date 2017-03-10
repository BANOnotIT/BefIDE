import React, {Component} from "react";
import Input from "./Input";


export default class App extends Component {

    constructor() {

        super()

    }

    componentDidMount() {

        document.addEventListener('keydown', function (event) {
            console.log(event);
        }, true)

    }

    render() {

        console.log(this.props);
        return (
            <div>
                hello
                <Input onChange={e => console.log(e)}/>
            </div>
        )

    }

}