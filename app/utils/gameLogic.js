import { getRandomEvent } from "./events";

export function calcularCustoTotal(products) {
	let total = 0;
	const custosBase = { season: 10000, bundle: 5000, skin: 2000, event: 8000 };
	const multiplicadorPreco = { Free: 1, $: 1.2, $$: 1.5, $$$: 2 };

	products.forEach((product) => {
		total += (custosBase[product.type] || 0) * (multiplicadorPreco[product.price] || 1);
	});

	return total;
}

export function runSimulation({ products, money, players }) {
	let newMoney = money;
	let newPlayers = players;
	let events = getRandomEvent();

	console.log(newMoney, newPlayers);

	// Mapeia os eventos e aplica os impactos cumulativamente
	events.forEach((event) => {
		newMoney += event.revenue;
		newPlayers -= event.playersLost;
	});

	const multiplicadorPreco = { Free: 0, $: 10, $$: 20, $$$: 30 };

	// Atualiza cada produto com seus impactos individuais
	products = products.map((product) => ({
		...product,
		revenue: Math.floor(multiplicadorPreco[product.price] * (players / 100)),
		playerImpact: Math.floor(1000 / (multiplicadorPreco[product.price] + 1)),
	}));

	// Aplica os ganhos dos produtos
	products.forEach((product) => {
		newMoney += product.revenue;
		newPlayers += product.playerImpact;
	});

	return {
		products,
		money: newMoney,
		players: Math.max(newPlayers, 0),
		events,
	};
}
