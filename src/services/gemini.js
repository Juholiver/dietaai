import { GoogleGenerativeAI } from '@google/generative-ai';
const geminiClient = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeCode(age, weight, height, sexo, objetivo) {

    const prompt = `Crie um plano alimentar completo e personalizado para uma pessoa com as seguintes informações:

Sexo: ${sexo}

Peso atual: ${weight} kg

Altura: ${height}

Idade: ${age} anos

Objetivo: ${objetivo}

💡 Instruções:

Considere apenas os parâmetros acima (ignore qualquer outro dado não listado).

O plano deve ser nutritivo, equilibrado e voltado ao objetivo informado (ex: perda de peso, ganho de massa, manutenção, etc.).

Apresente sugestões de alimentos de forma didática, prática e fácil de seguir.

Utilize uma linguagem amigável, como se estivesse explicando para um usuário de aplicativo.

Estruture a dieta por dia da semana, indicando as refeições em tópicos.

🍽 Formato de saída desejado

🗓 Segunda-feira:

Café da Manhã:

(Sugestões de alimentos e quantidades aproximadas)

Lanche da Manhã:

(...)

Almoço:

(...)

Lanche da Tarde:

(...)

Jantar:

(...)

Ceia:

(...)

🗓 Terça-feira:
(repita o mesmo formato até domingo)
    `

    try {
        const model = geminiClient.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Erro ao analisar o código:', error);
        throw new Error("Erro ao conectar com a IA, verifique sua chave de API e tente novamente.");
    }
    
}