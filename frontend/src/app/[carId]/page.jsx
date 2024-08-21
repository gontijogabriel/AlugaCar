'use client';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

const useCarDetails = (carId) => {
    const [carDetails, setCarDetails] = useState(null);
    const [similarCars, setSimilarCars] = useState([]);


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/cars/${carId}/`);
                setCarDetails(response.data);

                const similarResponse = await axios.get(`http://localhost:8000/api/v1/cars/similar/${carId}/${response.data.type}/`);
                setSimilarCars(similarResponse.data);
            } catch (error) {
                console.error('Error fetching car details or similar cars:', error);
            }
        };

        fetchDetails();
    }, [carId]);

    return { carDetails, similarCars };
};

const CarDetailsPage = ({ params }) => {
    const { carId } = params;
    const { carDetails, similarCars } = useCarDetails(carId);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalRent, setTotalRent] = useState(0);
    const [blockedDates, setBlockedDates] = useState([]);

    const isDateBlocked = (date) => {
        return blockedDates.some(blockedDate => date.toDateString() === blockedDate.toDateString());
    };

    const handleSelect = (dates) => {
        const [start, end] = dates;

        if (start && end) {
            let isValidRange = true;
            let currentDate = new Date(start);

            while (currentDate <= end) {
                if (isDateBlocked(currentDate)) {
                    isValidRange = false;
                    break;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            if (!isValidRange) {
                alert('O intervalo selecionado inclui datas bloqueadas. Por favor, escolha outro intervalo.');
                setStartDate(null);
                setEndDate(null);
                setTotalRent(0);
                return;
            }
        }

        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        if (startDate && endDate) {
            const timeDifference = Math.abs(endDate - startDate);
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
            setTotalRent(dayDifference * parseFloat(carDetails?.day_price || 0));
        } else {
            setTotalRent(0);
        }
    }, [startDate, endDate, carDetails]);

    useEffect(() => {
        if (carDetails && carDetails.rentals) {
            const blocked = [];

            carDetails.rentals.forEach(rental => {
                let currentDate = new Date(rental.start_date);
                const endDate = new Date(rental.end_date);

                while (currentDate <= endDate) {
                    blocked.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            });

            setBlockedDates(blocked);
        }
    }, [carDetails]);

    if (!carDetails) return (
        <Loading />
    );
    

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 lg:px-8 py-6">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">{carDetails.model}</h1>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 lg:w-1/2">
                        <Carousel showThumbs={false} autoPlay infiniteLoop>
                            {carDetails.images.map((image, index) => (
                                <div key={index} className="relative h-80">
                                    <img src={image.url} alt={`Car Image ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-lg" />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    <div className="flex-1 lg:w-1/2 lg:pl-8">
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                            <div className="text-lg"><strong>Marca:</strong> {carDetails.brand}</div>
                            <div className="text-lg"><strong>Tipo:</strong> {carDetails.type}</div>
                            <div className="text-lg"><strong>Categoria:</strong> {carDetails.category}</div>
                            <div className="text-lg"><strong>Preço / Dia:</strong> R$ {carDetails.day_price}</div>
                            <div className="text-lg"><strong>Assentos:</strong> {carDetails.seats}</div>
                            <div className="text-lg"><strong>Km:</strong> {carDetails.odometer}</div>
                        </div>

                        <div className="mt-6 flex sm:flex-row flex-col gap-4 w-full">
                            <div className="flex justify-center">
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleSelect}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    excludeDates={blockedDates}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholderText="Escolha um intervalo de datas"
                                    inline
                                />
                            </div>

                            {startDate && endDate ? (
                                <div className="flex-1 lg:flex-col text-center lg:text-left">
                                    <div className="mb-4 w-full">
                                        <p><strong>Data de Início:</strong> {startDate.toLocaleDateString()}</p>
                                        <p><strong>Data de Fim:</strong> {endDate.toLocaleDateString()}</p>
                                        <p><strong>Número de Dias:</strong> {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}</p>
                                        <p><strong>Preço Total:</strong> R$ {totalRent.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            alert(`Aluguel confirmado! Preço total: R$ ${totalRent.toFixed(2)}`);
                                        }}
                                        className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        disabled={!startDate || !endDate}
                                    >
                                        Alugar
                                    </button>
                                </div>
                            ) : (
                                <h1 className='mb-4 w-full'>Selecione uma data de início e outra de fim</h1>
                            )}


                        </div>
                    </div>
                </div>

                <p className="text-lg mb-2 p-4">{carDetails.description}</p>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Carros Semelhantes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {similarCars.map((car) => (
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
                </div>
            </main>
        </>
    );
};

export default CarDetailsPage;
