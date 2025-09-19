"use client";

import { FormEvent, useState, useEffect, Fragment } from "react";
import validator from "validator";

interface ProductEnquiryFormProps {
  product: string; // passed dynamically
}

export default function ProductEnquiryForm({ product }: ProductEnquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    const enquiryData = {
      name,
      email,
      phone,
      product,
      message,
    };

    console.log("Enquiry Submitted:", enquiryData);

    // Optional: Send data to API here
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="text-start mb-3">
        <div className="form-floating mb-4">
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating mb-4">
          <input
            id="email"
            type="email"
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          {emailError && <div className="invalid-feedback">{emailError}</div>}
        </div>

        <div className="form-floating mb-4">
          <input
            id="phone"
            type="tel"
            className="form-control"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="phone">Phone Number</label>
        </div>

        <div className="form-floating mb-4">
          <textarea
            id="message"
            className="form-control"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ height: "150px" }}
          />
          <label htmlFor="message">Message</label>
        </div>

        <button type="submit" className="btn btn-primary rounded-pill w-100">
          Submit
        </button>
      </form>
    </Fragment>
  );
}
