import { getHappeningByType } from "./happenings";

export function calcularCustoTotal(products) {
	let total = 0;
	const custosBase = { season: 8000, bundle: 4000, skin: 2000, event: 6000 };
	const multiplicadorPreco = { Free: 0.5, $: 1, $$: 1.5, $$$: 2 };

	products.forEach((product) => {
		total += (custosBase[product.type] || 0) * (multiplicadorPreco[product.price] || 1);
	});

	return total;
}

export function runSimulation({ products, money, players }) {
	let newMoney = money;
	let newPlayers = players;

	const multiplicadorPreco = { Free: 0, $: 10, $$: 20, $$$: 30 };

	// Atualiza cada produto com seus impactos individuais
	products = products.map((product) => {
		// Busca um acontecimento para o tipo de produto
		const happening = getHappeningByType(product.type) || {
			revenueMultiplier: 1,
			playersMultiplier: 1,
		};

		// Aplica a saturação e o impacto do acontecimento aos ganhos
		const revenue =
			product.saturation > 0
				? Math.round(
						multiplicadorPreco[product.price] *
							(players / 100) *
							product.saturation *
							happening.revenueMultiplier
				  )
				: 0;

		const playerImpact = Math.round(
			(1000 / (multiplicadorPreco[product.price] + 1)) *
				product.saturation *
				happening.playersMultiplier
		);

		// Reduz a saturação mensalmente (mantendo precisão de duas casas decimais)
		const newSaturation =
			Math.round(100 * (product.saturation - Math.random() * product.saturationIndex)) / 100;

		return {
			...product,
			saturation: newSaturation,
			revenue,
			playerImpact,
			happening, // Armazena o acontecimento aplicado para referência futura
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
