import { Fragment, ReactNode } from 'react';

import './accordian.scss';

interface AccordionElementProps {
    title: string;
    children: ReactNode;
    id: string;
    parentId: string;
    defaultOpen?: boolean;
}

export default function AccordionElement({
    title,
    children,
    id,
    parentId,
    defaultOpen = false
}: AccordionElementProps) {
    return (
        <Fragment>
            <div className="accordion-item card">
                <div className="card-header">
                    <button
                        className={`accordion-button ${defaultOpen ? "" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${id}`}
                        aria-expanded={defaultOpen}
                        aria-controls={id}
                    >
                        {title}
                    </button>
                </div>
                <div
                    id={id}
                    className={`accordion-collapse collapse ${defaultOpen ? "show" : ""}`}
                    data-bs-parent={`#${parentId}`}
                >
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}