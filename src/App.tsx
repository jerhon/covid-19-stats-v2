import React from 'react';
import './App.css';
import {Layout} from "./components/Layout";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import {Provider} from "react-redux";
import { applyMiddleware, createStore} from "redux";
import {createReducers} from "./store/Create";
import {Sidebar, SidebarLink} from "./components/sidebar/Sidebar";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {NationChartPage} from "./components/nationchart/NationChartPage";
import {NationMapPage} from "./components/nationmap/NationMapPage";


const store = createStore(createReducers(),
    composeWithDevTools(applyMiddleware(thunk)));

function App() {

    const links: SidebarLink[] = [
        { icon: "chart", to: "/", label: "Chart" },
        { icon: "map", to: "/map", label: "Map" }
    ];

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout sidebar={<Sidebar links={links} />}>
                    <Switch>
                        <Route path="/" exact component={NationChartPage} />
                        <Route path="/map" exact component={NationMapPage} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;