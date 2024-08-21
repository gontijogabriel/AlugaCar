'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePickerWithBlockedDates = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalRent, setTotalRent] = useState(0);

  const blockedDates = [
    new Date(2024, 8, 10), 
    new Date(2024, 8, 11),
    new Date(2024, 8, 12),
  ];

  const isDateBlocked = (date) => {
    return blockedDates.some(blockedDate => date.toDateString() === blockedDate.toDateString());
  };

  const handleSelect = (dates) => {
    const [start, end] = dates;

    // Verifica se o intervalo selecionado inclui datas bloqueadas
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
      setTotalRent(dayDifference * 199.90);
    } else {
      setTotalRent(0);
    }
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-64 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select a Date Range</label>
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
          placeholderText="Choose a date range"
          inline
        />
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold">Dias Selecionados: {startDate && endDate ? `${Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}` : '0'}</p>
        <p className="text-lg font-semibold">Valor total do aluguel: R$ {totalRent.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DateRangePickerWithBlockedDates;
