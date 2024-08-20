'use client'

import { useEffect, useState } from 'react';


export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchCars = async () => {
          try {
              const response = await fetch('http://127.0.0.1:8000/api/v1/cars/');
              const data = await response.json();
              setCars(data);
          } catch (error) {
              console.error("Erro ao buscar os carros:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchCars();
  }, []);

  if (loading) {
      return <p>Carregando...</p>;
  }

  return (
    <main className="">
      ALUGACAR

      <div className=''>
        {cars.map((car) => (
            <div key={car.id}>
              <img width={300} src={car.image.url} alt={car.model}/>
              <h3>{car.model}</h3>
              <p>{car.day_price}</p>

              <a href={car.id}>Alugar</a>
            </div>
        ))}
      </div>

    </main>
  );
}
