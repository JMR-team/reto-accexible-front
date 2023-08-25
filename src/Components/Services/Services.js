import React from 'react';
import "./Services.css"

export default function Services({image, title, text}) {
    return (
        <div className="servicesSection">
            <div className="service">
                <div className="service-content">
                    <img src={image} alt=""/>
                    <h5 className="s-title">{title}</h5>
                    <p className="s-text">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
}
