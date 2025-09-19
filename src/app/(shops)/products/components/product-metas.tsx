import { Fragment } from "react";

// CUSTOM DATA
import data from "data/product-details-page";
import Accordion from "@/components/reuseable/accordion";
import AccordionElement from "@/components/reuseable/accordion/accordian";

export default function ProductMetas() {
    return (
        <Fragment>


            <div className="accordion-wrapper product__meta" id="accordionExample">
                <AccordionElement
                    title="Specification"
                    id="product-specs"
                    parentId="accordionExample"
                    defaultOpen={false}
                >
                    <table className="table table-hover table-responsive">
                        <tbody>
                            {data.metaList.map(({ id, title, description }, i) => (
                                <tr key={id}>
                                    <td>{title}</td>
                                    <td>{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </AccordionElement>

                <AccordionElement
                    title="Second Accordion"
                    id="collapseTwo"
                    parentId="accordionExample"
                >
                    <p>This is another content block inside the accordion.</p>
                </AccordionElement>
            </div>


        </Fragment>
    );
}