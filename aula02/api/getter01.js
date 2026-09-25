export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const userText = req.body.text;

  if (!userText) {
    return res.status(400).json({ error: 'Sem texto enviado' });
  }
  
  try {

    //aqui eh realizado qualquer processamento de back end desejado
    const processedText = userText.split('').reverse().join('');
    //ateh aqui
    
    
    return res.json({ result: processedText });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
