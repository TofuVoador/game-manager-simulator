"use client";
import { useState } from "react";
import PlayerStats from "./components/PlayerStats";
import Product from "./components/Product";
import Reports from "./components/Reports";
import PlanningForm from "./components/PlanningForm";
import { calculateTotalCost, runSimulation } from "./utils/gameLogic";

export default function Page() {
	// Nome do jogo (definido pelo jogador no início)
	const [gameName, setGameName] = useState("");
	const [gameStarted, setGameStarted] = useState(false);
	const [maxPlayers, setMaxPlayers] = useState(0);

	// Estado do jogo
	const [products, setProducts] = useState([]); // Lista de produtos
	const [players, setPlayers] = useState(1); // Jogadores ativos iniciais
	const [money, setMoney] = useState(1); // Dinheiro inicial
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [history, setHistory] = useState([]); // Histórico de ciclos
	const [investment, setInvestment] = useState(50);

	const [gameSaturation, setGameSaturation] = useState(1.0);

	// Inicia o jogo após definir o nome
	const startGame = () => {
		if (gameName.trim() === "") return;

		setMoney(1000 * (100 - investment));
		setPlayers(1000 * investment);

		setHistory([
			{
				products: [],
				players: 1000 * investment,
				money: 1000 * (100 - investment),
			},
		]);

		setGameStarted(true);
	};

	const resetGame = () => {
		setGameStarted(false);
		setGameName("");
		setInvestment(50);
		setPlayers(1); // Valor inicial padrão
		setMoney(1); // Valor inicial padrão
		setMonth(new Date().getMonth() + 1);
		setYear(new Date().getFullYear());
		setProducts([]);
		setHistory([]);
	};

	// Confirma o planejamento e executa a simulação
	const handleConfirmPlanning = ({ newProducts }) => {
		let updatedProducts = products.filter((p) => p.selected === true);

		const hasSeason = updatedProducts.some((p) => p.type === "season");
		const hasEvent = updatedProducts.some((p) => p.type === "event");

		const newMoney = Math.floor(money - calculateTotalCost(newProducts));
		const newPlayers = Math.floor(players * gameSaturation);

		var newGameSaturation = gameSaturation - 0.1;

		newProducts.forEach((product) => {
			if (product.type === "season" && hasSeason) {
				updatedProducts = updatedProducts.filter((p) => p.type !== "season");
			}
			if (product.type === "event" && hasEvent) {
				updatedProducts = updatedProducts.filter((p) => p.type !== "event");
			}
			updatedProducts.push(product);

			newGameSaturation += 0.04 * product.quality.index;
		});

		const simulation = runSimulation({
			products: updatedProducts,
			money: newMoney,
			players: newPlayers,
		});

		if (simulation.players > maxPlayers) setMaxPlayers(simulation.players);

		// Atualiza o estado com os novos valores
		setGameSaturation(newGameSaturation);
		setProducts(simulation.products);
		setPlayers(simulation.players);
		setMoney(simulation.money);
		setHistory([
			...history,
			{
				products: simulation.products,
				players: simulation.players,
				money: simulation.money,
			},
		]);

		// Avança um mês
		setMonth((prev) => (prev % 12) + 1);
		if (month === 12) {
			setYear((prev) => prev + 1);
		}
	};

	const handleToggle = (id) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === id ? { ...product, selected: !product.selected } : product
			)
		);
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4 font-montserrat">
			{/* Tela de Game Over */}
			{players <= 0 ? (
				<div className="flex flex-col items-center justify-center h-screen text-center">
					<h1 className="text-3xl font-bold mb-4">💀 Game Over 💀</h1>
					<p className="text-lg mb-2">Seu jogo perdeu todos os jogadores.</p>
					<p className="font-roboto text-gray-400">"Nem todo estúdio sobrevive ao mercado..."</p>

					{/* Relatório Final */}
					<div className="mt-4 bg-gray-800 p-4 rounded w-80">
						<h2 className="text-xl font-bold">📊 Relatório Final</h2>
						<p>
							<strong>Seu jogo durou até:</strong> {month}/{year}
						</p>
						<p>
							<strong>Maior Número de Jogadores Ativos:</strong> {maxPlayers}
						</p>
					</div>

					<button
						className="mt-6 bg-red-500 px-6 py-3 rounded text-lg font-bold"
						onClick={resetGame}>
						🔄 Reiniciar Jogo
					</button>
				</div>
			) : /* Tela inicial: escolha do nome */
			!gameStarted ? (
				<div className="flex flex-col items-center justify-center">
					{/* Título do jogo */}
					<h1 className="text-2xl font-extrabold mb-4">🎮 Game Manager Simulator</h1>

					{/* Breve descrição */}
					<p className="text-sm text-gray-300 mb-6 max-w-md">
						Gerencie seu próprio jogo! Lance produtos, administre seus recursos e evite a queda de
						jogadores ativos. Quanto tempo seu estúdio sobreviverá?
					</p>

					<h1 className="text-xl font-bold mb-4">Nomeie seu jogo</h1>

					<input
						type="text"
						className="p-2 rounded text-black text-sm"
						placeholder="Digite o nome..."
						value={gameName}
						onChange={(e) => setGameName(e.target.value)}
					/>

					{/* Slider de Investimento */}
					<div className="mt-4 w-64 text-center">
						<label className="font-bold">💰 Investimento Inicial: {investment}%</label>
						<input
							type="range"
							min="20"
							max="80"
							value={investment}
							onChange={(e) => setInvestment(Number(e.target.value))}
							className="w-full"
						/>
						<div className="flex justify-between">
							<p>💰 {1000 * (100 - investment)}</p>
							<p>👥 {1000 * investment}</p>
						</div>
					</div>

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
						gameName={gameName}
					/>

					{/* Lista de produtos ativos */}
					<div className="mt-4">
						<h2 className="text-lg font-bold mb-2">📦 Produtos Atuais</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{products.length > 0 ? (
								products.map((product) => (
									<Product
										key={product.id}
										product={product}
										onToggle={handleToggle}
									/>
								))
							) : (
								<p className="text-gray-400 text-xs font-roboto col-span-full text-center">
									Nenhum produto lançado ainda.
								</p>
							)}
						</div>
					</div>

					{/* Relatório do último ciclo */}
					<div className="mt-6">
						<Reports history={history} />
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
