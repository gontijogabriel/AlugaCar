'use client';

import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { getCarDataFilters, getCars } from '@/services/api';

import { useSearchParams, useRouter } from 'next/navigation';
import { IoIosArrowForward, IoIosSearch } from 'react-icons/io';

const Cars = () => {
  const [filter, setFilter] = useState({ categories: [], types: [] });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleCheckboxChange = (type, value) => {
    const params = new URLSearchParams(searchParams);

    let selectedFilters = params.get(type) ? params.get(type).split(',') : [];
    if (selectedFilters.includes(value)) {
      selectedFilters = selectedFilters.filter((item) => item !== value);
    } else {
      selectedFilters.push(value);
    }

    if (selectedFilters.length) {
      params.set(type, selectedFilters.join(','));
    } else {
      params.delete(type);
    }

    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4 lg:max-w-56">
            <div className="block rounded-md overflow-hidden">
              <div className="space-y-2">

                <details className="overflow-hidden rounded border border-gray-300">
                  <summary className="flex items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <input 
                      type="text" 
                      className="text-sm font-medium outline-none" 
                      placeholder="Pesquisar"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="transition group-open:-rotate-180 cursor-pointer" onClick={handleSearch}>
                      <IoIosSearch />
                    </span>
                  </summary>
                </details>

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> Categoria </span>
                    <span className="transition group-open:-rotate-180">
                      <IoIosArrowForward />
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      {filter.categories.map((categ, index) => (
                        <li key={index}>
                          <label className="inline-flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              className="size-5 rounded border-gray-300" 
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

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> Carroceria </span>
                    <span className="transition group-open:-rotate-180">
                      <IoIosArrowForward />
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      {filter.types.map((tp, index) => (
                        <li key={index}>
                          <label className="inline-flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              className="size-5 rounded border-gray-300" 
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
            </div>
          </div>

          <div className='flex flex-col'>
            <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">

              {cars.length > 0 ? (
                cars.map((car) => (
                  <a
                    href={`cars/detail/${car.id}`}
                    key={car.id}
                    className="block border border-gray-300 rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105 bg-white"
                  >
                    <img
                      src={car.image.url}
                      alt={car.model}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-lg font-semibold mb-2">{car.model}</p>
                      <p className="text-gray-600 mb-1">{car.brand}</p>
                      <p className="text-gray-600">R$ {car.day_price} / dia</p>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-center col-span-full">Nenhum carro disponível no momento.</p>
              )}
            </div>
            <p>resultados {totalResults}</p>
            <nav>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Cars;
