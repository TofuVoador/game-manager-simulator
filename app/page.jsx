"use client";
import { useState } from "react";
import PlayerStats from "./components/PlayerStats";
import Product from "./components/Product";
import Reports from "./components/Reports";
import PlanningForm from "./components/PlanningForm";
import { calcularCustoTotal, runSimulation } from "./utils/gameLogic";

export default function Page() {
	// Nome do jogo (definido pelo jogador no início)
	const [gameName, setGameName] = useState("");
	const [gameStarted, setGameStarted] = useState(false);

	// Estado do jogo
	const [products, setProducts] = useState([]); // Lista de produtos
	const [players, setPlayers] = useState(0); // Jogadores ativos iniciais
	const [money, setMoney] = useState(0); // Dinheiro inicial
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [history, setHistory] = useState([]); // Histórico de ciclos
	const [investment, setInvestiment] = useState(50);

	// Inicia o jogo após definir o nome
	const startGame = () => {
		if (gameName.trim() === "") return;

		setMoney(1000 * (100 - investment));
		setPlayers(100 * investment);

		setHistory([
			{
				products: [],
				players: 100 * investment,
				money: 1000 * (100 - investment),
			},
		]);

		setGameStarted(true);
	};

	// Confirma o planejamento e executa a simulação
	const handleConfirmPlanning = ({ newProducts }) => {
		let updatedProducts = products.filter((p) => p.selected === true);

		const hasSeason = updatedProducts.some((p) => p.type === "season");
		const hasEvent = updatedProducts.some((p) => p.type === "event");

		const newMoney = Math.floor(money - calcularCustoTotal(newProducts));
		const newPlayers = Math.floor((players * (3 + Math.random())) / 4);

		newProducts.forEach((product) => {
			if (product.type === "season" && hasSeason) {
				updatedProducts = updatedProducts.filter((p) => p.type !== "season");
			}
			if (product.type === "event" && hasEvent) {
				updatedProducts = updatedProducts.filter((p) => p.type !== "event");
			}
			updatedProducts.push(product);
		});

		const simulation = runSimulation({
			products: updatedProducts,
			money: newMoney,
			players: newPlayers,
		});

		// Atualiza o estado com os novos valores
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
		<div className="min-h-screen bg-gray-900 text-white p-4">
			{/* Tela inicial: escolha do nome */}
			{!gameStarted ? (
				<div className="flex flex-col items-center justify-center h-screen">
					<h1 className="text-2xl font-bold mb-4">Nomeie seu jogo 🎮</h1>

					{/* Campo para nome do jogo */}
					<input
						type="text"
						className="p-2 rounded text-black"
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
							onChange={(e) => setInvestiment(Number(e.target.value))}
							className="w-full"
						/>
						<div className="flex justify-between">
							<p>💵 {1000 * (100 - investment)}</p>
							<p>👥 {100 * investment}</p>
						</div>
					</div>

					{/* Botão para iniciar */}
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
						<div className="flex flex-col gap-2">
							{products.length > 0 ? (
								products.map((product) => (
									<Product
										key={product.id}
										product={product}
										onToggle={handleToggle}
									/>
								))
							) : (
								<p className="text-gray-400 text-xs italic">Nenhum produto lançado ainda.</p>
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
