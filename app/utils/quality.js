export function getProductQuality(effort) {
	const qualityMultipliers = {
		low: 0.8,
		medium: 1.0,
		high: 1.2,
	};

	// Obtém o multiplicador base, se não encontrar, assume 1.0
	const baseQuality = qualityMultipliers[effort] ?? 1.0;

	// Adiciona um fator de variação entre -0.1 e 0.1
	const variation = Math.round(100 * (Math.random() * 0.4 - 0.2)) / 100;

	// Calcula a qualidade final
	return baseQuality + variation;
}
