import React from 'react';
import './App.css';
import {Layout} from "./components/Layout";
import {BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import { applyMiddleware, createStore} from "redux";
import {createReducers} from "./store/Create";
import {Sidebar, SidebarLink} from "./components/sidebar/Sidebar";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {NationChartPage} from "./components/nationchart/NationChartPage";


const store = createStore(createReducers(),
    composeWithDevTools(applyMiddleware(thunk)));

function App() {

    const links: SidebarLink[] = [
        { icon: "chart", to: "/" },
        // { icon: "map", to: "/map"}
    ];

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout sidebar={<Sidebar links={links} />}>
                    <NationChartPage />
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;