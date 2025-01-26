export function getProductQuality(product) {
	const qualityMultipliers = {
		low: 0.8,
		medium: 1.0,
		high: 1.2,
	};

	const highQualityDesc = {
		season: [
			"Inovador e revolucionário!",
			"Altíssima qualidade e muito aguardado!",
			"Surpreendeu as expectativas do público!",
			"Recebendo elogios da crítica especializada.",
			"Um verdadeiro divisor de águas!",
			"Experiência premium sem igual.",
			"Os jogadores estão impressionados!",
			"Um sucesso instantâneo!",
			"Perfeito em todos os detalhes.",
			"Superou até os concorrentes mais fortes!",
		],
		bundle: [
			"Melhor custo-benefício do mercado!",
			"Ótima seleção de itens de alta qualidade.",
			"Vale cada centavo!",
			"Jogadores adoraram a curadoria dos itens.",
			"Um pacote obrigatório para fãs.",
			"Promoção excelente, vendendo como água!",
			"Os jogadores sentem que ganharam um presente!",
			"Uma coleção digna de colecionador.",
			"Adições incríveis que fazem valer o preço.",
			"Considerado o melhor bundle do ano!",
		],
		skin: [
			"Visual espetacular e muito desejado!",
			"Texturas e detalhes impressionantes.",
			"Design de ponta, virou tendência!",
			"Exclusividade que todo jogador quer.",
			"As animações são simplesmente incríveis!",
			"Raridade máxima, um verdadeiro troféu.",
			"Feito com um nível de cuidado absurdo!",
			"Brilha no jogo como nenhuma outra skin.",
			"Fez os jogadores se apaixonarem!",
			"Definiu um novo padrão de skins premium.",
		],
		event: [
			"O evento mais empolgante do ano!",
			"Jogadores se uniram e amaram a experiência!",
			"Incrível envolvimento da comunidade!",
			"Um sucesso absoluto, que venha o próximo!",
			"Todos os streamers estão falando disso!",
			"Ótimos prêmios e recompensas equilibradas.",
			"Alto nível de diversão garantida!",
			"Conseguiu manter os jogadores engajados!",
			"Superou todas as expectativas!",
			"Definitivamente um evento lendário!",
		],
	};

	const lowQualityDesc = {
		season: [
			"Sem novidades, muito genérico.",
			"Repetitivo e sem inspiração.",
			"Não vale o investimento, feedback negativo.",
			"Erro estratégico, os jogadores estão decepcionados.",
			"Faltou polimento e criatividade.",
			"Pouco impacto no mercado.",
			"Jogo cheio de bugs e problemas técnicos.",
			"Críticas apontam falta de inovação.",
			"Passou despercebido pelo público.",
			"Concorrência está muito à frente.",
		],
		bundle: [
			"Conteúdo fraco pelo preço cobrado.",
			"Jogadores não sentiram que valeu a pena.",
			"Muito caro para o que oferece.",
			"Itens sem graça e desnecessários.",
			"Aceitação mínima entre os jogadores.",
			"Faltou criatividade na seleção dos itens.",
			"Uma tentativa frustrada de vender conteúdo.",
			"Promoção enganosa, gerou insatisfação.",
			"Pouca variedade e inovação.",
			"Esquecido rapidamente pelo público.",
		],
		skin: [
			"Visual sem graça e sem personalidade.",
			"Parece um reskin barato.",
			"Ninguém quer gastar dinheiro nisso.",
			"Design preguiçoso e sem detalhes.",
			"Baixa qualidade e falta de polimento.",
			"Recebeu muitas críticas da comunidade.",
			"Estética antiquada e pouco atrativa.",
			"Jogadores chamam de 'dinheiro jogado fora'.",
			"Totalmente sem inspiração.",
			"Vendeu muito abaixo do esperado.",
		],
		event: [
			"Fracasso total, jogadores não gostaram.",
			"Recompensas ruins, ninguém se interessou.",
			"Mal planejado e cheio de problemas técnicos.",
			"Completamente ignorado pela comunidade.",
			"Avaliação negativa nos fóruns.",
			"Não conseguiu engajar os jogadores.",
			"Premiação injusta e eventos repetitivos.",
			"Execução desastrosa e cheia de falhas.",
			"Marketing exagerado para um evento ruim.",
			"Definitivamente um evento para esquecer.",
		],
	};

	// Obtém o multiplicador base, se não encontrar, assume 1.0
	const baseQuality = qualityMultipliers[product.effort] ?? 1.0;

	// Adiciona um fator de variação entre -0.2 e +0.2
	const variation = Math.round(100 * (Math.random() * 0.4 - 0.2)) / 100;
	const index = baseQuality + variation;

	let desc = null;

	if (index >= 1.1) {
		// Escolhe um aleatório de highQualityDesc[product.type]
		const descriptions = highQualityDesc[product.type] || [];
		desc =
			descriptions.length > 0
				? descriptions[Math.floor(Math.random() * descriptions.length)]
				: "Produto de qualidade alta!";
	} else if (index <= 0.9) {
		// Escolhe um aleatório de lowQualityDesc[product.type]
		const descriptions = lowQualityDesc[product.type] || [];
		desc =
			descriptions.length > 0
				? descriptions[Math.floor(Math.random() * descriptions.length)]
				: "Produto de qualidade baixa!";
	}

	// Retorna o índice de qualidade e a descrição
	return { desc, index };
}
