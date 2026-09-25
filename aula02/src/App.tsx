import { useState } from 'react'

function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      console.log('Enviando texto para o servidor:', inputText);

      const response = await fetch('/api/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request falhou. Status: ${response.status}`);
      }

      const data = await response.json();
      setResponseText(JSON.stringify(data.result, null, 2));
    
    } catch (error) {
      console.error('Erro ao enviar o texto:', error);
      setResponseText(error.message || 'Sem resposta do servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 

      <div className="ticks"></div>

      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>Envio de texto para processamento no backend</h2>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escreva algo aqui..."
          rows={5}
          cols={40}
        ></textarea>
        
        <br /><br />
        
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar para o Servidor'}
        </button>

        <hr />

        <h3>Resposta do Servidor:</h3>
        <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '4px', minHeight: '40px' }}>
          {responseText}
        </div>
        
      </div>
      
    </>
  )
}

export default App
