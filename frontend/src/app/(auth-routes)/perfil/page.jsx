import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import ButtonLogout from "@/components/LogoutBTN"

const Perfil = async () => {
	const session = await getServerSession(nextAuthOptions)

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<h1 className="text-2xl mb-8">Olá, {session.user.first_name}. Bem vindo(a)!</h1>
			<ButtonLogout />
		</div>
	)
}

export default Perfil;