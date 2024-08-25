'use client'

import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { getCars } from '@/services/api';


export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars()
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
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <a href={`${car.id}`} key={car.id} className="block border border-gray-300 rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105 bg-white">
              <img src={car.image.url} alt={car.model} className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="text-lg font-semibold mb-2">{car.model}</p>
                <p className="text-gray-600 mb-1">{car.brand}</p>
                <p className="text-gray-600">R$ {car.day_price} / dia</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
