import { GoogleGenerativeAI } from '@google/generative-ai';
const geminiClient = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeCode(age, weight, height, sexo, objetivo) {

    const prompt = `Crie uma dieta completa para uma pessoa do sexo ${sexo} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objetivo}, e ignore qualquer outro parametro que não seja os passados, forneça sugestões de alimentos de forma didática e clara:
    - Forneça uma lista de alimentos recomendados para cada dia da semana.
    - Nesse formato : 
    - Cafe da Manha:
    - Lanche da Manha:
    - Almoço :
    - Lanche da Tarde:
    - Jantar:
    - Ceia:
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