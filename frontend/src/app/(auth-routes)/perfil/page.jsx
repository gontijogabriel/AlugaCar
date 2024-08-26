'use client';
import { useSession } from 'next-auth/react';
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from 'react';

const Perfil = () => {
	const { data: session } = useSession();
	const [rentals, setRentals] = useState([]);
	const [statusModal, setStatusModal] = useState(false);
	const [selectedRental, setSelectedRental] = useState(null);
	const [selected, setSelected] = useState('Em Andamento');
	
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
					console.error("Erro: ", error);
				}
			};

			fetchRentals();
		}
	}, [session]);

	return (
		<>
			<Header />
			<main className="container mx-auto px-0 lg:px-8 py-6">
				<section className="p-4 sm:p-0">

					<nav aria-label="Breadcrumb" className="flex justify-center my-12">
						<ol className="flex gap-1 bg-gray-200 rounded-lg p-1.5">
							{['Em Andamento', 'Histórico', 'Meus Dados'].map((label) => (
							<li
								key={label}
								className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
								selected === label ? 'bg-white' : 'bg-gray-200'
								}`}
								onClick={() => handleSelect(label)}
							>
								<a href="/perfil" className="font-semibold text-gray-700">
								{label}
								</a>
							</li>
							))}
						</ol>
					</nav>

					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200 bg-white text-sm rounded-lg border border-gray-200">
							<thead className="ltr:text-left rtl:text-right">
								<tr>
									<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Carro</th>
									<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hidden sm:table-cell">Início</th>
									<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hidden sm:table-cell">Término</th>
									<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hidden sm:table-cell">Valor</th>
									<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hidden sm:table-cell">Status</th>
									<th className="px-4 py-2"></th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{rentals.map((rental) => (
									<tr key={rental.id}>
										<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											<Link href={`cars/${rental.car.id}`}>
												{rental.car.model}
											</Link>
										</td>
										<td className="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell">
											{rental.start_date}
										</td>
										<td className="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell">
											{rental.end_date}
										</td>
										<td className="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell">
											{rental.value}
										</td>
										<td className="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell">
											{rental.status}
										</td>
										<td className="whitespace-nowrap px-4 py-2">
											<button
												onClick={() => openModal(rental)}
												className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
											>
												View
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
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