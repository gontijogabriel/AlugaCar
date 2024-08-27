'use client';
import { useSession } from 'next-auth/react';
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

const Perfil = () => {
	const { data: session } = useSession();
	const [rentals, setRentals] = useState([]);
	const [statusModal, setStatusModal] = useState(false);
	const [selectedRental, setSelectedRental] = useState(null);
	const [selected, setSelected] = useState('Em Andamento');
	const [loading, setLoading] = useState(true);

	const handleSelect = (label) => {
		setSelected(label);
	};

	const openModal = (rental) => {
		setSelectedRental(rental);
		setStatusModal(true);
	};

	const closeModal = () => {
		setStatusModal(false);
		setSelectedRental(null);
	};

	useEffect(() => {
		if (session) {
			const fetchRentals = async () => {
				try {
					const response = await fetch("http://127.0.0.1:8000/api/v1/rental/auth-user/", {
						headers: {
							Authorization: `Bearer ${session.user.access}`,
						},
					});

					if (!response.ok) {
						throw new Error("Erro ao buscar os dados do usuário");
					}

					const data = await response.json();
					setRentals(data);
				} catch (error) {
					console.error("Erro ao buscar os carros:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchRentals();
		}
	}, [session]);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<Header />
			<main className="container mx-auto px-0 lg:px-8">

				<section class="bg-white py-4 antialiased dark:bg-gray-900">
					<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
						<div class="mx-auto max-w-5xl">

							<h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My Orders</h2>

							<div class="flow-root sm:mt-4 mt-2">
								<div class="divide-y divide-gray-200 dark:divide-gray-700 flex flex-col gap-2">

									{rentals.map((rental) => (
										<div class="flex flex-wrap items-center gap-y-4 p-2 bg-neutral-100 rounded-md shadow-m" key={rental.id}>
											<dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
												<dt class="text-base font-medium text-gray-500 dark:text-gray-400">Carro</dt>
												<dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
													<a href={`cars/detail/${rental.car.id}`} class="hover:underline">{rental.car.model}</a>
												</dd>
											</dl>

											<dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
												<dt class="text-base font-medium text-gray-500 dark:text-gray-400">Início</dt>
												<dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{rental.start_date}</dd>
											</dl>

											<dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
												<dt class="text-base font-medium text-gray-500 dark:text-gray-400">Preço</dt>
												<dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">R$ {rental.value}</dd>
											</dl>

											<dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
												<dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status</dt>
												<dd class="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
													<svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
														<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
													</svg>
													{rental.status}
												</dd>
											</dl>

											<div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
												<button type="button" class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
												<button type="button" onClick={() => openModal(rental)} class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</button>
											</div>
										</div>
									))}
								</div>
							</div>

							<nav class="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
								<ul class="flex h-8 items-center -space-x-px text-sm">
									<li>
										<a href="#" class="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
											<span class="sr-only">Previous</span>
											<svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
											</svg>
										</a>
									</li>
									<li>
										<a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
									</li>
									<li>
										<a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
									</li>
									<li>
										<a href="#" aria-current="page" class="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
									</li>
									<li>
										<a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
									</li>
									<li>
										<a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
									</li>
									<li>
										<a href="#" class="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
											<span class="sr-only">Next</span>
											<svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
											</svg>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</section>

				{statusModal && selectedRental && (
					<div
						id="default-modal"
						tabIndex="-1"
						aria-hidden="true"
						className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-75 transition-opacity"
					>
						<div className="relative p-4 w-full max-w-2xl max-h-full">
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
								<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
										{selectedRental.car.model}
									</h3>
									<button
										type="button"
										onClick={closeModal}
										className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<svg
											className="w-3 h-3"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 14 14"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
											/>
										</svg>
										<span className="sr-only">Close modal</span>
									</button>
								</div>

								<div className="p-4 md:p-5 space-y-4">
									<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										<strong>Início:</strong> {selectedRental.start_date}
									</p>
									<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										<strong>Término:</strong> {selectedRental.end_date}
									</p>
									<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										<strong>Valor:</strong> {selectedRental.value}
									</p>
									<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										<strong>Status:</strong> {selectedRental.status}
									</p>
								</div>

								<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
									<button
										onClick={closeModal}
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Fechar
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</main>
		</>
	);
};

export default Perfil;