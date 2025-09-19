import Image from "next/image";
import './stack_cards.scss';

export default function Stack_Cards() {

    return (
        <section className="full__screen stack__cards">
            <div className="container">
                {cards.map((card, index) => (
                    <div className={`row stack__card`} key={index}>
                        <div className="col-md-6 stack__card_image">
                            <figure>
                                <Image
                                    src={card.img}
                                    alt={card.title}
                                    width={600}
                                    height={600}
                                />
                            </figure>
                        </div>
                        <div className="col-md-6 content_block">
                            <div className="title">
                                <h3>{card.title}</h3>
                            </div>
                            <div className="content">
                                <p>{card.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

const cards = [
    {
        img: '/img/fork-lift.jpg',
        title: 'Compressed Air Solutions',
        subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
        link: '#',
    },
    {
        img: '/img/car-parking.jpg',
        title: 'Material Handling Equipment',
        subtitle: 'Advanced farming solutions for a sustainable future',
        link: '#',
    },
    {
        img: '/img/auto-mobile-equipment.jpg',
        title: 'Automobile Maintenance Equipment',
        subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
        link: '#',
    },
    {
        img: '/img/car-parking.jpg',
        title: 'Car Parking Solutions',
        subtitle: 'Advanced farming solutions for a sustainable future',
        link: '#',
    },
    {
        img: '/img/fork-lift.jpg',
        title: 'Elevators & Escalators',
        subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
        link: '#',
    },
    {
        img: '/img/auto-mobile-equipment.jpg',
        title: 'Welding Products',
        subtitle: 'Advanced farming solutions for a sustainable future',
        link: '#',
    },
    {
        img: '/img/fork-lift.jpg',
        title: 'After Care & Rental',
        subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
        link: '#',
    },
    {
        img: '/img/auto-mobile-equipment.jpg',
        title: 'Solar Systems',
        subtitle: 'Advanced farming solutions for a sustainable future',
        link: '#',
    },
    // Add more card data as needed
];