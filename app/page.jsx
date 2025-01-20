"use client";
import { useState } from "react";
import PlayerStats from "./components/PlayerStats";
import Product from "./components/Product";
import Reports from "./components/Reports";
import PlanningForm from "./components/PlanningForm";
import { runSimulation } from "./utils/gameLogic";

export default function Page() {
	// Nome do jogo (definido pelo jogador no início)
	const [gameName, setGameName] = useState("");
	const [gameStarted, setGameStarted] = useState(false);

	// Estado do jogo
	const [products, setProducts] = useState([]); // Lista de produtos
	const [players, setPlayers] = useState(10000); // Jogadores ativos iniciais
	const [money, setMoney] = useState(100000); // Dinheiro inicial
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(2025);
	const [history, setHistory] = useState([]); // Histórico de ciclos
	const [events, setEvents] = useState([]); // Últimos eventos gerados

	// Inicia o jogo após definir o nome
	const startGame = () => {
		if (gameName.trim() === "") return;
		setGameStarted(true);
	};

	// Confirma o planejamento e executa a simulação
	const handleConfirmPlanning = ({ newProducts, marketing }) => {
		const { updatedPlayers, updatedMoney, generatedEvents } = runSimulation({
			players,
			money,
			products: newProducts,
			marketing,
		});

		// Atualiza o estado com os novos valores
		setProducts(newProducts);
		setPlayers(updatedPlayers);
		setMoney(updatedMoney);
		setEvents(generatedEvents);
		setHistory([...history, { players: updatedPlayers, money: updatedMoney }]);

		// Avança um mês
		setMonth((prev) => (prev % 12) + 1);
		if (month === 12) {
			setYear((prev) => prev + 1);
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4">
			{/* Tela inicial: escolha do nome */}
			{!gameStarted ? (
				<div className="flex flex-col items-center justify-center h-screen">
					<h1 className="text-2xl font-bold mb-4">Nomeie seu jogo 🎮</h1>
					<input
						type="text"
						className="p-2 rounded text-black"
						placeholder="Digite o nome..."
						value={gameName}
						onChange={(e) => setGameName(e.target.value)}
					/>
					<button
						className="mt-4 bg-blue-500 px-4 py-2 rounded"
						onClick={startGame}>
						Iniciar 🚀
					</button>
				</div>
			) : (
				<>
					{/* Estatísticas do jogador */}
					<PlayerStats
						players={players}
						money={money}
						month={month}
						year={year}
					/>

					{/* Lista de produtos ativos */}
					<div className="mt-4">
						<h2 className="text-lg font-bold mb-2">📦 Produtos Atuais</h2>
						{products.length > 0 ? (
							products.map((product) => (
								<Product
									key={product.id}
									product={product}
								/>
							))
						) : (
							<p className="text-gray-400">Nenhum produto lançado ainda.</p>
						)}
					</div>

					{/* Relatório do último ciclo */}
					<div className="mt-6">
						<Reports
							history={history}
							events={events}
						/>
					</div>

					{/* Formulário de planejamento para o próximo ciclo */}
					<div className="mt-6">
						<PlanningForm
							onSubmit={handleConfirmPlanning}
							budget={money}
						/>
					</div>
				</>
			)}
		</div>
	);
}
