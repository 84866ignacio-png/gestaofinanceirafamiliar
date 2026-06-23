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

    const ai = new GoogleGenAI({ apiKey });
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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ advice: response.text });
  } catch (error: any) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: "Erro ao gerar aconselhamento financeiro. Detalhes: " + (error.message || error) },
      { status: 500 }
    );
  }
}
