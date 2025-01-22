export function getRandomEvent() {
	const events = [
		// Eventos Positivos
		{ name: "Grande influencer jogou seu jogo!", revenue: 15000, playersLost: -30000 },
		{ name: "Jogo viraliza nas redes sociais!", revenue: 20000, playersLost: -50000 },
		{ name: "Update surpreende jogadores!", revenue: 12000, playersLost: -25000 },
		{ name: "Streamer popular faz maratona de seu jogo!", revenue: 18000, playersLost: -40000 },
		{
			name: "Recebeu premiação de 'Melhor Atualização do Mês'!",
			revenue: 10000,
			playersLost: -20000,
		},
		{ name: "Mecânica inovadora encanta jogadores!", revenue: 14000, playersLost: -35000 },
		{ name: "Colaboração com franquia famosa atrai público!", revenue: 25000, playersLost: -60000 },
		{ name: "Novo sistema de progressão anima jogadores!", revenue: 11000, playersLost: -22000 },
		{ name: "Recebeu destaque na loja digital!", revenue: 13000, playersLost: -28000 },
		{ name: "Seu jogo foi elogiado por uma revista famosa!", revenue: 8000, playersLost: -15000 },

		// Eventos Neutros (Pouco impacto)
		{ name: "Nada de relevante aconteceu.", revenue: 0, playersLost: 0 },
		{ name: "Semana morna, sem grandes acontecimentos.", revenue: 2000, playersLost: 2000 },
		{ name: "Alguns jogadores retornam por nostalgia.", revenue: 3000, playersLost: -5000 },
		{ name: "Servidor se manteve estável.", revenue: 1000, playersLost: 0 },
		{ name: "Pequenas melhorias no jogo são bem recebidas.", revenue: 4000, playersLost: -3000 },

		// Eventos Negativos
		{ name: "Concorrente lança jogo parecido!", revenue: -8000, playersLost: 20000 },
		{ name: "Bug catastrófico afasta jogadores!", revenue: -10000, playersLost: 30000 },
		{ name: "Vazamento de conteúdo antes da hora!", revenue: -5000, playersLost: 10000 },
		{
			name: "Hacker encontra falha e estraga a economia do jogo!",
			revenue: -12000,
			playersLost: 25000,
		},
		{ name: "Desenvolvedores atrasam atualização!", revenue: -6000, playersLost: 12000 },
		{
			name: "Seu jogo recebe críticas negativas por balanceamento!",
			revenue: -7000,
			playersLost: 15000,
		},
		{
			name: "Fórum oficial tem polêmica envolvendo um moderador!",
			revenue: -5000,
			playersLost: 9000,
		},
		{ name: "Jogo concorrente oferece promoção absurda!", revenue: -15000, playersLost: 35000 },
		{ name: "Servidor instável faz jogadores abandonarem!", revenue: -10000, playersLost: 18000 },
		{ name: "Microtransações são criticadas por serem caras!", revenue: -9000, playersLost: 14000 },
		{ name: "Influencer famoso critica seu jogo!", revenue: -11000, playersLost: 20000 },
		{ name: "Atualização tem bug que trava progresso!", revenue: -7000, playersLost: 16000 },
		{
			name: "Região importante do jogo tem quedas constantes!",
			revenue: -6000,
			playersLost: 10000,
		},
		{
			name: "Comunidade pede mudanças urgentes no balanceamento!",
			revenue: -4000,
			playersLost: 8000,
		},
		{
			name: "Sistema de ranking está quebrado e jogadores reclamam!",
			revenue: -5000,
			playersLost: 12000,
		},

		// Eventos Catastróficos
		{ name: "Processo judicial ameaça a existência do jogo!", revenue: -25000, playersLost: 50000 },
		{
			name: "Fuga em massa de jogadores para jogo concorrente!",
			revenue: -20000,
			playersLost: 60000,
		},
		{ name: "Desenvolvedor-chave abandona o projeto!", revenue: -18000, playersLost: 45000 },
		{ name: "Política de monetização leva a boicote!", revenue: -22000, playersLost: 55000 },
		{ name: "Exploit grave força rollback de servidores!", revenue: -20000, playersLost: 40000 },
		{ name: "Empresa-mãe reduz orçamento para o jogo!", revenue: -15000, playersLost: 30000 },
		{
			name: "Update prometido é cancelado, revoltando jogadores!",
			revenue: -17000,
			playersLost: 38000,
		},
		{ name: "Review bomb atinge seu jogo devido a mudanças!", revenue: -12000, playersLost: 32000 },
		{
			name: "Comunidade decide migrar para servidores privados!",
			revenue: -25000,
			playersLost: 50000,
		},
		{ name: "Desenvolvedores são acusados de plágio!", revenue: -14000, playersLost: 35000 },

		// Eventos Raros e Absurdos
		{ name: "Servidor foi invadido e dados vazaram!", revenue: -30000, playersLost: 70000 },
		{
			name: "Bug transforma NPCs em deuses, viralizando na internet!",
			revenue: 25000,
			playersLost: -50000,
		},
		{
			name: "Parceria com celebridade gera skins exclusivas!",
			revenue: 30000,
			playersLost: -70000,
		},
		{ name: "Jogador descobre easter egg perdido há anos!", revenue: 15000, playersLost: -25000 },
		{
			name: "Exploit permite jogadores gerarem dinheiro infinito!",
			revenue: -20000,
			playersLost: 40000,
		},
	];

	// Determina quantos eventos serão retornados (0, 1 ou 2)
	const eventCount = Math.floor(Math.random() * 3); // Gera um número de 0 a 2

	// Embaralha os eventos e pega os primeiros `eventCount`
	const shuffledEvents = events.sort(() => Math.random() - 0.5).slice(0, eventCount);

	return shuffledEvents;
}
