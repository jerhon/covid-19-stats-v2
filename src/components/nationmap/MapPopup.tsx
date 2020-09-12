import React from "react";
import styles from "./MapPopup.module.css";

export interface MapPopupProperties {
    x: number;
    y: number;
    children: JSX.Element | JSX.Element[];
    visible: boolean;
}

export function MapPopup({ x, y, children, visible }: MapPopupProperties) {
    return (<div className={styles.base} style={{ top: 0, left: 0, display: visible ? 'block' : 'none', transform: `translate(${x}px, ${y}px)`, transition: 'transform 250ms ease-out', position: "absolute", zIndex: 100 }}>
        {children}
    </div>);
}

