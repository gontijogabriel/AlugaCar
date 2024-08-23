import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import Link from "next/link";

const Perfil = async () => {
	const session = await getServerSession(nextAuthOptions);

	const data = {
		car: 'M3 Competition',
		start_date: '26/08/2024',
		end_date: '30/08/2024',
		value: '3449,50',
		status: 'AWAITING_PAYMENT',
	};

	return (
		<>
			<Header />
			<main className="container mx-auto px-4 lg:px-8 py-6">
				<section className="p-6">
					<h1 className="text-2xl font-semibold mb-4">
						Olá, {session?.user?.first_name || "Usuário"}. Bem-vindo!
					</h1>
					<nav className="mb-8">
						<ul className="flex space-x-4 text-lg font-medium">
							<li className="bg-slate-300 p-2 rounded-lg">
								<button className="w-full h-full">
									<Link href="/perfil" className="text-blue-500 hover:text-blue-700">
										Em Andamento
									</Link>
								</button>
							</li>
							<li className="bg-slate-300 p-2 rounded-lg">
								<button className="w-full h-full">
									<Link href="/perfil" className="text-blue-500 hover:text-blue-700">
										Histórico
									</Link>
								</button>
							</li>
							<li className="bg-slate-300 p-2 rounded-lg">
								<button className="w-full h-full">
									<Link href="/perfil" className="text-blue-500 hover:text-blue-700">
										Meus Dados
									</Link>
								</button>
							</li>
						</ul>
					</nav>

					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Carro
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Início
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Término
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Valor
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{data.car}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{data.start_date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{data.end_date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{data.value}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{data.status}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</main>
		</>
	);
};

export default Perfil;
