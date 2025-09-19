import { Fragment } from "react";

import './product-factsheet.scss';

export default function ProductFactSheet() {
    return (
        <Fragment>
            <p className="mb-6" style={{ display: "flex" }}>
                <a className="factsheet-link" href="#" style={{ display: "flex" }}>
                    <span className="top-key"></span>
                    <span className="text">FACTSHEET</span>
                    <span className="bottom-key-1"></span>
                    <span className="bottom-key-2"></span>
                </a>
            </p>
        </Fragment>
    );
}