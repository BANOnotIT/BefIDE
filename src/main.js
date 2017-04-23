import React from "react";
import ReactDOM from "react-dom";
import Wrapper from "./components/PanelWrapper";
import Panel from "./components/Panel";
import "./styles/main.sass";

class App extends React.Component {

    render() {
        return (
            <Wrapper dir="column">
                <Panel>
                    <Wrapper>
                        <Panel size={.3}>
                            <div>
                                <div style={{background: 'red', width: 1000 + 'px', height: 1000 + 'px'}}>asdf</div>
                            </div>
                        </Panel>
                        <Panel>
                            <div>
                                test2
                            </div>
                        </Panel>
                        <Panel>
                            <div>test3</div>
                        </Panel>
                        <Panel size={.5}>
                            <div>test4</div>
                        </Panel>
                    </Wrapper>
                </Panel><Panel>
                <div>test</div>
            </Panel>
            </Wrapper>

        )
    }

}


// Render it to DOM
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
