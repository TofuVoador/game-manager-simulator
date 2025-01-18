import Image from "next/image";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
			{/* Fonte Sanches para títulos */}
			<h1 className="text-4xl font-bold mb-4 text-center font-comfortaa">
				Bem-vindo ao Game Manager
			</h1>

			{/* Fonte Comfortaa para textos */}
			<p className="text-lg text-center font-sanches mb-6">
				Planeje o lançamento de seasons, pacotes e skins para manter seu jogo vivo o maior tempo
				possível.
			</p>

			{/* Fonte Space Mono para números e código */}
			<div className="bg-gray-800 p-4 rounded-lg text-center font-spaceMono">
				<p className="text-green-400">Jogadores Ativos: 120.000</p>
				<p className="text-blue-400">Receita: $250.000</p>
				<p className="text-red-400">Despesas: $200.000</p>
			</div>

			<button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-comfortaa">
				Próximo Mês
			</button>
		</main>
	);
}
