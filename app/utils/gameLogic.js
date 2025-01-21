export function calcularCustoTotal(products) {
	let total = 0;

	const custosBase = {
		season: 10000,
		bundle: 5000,
		skin: 2000,
		event: 8000,
	};

	const multiplicadorPreco = {
		Free: 1,
		$: 1.2,
		$$: 1.5,
		$$$: 2,
	};

	products.forEach((product) => {
		const custoBase = custosBase[product.type] || 0;
		const fatorPreco = multiplicadorPreco[product.price] || 1;
		total += custoBase * fatorPreco;
	});

	return total;
}
