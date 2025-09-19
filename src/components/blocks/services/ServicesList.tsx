import { ServiceCard1 } from "components/reuseable/service-cards";
// CUSTOM DATA
import { servicesList } from "data/service";

export default function Services1() {
  return (
    <section className="wrapper bg-light">
      <div className="container pt-14 pt-md-16">
        <div className="row text-center">
          <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <h3 className="display-4 mb-10 px-xl-10">
              The service we offer is specifically designed to meet your needs.
            </h3>
          </div>
        </div>

        <div className="position-relative">          

          <div className="row gx-md-5 gy-5 text-center">
            {servicesList.map((item) => (
              <ServiceCard1
                key={item.id}
                Icon={item.icon}
                title={item.title}
                linkUrl={item.link}
                linkType={item.linkType}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
