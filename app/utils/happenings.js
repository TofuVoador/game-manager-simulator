export function getHappeningByType(type) {
	const happeningsByType = {
		season: [
			{ name: "Nova temporada aclamada!", revenueMultiplier: 1.2, playersMultiplier: 1.1 },
			{
				name: "Temporada recebida com críticas mistas.",
				revenueMultiplier: 0.9,
				playersMultiplier: 0.95,
			},
			{
				name: "Tema inovador atrai novos jogadores!",
				revenueMultiplier: 1.3,
				playersMultiplier: 1.2,
			},
			{
				name: "Jogadores criticam repetição de conteúdo.",
				revenueMultiplier: 0.8,
				playersMultiplier: 0.9,
			},
			{
				name: "Sistema de recompensas melhora retenção!",
				revenueMultiplier: 1.15,
				playersMultiplier: 1.05,
			},
			{
				name: "Erros na temporada frustram jogadores.",
				revenueMultiplier: 0.85,
				playersMultiplier: 0.9,
			},
			{
				name: "Influenciadores elogiam a temporada!",
				revenueMultiplier: 1.25,
				playersMultiplier: 1.1,
			},
			{
				name: "Bug crítico compromete progressão.",
				revenueMultiplier: 0.7,
				playersMultiplier: 0.8,
			},
			{
				name: "Surpresa de última hora empolga a comunidade!",
				revenueMultiplier: 1.4,
				playersMultiplier: 1.3,
			},
			{
				name: "Poucas inovações desanimam jogadores.",
				revenueMultiplier: 0.9,
				playersMultiplier: 0.95,
			},
		],
		bundle: [
			{
				name: "Bundle exclusivo esgota rapidamente!",
				revenueMultiplier: 1.3,
				playersMultiplier: 1.05,
			},
			{ name: "Pacote caro gera reclamações.", revenueMultiplier: 0.85, playersMultiplier: 0.95 },
			{
				name: "Conteúdo extra empolga jogadores!",
				revenueMultiplier: 1.25,
				playersMultiplier: 1.1,
			},
			{
				name: "Licenciamento expira, removendo o bundle.",
				revenueMultiplier: 0.7,
				playersMultiplier: 0.8,
			},
			{
				name: "Promoção especial impulsiona vendas!",
				revenueMultiplier: 1.4,
				playersMultiplier: 1.2,
			},
			{ name: "Concorrente lança pacote melhor.", revenueMultiplier: 0.8, playersMultiplier: 0.9 },
			{
				name: "Itens cosméticos impressionam a comunidade!",
				revenueMultiplier: 1.3,
				playersMultiplier: 1.05,
			},
			{
				name: "Bug na loja impede algumas compras.",
				revenueMultiplier: 0.75,
				playersMultiplier: 0.95,
			},
			{
				name: "Influenciadores fazem review positiva!",
				revenueMultiplier: 1.2,
				playersMultiplier: 1.1,
			},
			{
				name: "Recompensas do bundle não agradam.",
				revenueMultiplier: 0.9,
				playersMultiplier: 0.95,
			},
		],
		skin: [
			{ name: "Nova skin se torna viral!", revenueMultiplier: 1.4, playersMultiplier: 1.1 },
			{
				name: "Visual controverso gera polêmica.",
				revenueMultiplier: 0.85,
				playersMultiplier: 0.95,
			},
			{
				name: "Colaboração com marca famosa aumenta hype!",
				revenueMultiplier: 1.3,
				playersMultiplier: 1.2,
			},
			{ name: "Preço elevado reduz vendas.", revenueMultiplier: 0.8, playersMultiplier: 0.9 },
			{
				name: "Pacote de skins limitado esgota rápido!",
				revenueMultiplier: 1.5,
				playersMultiplier: 1.1,
			},
			{
				name: "Plágio é descoberto e a skin é removida.",
				revenueMultiplier: 0.7,
				playersMultiplier: 0.8,
			},
			{
				name: "Variação de cores agrada jogadores!",
				revenueMultiplier: 1.2,
				playersMultiplier: 1.05,
			},
			{
				name: "Falta de opções para personagens específicos.",
				revenueMultiplier: 0.9,
				playersMultiplier: 0.95,
			},
			{
				name: "Efeito especial exclusivo aumenta demanda!",
				revenueMultiplier: 1.3,
				playersMultiplier: 1.1,
			},
			{
				name: "Concorrente lança skins mais inovadoras.",
				revenueMultiplier: 0.8,
				playersMultiplier: 0.9,
			},
		],
		event: [
			{
				name: "Evento de tempo limitado bate recordes!",
				revenueMultiplier: 1.5,
				playersMultiplier: 1.3,
			},
			{
				name: "Falha no servidor atrapalha evento.",
				revenueMultiplier: 0.75,
				playersMultiplier: 0.8,
			},
			{
				name: "Cross-over com outra franquia é sucesso!",
				revenueMultiplier: 1.4,
				playersMultiplier: 1.2,
			},
			{
				name: "Eventos repetitivos desanimam jogadores.",
				revenueMultiplier: 0.9,
				playersMultiplier: 0.95,
			},
			{
				name: "Sistema de recompensas incentiva engajamento!",
				revenueMultiplier: 1.3,
				playersMultiplier: 1.15,
			},
			{
				name: "Influenciadores criticam premiações.",
				revenueMultiplier: 0.85,
				playersMultiplier: 0.9,
			},
			{
				name: "Evento surpresa gera alta expectativa!",
				revenueMultiplier: 1.4,
				playersMultiplier: 1.2,
			},
			{
				name: "Erros de balanceamento frustram jogadores.",
				revenueMultiplier: 0.8,
				playersMultiplier: 0.9,
			},
			{ name: "Modo inédito é bem recebido!", revenueMultiplier: 1.3, playersMultiplier: 1.2 },
			{
				name: "Baixa adesão ao evento planejado.",
				revenueMultiplier: 0.9,
				playersMultiplier: 0.95,
			},
		],
	};

	const possibleHappenings = happeningsByType[type] || [];
	return Math.random() < 0.5 && possibleHappenings.length > 0
		? possibleHappenings[Math.floor(Math.random() * possibleHappenings.length)]
		: null;
}
