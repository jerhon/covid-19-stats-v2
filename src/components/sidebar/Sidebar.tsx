import React from "react";
import { Icon, IconName} from "@blueprintjs/core";
import styles from "./Sidebar.module.css";
import { NavLink} from "react-router-dom";

export interface SidebarLink {
    icon: IconName;
    to: string;
}

export interface SidebarProperties {
    links: SidebarLink[];
}

function SidebarLink({ sidebarLink }: { sidebarLink: SidebarLink }) {
    return (
        <NavLink to={sidebarLink.to}
                 activeClassName={styles.active}
                 exact={true}
                 className={styles.link}>
            <div className={styles.linkContainer}>
                <Icon icon={sidebarLink.icon} iconSize={24} color="#555" />
            </div>
        </NavLink>
    )
}

export function Sidebar( { links } : SidebarProperties ) {
    return (<div className={styles.container}>
        {links.map((l) => <SidebarLink sidebarLink={l} />)}
    </div>)
}