import styles from "./Layout.module.css";
import React from "react";
import {Alignment, Navbar} from "@blueprintjs/core";

export interface LayoutProperties {
    sidebar: JSX.Element;
    children: string | JSX.Element | (string | JSX.Element)[];
}

export function Layout({ sidebar, children }: LayoutProperties) {

    return (<div className={styles.containerArea}>
        <div className={styles.headerArea}>
            <Navbar className="bp3-dark" >
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>COVID-19 Statistics</Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>

                </Navbar.Group>
            </Navbar>
        </div>
        <div className={styles.rightMainArea}>
            <div className={styles.leftSidebarArea}>
                {sidebar}
            </div>
            <div className={styles.contentArea}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    </div>);
}