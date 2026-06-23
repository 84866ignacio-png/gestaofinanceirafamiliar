import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini with server-only key
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "A chave API do Gemini não está configurada neste ambiente. Por favor, configure GEMINI_API_KEY no painel de Segredos." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    const { familyData, transactions, activeMember } = await req.json();

    const transactionsSummary = transactions && transactions.length > 0
      ? transactions.map((t: any) => `- ${t.member}: ${t.type === "expense" ? "Gasto" : "Ganho"} de R$ ${t.amount.toFixed(2)} em ${t.category} (${t.description})`).join("\n")
      : "Nenhuma transação registrada ainda.";

    const prompt = `
Você é o "Giga", um conselheiro financeiro de IA especializado em finanças familiares e economia doméstica. Seu tom é amigável, acolhedor, didático e motivacional, misturando sabedoria financeira com carinho familiar.

Você está conversando com a família, e o membro ativo agora é: ${activeMember?.name || "Membro da Família"} (${activeMember?.role || "Membro"}).

Aqui estão os dados financeiros atuais da família:
- Saldo Total Consolidado: R$ ${familyData?.balance?.toFixed(2) || "0.00"}
- Orçamento Mensal Limite: R$ ${familyData?.budgetLimit?.toFixed(2) || "0.00"}
- Total Gasto no Mês: R$ ${familyData?.totalExpenses?.toFixed(2) || "0.00"}
- Metas de Economia:
  * Viagem de Férias: Progresso de R$ ${familyData?.goals?.travel?.current?.toFixed(2) || "0"} de R$ ${familyData?.goals?.travel?.target?.toFixed(2) || "0"}
  * Reserva de Emergência: Progresso de R$ ${familyData?.goals?.emergency?.current?.toFixed(2) || "0"} de R$ ${familyData?.goals?.emergency?.target?.toFixed(2) || "0"}

Transações recentes da família:
${transactionsSummary}

Instruções para a resposta:
1. Analise se a família está dentro do limite do orçamento (R$ ${familyData?.budgetLimit?.toFixed(2) || "0.00"}) comparado aos gastos (R$ ${familyData?.totalExpenses?.toFixed(2) || "0.00"}).
2. Diga palavras de motivação específicas para o membro ativo (${activeMember?.name}), com base no seu papel (${activeMember?.role === "admin" ? "como administrador financeiro do lar" : "como filho/dependente aprendendo a poupar"}).
3. Ofereça 3 dicas práticas em formato de tópicos curtos e descontraídos para economizar essa semana com base nas categorias usadas ou de forma geral para o lar.
4. Mantenha a resposta curta, estruturada em Markdown, amigável e puramente em PORTUGUÊS. Nunca mencione termos de depuração técnica ou de código.
`;

    let adviceText = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });
      adviceText = response.text || "";
    } catch (apiError: any) {
      console.warn("Gemini API was temporarily unavailable. Triggering friendly local backup advisor...", apiError);
      
      const balance = familyData?.balance || 0;
      const budgetLimit = familyData?.budgetLimit || 1000;
      const totalExpenses = familyData?.totalExpenses || 0;
      const spaceLeft = budgetLimit - totalExpenses;
      const overBudget = totalExpenses > budgetLimit;

      adviceText = `### 🤖 Conselheiro Giga (Modo de Contingência Ativo)

*Nota: O servidor do Gemini está com alta demanda temporária, mas o Giga preparou um parecer de contingência especial para vocês imediatamente!*

Olá, **${activeMember?.name || "Membro da Família"}**! Como conselheiro oficial do lar, fiz um levantamento rápido dos números da nossa casa:

${overBudget 
  ? `⚠️ **Alerta de Orçamento:** Ultrapassamos nosso teto de gastos estipulado de **R$ ${budgetLimit.toFixed(2)}** por um valor de **R$ ${(totalExpenses - budgetLimit).toFixed(2)}**! Precisamos pisar no freio com urgência esta semana.` 
  : `✅ **Orçamento Sob Controle:** Temos **R$ ${spaceLeft.toFixed(2)}** de margem segura em relação ao nosso limite mensal de **R$ ${budgetLimit.toFixed(2)}**. Ótimo trabalho de disciplina familiar!`
}

#### 🎯 Palavra do Giga para você, **${activeMember?.name}** (${activeMember?.role === "admin" ? "Gestor do Lar" : "Membro Aprendiz"}):
${activeMember?.role === "admin" 
  ? "Como o administrador financeiro, sua liderança e monitoramento diário são o escudo da nossa economia. Continue revisando as contas e incentivando todos a lançarem seus registros!" 
  : "Seu papel é fundamental para poupar e ajudar no orçamento de casa. Que tal focar em reduzir pequenos gastos de lazer nos próximos dias?"
}

#### 💡 3 Conselhos Práticos de Ouro para a Semana:
1. **Pequenos Vazamentos:** Se houver gastos de assinatura ou compras não essenciais na lista, pause-os temporariamente para restabelecer o fôlego de caixa.
2. **Revisores em Ação:** Tirar 10 minutos em família no jantar para alinhar as prioridades de compras coletivas.
3. **Resgate Focado:** Lembrar das nossas metas de **Viagem de Férias** e **Reserva de Emergência**. Cada real economizado hoje é um passo a mais em direção a esses objetivos comuns!

*Força e foco no planejamento financeiro familiar! Estamos juntos nisso.*`;
    }

    return NextResponse.json({ advice: adviceText });
  } catch (error: any) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: "Erro ao gerar aconselhamento financeiro. Detalhes: " + (error.message || error) },
      { status: 500 }
    );
  }
}
