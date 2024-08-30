'use client';

import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { getCarDataFilters, getCars } from '@/services/api';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoIosArrowForward, IoIosSearch } from 'react-icons/io';
import CarSimpleCard from '@/components/CarSimpleCard';

const Cars = () => {
  const [filter, setFilter] = useState({ categories: [], types: [] });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const data = await getCarDataFilters();
        setFilter(data);
      } catch (error) {
        console.error("Erro ao buscar filtros dos carros:", error);
      }
    };

    fetchFilter();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      const query = { ...Object.fromEntries(searchParams.entries()), page: currentPage };
      try {
        const data = await getCars(query);
        setCars(data.results);
        setTotalResults(data.total_results);
        setTotalPages(Math.ceil(data.count / data.page_size));
      } catch (error) {
        console.error("Erro ao buscar os carros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchParams, currentPage]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set('search', searchTerm);
    }

    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    if (selectedType) {
      params.set('type', selectedType);
    }

    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="container mx-auto p-4 flex flex-col">
      <section className="w-full flex justify-center p-4 mx-auto">
        <form
          className="flex flex-col items-center justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="relative w-full flex flex-col gap-4 items-center md:flex-row">
            <div className="w-full flex items-center relative">
              <svg
                className="absolute left-3 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:min-w-96 w-full p-3 pl-12 rounded-lg border shadow-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Search by name, type, manufacturer, etc"
              />
            </div>

            <select
              id="manufacturer"
              className="w-full xl:max-w-48 p-3 rounded-lg shadow-md border outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">Categoria</option>
              {filter.categories.map((categ, index) => (
                <option key={index} value={categ.name}>
                  {`${categ.name} (${categ.count})`}
                </option>
              ))}
            </select>

            <select
              id="category"
              className="w-full p-3 xl:max-w-48 rounded-lg shadow-md border outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
            >
              <option value="">Carroceria</option>
              {filter.types.map((tp, index) => (
                <option key={index} value={tp.name}>
                  {`${tp.name} (${tp.count})`}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex gap-2 md:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </form>
      </section>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-2 md:gap-4">
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarSimpleCard key={car.id} car={car} />
          ))
        ) : (
          <p className="text-center col-span-full">Nenhum carro disponível no momento.</p>
        )}
      </div>
    </main>
  );
};

export default Cars;
