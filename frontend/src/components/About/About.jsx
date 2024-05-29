import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="firstConatiner">
      <div className="text">
        <div>
          <h1>Proyecto Final - Electiva II</h1>
          <h2>Integrantes</h2>
          <ul>
            <li>Edwin Camilo Becerra Meche - 202023070</li>
            <li>Santiago Andres Orjuela López - 202114334</li>
            <li>Laura Vanesa Fernandez Barreto - 202115100</li>
          </ul>
        </div>
      </div>
      <div className="image">
        <img
          src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-2.svg"
          alt="icesi"
        />
      </div>
    </div>
  );
};

export default About;
