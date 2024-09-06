'use client';
import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from 'date-fns/locale';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Loading from '@/components/Loading';
import { getDetailCar } from '@/services/api';
import CarSimpleCard from '@/components/CarSimpleCard';

const useCarDetails = (carId) => {
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getDetailCar(carId);
        setCarDetails(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do carro:', error);
      }
    };

    fetchDetails();
  }, [carId]);

  return { carDetails };
};

const CarDetailsPage = ({ params }) => {
  const { carId } = params;
  const { carDetails } = useCarDetails(carId);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalRent, setTotalRent] = useState(0);
  const [blockedDates, setBlockedDates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isDateBlocked = (date) => {
    return blockedDates.some((blockedDate) => date.toDateString() === blockedDate.toDateString());
  };

  const handleDateChange = (newDate, isStart) => {
    setErrorMessage('');
    if (isStart) {
      setStartDate(newDate);
      if (newDate && endDate && newDate > endDate) {
        setErrorMessage('A data de início não pode ser posterior à data de fim.');
        setStartDate(null);
        setTotalRent(0);
      }
    } else {
      setEndDate(newDate);
      if (startDate && newDate && newDate < startDate) {
        setErrorMessage('A data de fim não pode ser anterior à data de início.');
        setEndDate(null);
        setTotalRent(0);
      }
    }
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

      carDetails.rentals.forEach((rental) => {
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

  if (!carDetails) return <Loading />;

  const similarCars = carDetails.similars;

  return (
    <main className="container mx-auto px-4 lg:px-8 py-6">
      <nav aria-label="breadcrumb">
        <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400 mb-4">
          <li className="pr-4"><a href="/">Home</a></li>
          <li className="px-4"><a href="/cars">Carros</a></li>
          <li className="px-4 text-gray-700" aria-current="page">{carDetails.model}</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-4 text-gray-800">{carDetails.model}</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 lg:w-1/2">
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {carDetails.images.map((image, index) => (
              <div key={index} className="relative h-80">
                <img src={image.url} alt={`Imagem do carro ${carDetails.model}`} className="w-full h-full object-cover rounded-lg shadow-lg" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex-1 lg:w-1/2 lg:pl-8">
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
            <div className="text-lg"><strong>Marca:</strong> {carDetails.brand}</div>
            <div className="text-lg"><strong>Tipo:</strong> {carDetails.type}</div>
            <div className="text-lg"><strong>Categoria:</strong> {carDetails.category}</div>
            <div className="text-lg"><strong>Preço / Dia:</strong> R$ {carDetails.day_price}</div>
            <div className="text-lg"><strong>Assentos:</strong> {carDetails.seats}</div>
            <div className="text-lg"><strong>Km:</strong> {carDetails.odometer}</div>
          </div>

          <section className="mt-6">
            <Typography variant="h6" component="h2" className="mb-2">Selecione as Datas</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <Box display="flex" gap={2} alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} mt={2}>
                <DatePicker
                  label="Data de Início"
                  value={startDate}
                  onChange={(newDate) => handleDateChange(newDate, true)}
                  disablePast
                  shouldDisableDate={isDateBlocked}
                  renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                />
                <DatePicker
                  label="Data de Fim"
                  value={endDate}
                  onChange={(newDate) => handleDateChange(newDate, false)}
                  disablePast
                  shouldDisableDate={isDateBlocked}
                  renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                />
              </Box>
            </LocalizationProvider>
            {errorMessage && (
              <Typography color="error" className="mt-2">{errorMessage}</Typography>
            )}

            {startDate && endDate && (
              <Box mt={2}>
                <Typography variant="body1"><strong>Data de Início:</strong> {startDate.toLocaleDateString('pt-BR')}</Typography>
                <Typography variant="body1"><strong>Data de Fim:</strong> {endDate.toLocaleDateString('pt-BR')}</Typography>
                <Typography variant="body1"><strong>Número de Dias:</strong> {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}</Typography>
                <Typography variant="body1"><strong>Preço Total:</strong> R$ {totalRent.toFixed(2)}</Typography>
              </Box>
            )}

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsSubmitting(true);
                  setTimeout(() => {
                    alert(`Aluguel confirmado! Preço total: R$ ${totalRent.toFixed(2)}`);
                    setIsSubmitting(false);
                  }, 1000);
                }}
                disabled={!startDate || !endDate || isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                {isSubmitting ? 'Processando...' : 'Alugar'}
              </Button>
            </Box>
          </section>
        </div>
      </div>

      <section className="mt-8">
        <Typography variant="h6" className="mb-4 text-gray-800">Descrição do Carro</Typography>
        <Typography variant="body1" className="mb-2 p-4">{carDetails.description}</Typography>
      </section>

      <section className="mt-8">
        <Typography variant="h6" className="mb-4 text-gray-800">Carros Semelhantes</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarCars.map((car) => (
            <CarSimpleCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CarDetailsPage;
