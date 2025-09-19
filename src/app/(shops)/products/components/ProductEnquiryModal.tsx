import ProductEnquiryForm from "./ProductEnquiryForm";
import './ProductEnquiryModal.scss';

export default function ProductEnquiryModal() {
  return (
    <div role="dialog" tabIndex={-1} aria-modal="true" id="modal-prd-enquire" className="modal fade product-enquiry-form">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content text-center">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
            <h2 className="mb-3 text-start">Interested in Compact series screw?</h2>
            <p className="lead mb-6 text-start">Send us your enquiry and our team will get back to you with the best deal and quick answers to help you purchase with confidence.</p>
            <ProductEnquiryForm product="Compact series screw" />
          </div>
        </div>
      </div>
    </div>
  );
}
