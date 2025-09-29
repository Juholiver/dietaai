import { useState } from 'react'
import { analyzeCode } from './services/gemini.js'
import './App.css'

function App() {
  const [age, setAge] = useState()
  const [weight, setWeight] = useState()
  const [height, setHeight] = useState()
  const [sexo, setSexo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');



    const handleAnalyze = async () => {
    if (!age || !weight || !height || !sexo || !objetivo) return
    
    setLoading(true);
    setError('');
    setResult('');

    

    try{
      const analysis = await analyzeCode(age, weight, height, sexo, objetivo);
      setResult(analysis);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <main>
      <div className='container'>
        <h1 className='title'>Dieta Ai</h1>
        <h3 className='subtitle'>A sua dieta personalizada</h3>
      </div>
      <div className='input-group'>
        <label htmlFor='age'>Idade:</label>
        <input type='number' id='age' name='age' value={age} onChange={(e) => setAge(e.target.value)} />

        <label htmlFor='weight'>Peso:</label>
        <input type='number' id='weight' name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} />

        <label htmlFor='height'>Altura:</label>
        <input type='number' id='height' name='height' value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>

  <div>
    <label className="Sexo">
      Sexo
    </label>
    <div className="Container-Sexo">
      <button 
        onClick={() => setSexo('masculino')}
        className={sexo === 'masculino' ? 'btn-selected btn-masculino' : 'btn-default'}
      >
        ♂ Masculino
      </button>
      <button 
        onClick={() => setSexo('feminino')}
        className={sexo === 'feminino' ? 'btn-selected btn-feminino' : 'btn-default'}
      >
        ♀ Feminino
      </button>
    </div>
  </div>

      <div className="Container-Objetivo">
      <button 
        onClick={() => setObjetivo('Perder peso')}
        className={objetivo === 'Perder peso' ? 'btn-objetivo-selected btn-objetivo-perder' : 'btn-default'}
      >
        Perder Peso
      </button>
      <button 
        onClick={() => setObjetivo('Hipertrofia')}
        className={objetivo === 'Hipertrofia' ? 'btn-objetivo-selected btn-Hipertrofia' : 'btn-default'}
      >
        Hipertrofia
      </button>
    </div>
    
    <button className="analyze-button" onClick={handleAnalyze} disabled={!age || !weight || !height || !sexo || !objetivo || loading }>
      {loading ? 'Gerando Plano' : 'Gerar Plano'}
    </button>

    {error && <div className="error-message">{error}</div>}

    {result && (
      <div className="result-container">
        <h2 className="result-title">Resultado da dieta:</h2>
        <div className="result-content">{result}</div>
      </div>
    )}

  </main>
  )
}

export default App
