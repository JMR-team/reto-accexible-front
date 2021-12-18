import React from "react";

const caseStudies = [
  {
    id: 1,
    subtitle: "Lorem ipsum",
    title: "lorem ipsum asdasdfasdf",
    img: "brain"
  },
  {
    id: 2,
    subtitle: "Lorem ipsum",
    title: "lorem ipsum asdfasdfsaf",
    img: "brain"
  },
  {
    id: 3,
    subtitle: "Lorem ipsum",
    title: "lorem ipsum asdasdfasdf",
    img: "brain"
  }
];

function Cases() {
  return (
    <section className='cases'>
      <div className='container-fluid'>
        <div className='row'>
          {caseStudies.map(caseItem => (
            <div className='case' key={caseItem.id}>
              <div className='case-details'>
                <div className="case-container">
                  <span>{caseItem.subtitle}</span>
                  <h2>{caseItem.title}</h2>
                </div>
              </div>
              <div className='case-image'>
                <img
                  src={require(`../assets/${caseItem.img}.jpg`)}
                  alt={caseItem.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
