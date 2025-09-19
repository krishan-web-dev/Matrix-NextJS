import './team.scss';

export default function Team() {
    return (
        <section className="full__screen team__members">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="creative-title--wrap">
                            <span className="creative-subtitle">Our Team, Your Success</span>
                            <h2 className="creative-title">
                                At Matrix Pvt Ltd, our team is dedicated to innovation, excellence, and your success. With expertise and passion, we work together to deliver solutions that drive growth and value.
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="row">

                    {teams.map((team, index) => (
                        <div className="col-md-3 creative-team--block" key={index}>
                            <div className="inner-box">
                                <div className="image-box">
                                    <figure className="image">
                                        <img src={team.image} alt={team.name} />
                                    </figure>
                                    <div className="info-box">
                                        <h4 className="name">{team.name}</h4>
                                        <span className="designation">{team.designation}</span>
                                        <span className="share-icon">
                                            <i className="uil uil-share-alt"></i>
                                        </span>
                                        <p>{team.description}</p>
                                        <div className="social-links">
                                            <a href={team.twitterUrl} aria-label="Twitter">
                                                <i className="uil uil-twitter-alt"></i>
                                            </a>
                                            <a href={team.facebookUrl} aria-label="Facebook">
                                                <i className="uil uil-facebook-f"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

const teams = [
    {
        id: 1,
        name: 'Coriss Ambady',
        image: '/img/avatars/t1.jpg',
        designation: 'CEO',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    },
    {
        id: 2,
        name: 'Cory Zamora',
        image: '/img/avatars/t2.jpg',
        designation: 'General Manager',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    },
    {
        id: 3,
        name: 'Nikolas Brooten',
        image: '/img/avatars/t3.jpg',
        designation: 'Sales Manager',
        dribbbleUrl: 'https://dribbble.com',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    },
    {
        id: 4,
        name: 'Jackie Sanders',
        image: '/img/avatars/t4.jpg',
        designation: 'IT Manager',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    },
    {
        id: 5,
        name: 'Cory Smith',
        image: '/img/avatars/t5.jpg',
        designation: 'Project Manager',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    },
    {
        id: 1,
        name: 'Coriss Ambady',
        image: '/img/avatars/t1.jpg',
        designation: 'CEO',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    },
    {
        id: 2,
        name: 'Cory Zamora',
        image: '/img/avatars/t2.jpg',
        designation: 'General Manager',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    },
    {
        id: 3,
        name: 'Nikolas Brooten',
        image: '/img/avatars/t3.jpg',
        designation: 'Sales Manager',
        dribbbleUrl: 'https://dribbble.com',
        twitterUrl: 'https://www.twitter.com',
        facebookUrl: 'https://www.facebook.com',
        description: 'Fermentum massa justo sit amet risus morbi leo.'
    }
];