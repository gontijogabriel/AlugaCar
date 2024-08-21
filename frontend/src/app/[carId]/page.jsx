'use client';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

const CarDetailsPage = ({ params }) => {
    const { carId } = params;
    const [carDetails, setCarDetails] = useState(null);
    const [similarCars, setSimilarCars] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalRent, setTotalRent] = useState(0);

    const blockedDates = [];

    const fetchCarDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/cars/${carId}/`);
            setCarDetails(response.data);

            const similarResponse = await axios.get(`http://localhost:8000/api/v1/cars/similar/${carId}/${response.data.type}/`);
            setSimilarCars(similarResponse.data);
        } catch (error) {
            console.error('Error fetching car details or similar cars:', error);
        }
    };

    useEffect(() => {
        fetchCarDetails();
    }, [carId]);

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

    if (!carDetails) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-6">

                <div className="flex-1 lg:w-1/2">
                    <Carousel showThumbs={false} autoPlay infiniteLoop>
                        {carDetails.images.map((image, index) => (
                            <div key={index} className="relative h-80">
                                <img src={image.url} alt={`Car Image ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="flex-1 lg:w-1/2 lg:pl-8">
                    <h1 className="text-3xl font-bold mb-4">{carDetails.model}</h1>
                    <p className="text-lg mb-2"><strong>Marca:</strong> {carDetails.brand}</p>
                    <p className="text-lg mb-2"><strong>Tipo:</strong> {carDetails.type}</p>
                    <p className="text-lg mb-2"><strong>Categoria:</strong> {carDetails.category}</p>
                    <p className="text-lg mb-2"><strong>Descrição:</strong> {carDetails.description}</p>
                    <p className="text-lg mb-2"><strong>Preço por Dia:</strong> R$ {carDetails.day_price}</p>
                    <p className="text-lg mb-2"><strong>Assentos:</strong> {carDetails.seats}</p>
                    <p className="text-lg mb-4"><strong>Quilometragem:</strong> {carDetails.odometer} km</p>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o Período de Aluguel</label>
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
                        <div className="mt-4 text-center">
                            <p className="text-lg font-semibold">Dias Selecionados: {startDate && endDate ? `${Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}` : '0'}</p>
                            <p className="text-lg font-semibold">Valor Total do Aluguel: R$ {totalRent.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Carros Semelhantes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {similarCars.map((car) => (
                        <a href={`${car.id}`} key={car.id} className="block border border-gray-300 rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105">
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
        </div>
    );
};

export default CarDetailsPage;
