import { useForm, Resolver } from "react-hook-form"

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <section className="wrapper">
            <div className="container">
                <div className="row justify-content-md-center mb-12">
                    <div className="col-md-8 text-center">
                        <h2>Title</h2>
                        <p>Description</p>
                    </div>
                </div>

                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <form className="contact-form needs-validation" method="post">
                            <div className="messages"></div>
                            <div className="row gx-4">
                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input required type="text" name="name" id="form_name" placeholder="Jane" className="form-control" />

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input required type="text" name="surname" placeholder="Doe" id="form_lastname" className="form-control" />

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating mb-4">
                                        <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-select-wrapper mb-4">
                                        <input type="tel" placeholder="Mobile number" {...register("Mobile number", { required: true, minLength: 6, maxLength: 12 })} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-select-wrapper mb-4">
                                        <select className="form-select" id="form-select" name="department" required>
                                            <option disabled value="">
                                                Select a department
                                            </option>
                                            <option value="Sales">Sales</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Customer Support">Customer Support</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating mb-4">
                                        <textarea
                                            required
                                            name="message"
                                            id="form_message"
                                            className="form-control"
                                            placeholder="Your message"
                                            style={{ height: 150 }}
                                        />

                                    </div>
                                </div>

                                <div className="col-12 text-center">
                                    <input type="submit" value="Send message" className="btn btn-primary rounded-pill btn-send mb-3" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
