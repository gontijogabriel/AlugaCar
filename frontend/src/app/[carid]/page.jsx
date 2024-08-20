'use client';
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CarPage = ({ params }) => {
    const { carid } = params;
    const [car, setCar] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        if (carid) {
            fetch(`http://localhost:8000/api/v1/cars/${carid}/`)
                .then((response) => response.json())
                .then((data) => {
                    setCar(data);
                    return fetch(`http://localhost:8000/api/v1/cars/similar/${carid}/${data.type}`);
                })
                .then((response) => response.json())
                .then((similarData) => {
                    console.log("Similar Data:", similarData);
                    setSimilar(Array.isArray(similarData) ? similarData : []);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [carid]);

    if (!car) {
        return <div>Loading...</div>;
    }

    const isAvailable = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return availableDates.includes(dateString);
    };

    return (
        <main>
            <div>
                <div key={car.id}>
                    <h3>{car.model}</h3>
                    <p>{car.brand}</p>
                    <p>{car.day_price}</p>
                    <p>{car.type}</p>
                    <p>{car.category}</p>
                    <p>{car.seats}</p>
                    <p>{car.odometer}</p>
                </div>
            </div>
            
            <Calendar
                tileDisabled={({ date, view }) => 
                    view === 'month' && !isAvailable(date)
                }
            />

            <h2>Similares</h2>

            <div>
                {similar.map((scar) => (
                    <div key={scar.id}>
                        <h3>{scar.model}</h3>
                        <p>{scar.day_price}</p>
                        <a href={scar.id}>Alugar</a>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default CarPage;
