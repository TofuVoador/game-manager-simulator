export function calculateTotalCost(products) {
	let total = 0;
	const baseCost = { season: 8000, bundle: 4000, skin: 2000, event: 6000 };
	const effortMultiplier = { low: 1, medium: 2, high: 3 };

	products.forEach((product) => {
		total += (baseCost[product.type] || 2000) * (effortMultiplier[product.effort] || 1);
	});

	return total;
}

export function calculateCost(product) {
	const baseCost = { season: 8000, bundle: 4000, skin: 2000, event: 6000 };
	const effortMultiplier = { low: 1, medium: 2, high: 3 };

	let cost = (baseCost[product.type] || 2000) * (effortMultiplier[product.effort] || 1);

	return cost;
}

export function calculateTotalEffort(products) {
	let total = 0;
	const effortBase = { low: 1, medium: 2, high: 3 };
	products.forEach((product) => {
		total += effortBase[product.effort] || 2;
	});

	return total;
}

export function runSimulation({ products, money, players }) {
	let newMoney = money;
	let newPlayers = players;

	const multiplicadorPreco = { Free: 0, $: 10, $$: 20, $$$: 30 };

	// Atualiza cada produto com seus impactos individuais
	products = products.map((product) => {
		const revenue =
			product.saturation > 0
				? Math.round(
						multiplicadorPreco[product.price] *
							(players / 100) *
							product.saturation *
							product.quality
				  )
				: 0;

		const playerImpact = Math.round(
			(1000 / (multiplicadorPreco[product.price] == 0 ? 1 : multiplicadorPreco[product.price])) *
				product.saturation *
				product.quality
		);

		// Reduz a saturação mensalmente (mantendo precisão de duas casas decimais)
		const newSaturation =
			Math.round(100 * (product.saturation - Math.random() * product.saturationIndex)) / 100;

		return {
			...product,
			saturation: newSaturation,
			revenue,
			playerImpact,
		};
	});

	// Aplica os ganhos dos produtos
	products.forEach((product) => {
		newMoney += product.revenue;
		newPlayers += product.playerImpact;
	});

	return {
		products,
		money: newMoney,
		players: Math.max(newPlayers, 0),
	};
}

export function getSaturationByType(type) {
	const baseSaturation = {
		season: 0.6,
		bundle: 0.2,
		skin: 0.4,
		event: 0.8,
	};

	// Retorna um valor aleatório dentro de uma faixa do tipo do produto
	return Math.round(baseSaturation[type] * (8 + Math.random() * 4)) / 10;
}
