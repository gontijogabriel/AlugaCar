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
    <main className="container mx-auto px-4 lg:px-8 py-6">
      <section className="flex flex-wrap gap-4 mb-6 justify-end">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto">
          <input
            type="text"
            className="text-sm font-medium outline-none w-full"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="ml-2 cursor-pointer" onClick={handleSearch}>
            <IoIosSearch color='grey' />
          </span>
        </div>

        <div className='flex flex-wrap gap-4 w-full sm:w-auto justify-center sm:justify-end'>
          <details className="relative flex items-center border border-gray-300 rounded-md p-2 cursor-pointer w-full sm:w-auto">
            <summary className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-medium">Categoria</span>
              <IoIosArrowForward className="transition-transform rotate-0 group-open:rotate-90" />
            </summary>
            <div className="absolute left-0 top-10 mt-2 w-full sm:w-40 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-10">
              <ul className="space-y-1">
                {filter.categories.map((categ, index) => (
                  <li key={index}>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={() => handleCheckboxChange('category', categ.name)}
                        checked={searchParams.get('category')?.split(',').includes(categ.name) || false}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {`${categ.name} (${categ.count})`}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="relative flex items-center border border-gray-300 rounded-md p-2 cursor-pointer w-full sm:w-auto">
            <summary className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-medium">Carroceria</span>
              <IoIosArrowForward className="transition-transform rotate-0 group-open:rotate-90" />
            </summary>
            <div className="absolute left-0 top-10 mt-2 w-full sm:w-40 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-10">
              <ul className="space-y-1">
                {filter.types.map((tp, index) => (
                  <li key={index}>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={() => handleCheckboxChange('type', tp.name)}
                        checked={searchParams.get('type')?.split(',').includes(tp.name) || false}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {`${tp.name} (${tp.count})`}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <CarSimpleCard key={index} car={car} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 italic font-semibold mt-4 p-4">
            Nenhum carro disponível no momento.
          </p>
        )}
      </section>

      <div className='text-right'>
        <span className="text-xs text-gray-600 text-right">
          Resultados encontrados {totalResults}
        </span>
      </div>

      <nav className="mt-2">
        <ol className="flex justify-center gap-1 text-xs font-medium">
          <li>
            <a
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 hover:bg-gray-200 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1}>
              <a
                onClick={() => setCurrentPage(index + 1)}
                className={`block size-8 rounded border ${currentPage === index + 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 hover:bg-gray-200 bg-white text-gray-900'} text-center leading-8 cursor-pointer`}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li>
            <a
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 hover:bg-gray-200 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </nav>
    </main>
  );
};

export default Cars;
