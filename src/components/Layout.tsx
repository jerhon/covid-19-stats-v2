import styles from "./Layout.module.css";
import React from "react";

export interface LayoutProperties {
    sidebar: JSX.Element;
    children: string | JSX.Element | (string | JSX.Element)[];
}

export function Layout({ sidebar, children }: LayoutProperties) {

    /*
        <Navbar className="bp3-dark" >
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>COVID-19 Statistics</Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>

                </Navbar.Group>
            </Navbar>
            */

    return (<div className={styles.layout}>
        <div className={styles.header}>

        </div>
        <div className={styles.main}>
            <div className={styles.sidebar}>
                {sidebar}
            </div>
            <div className={styles.content}>
                <div>
                    <h1>COVID-19 Statistics Application</h1>
                </div>
                {children}
            </div>
        </div>
    </div>);
}