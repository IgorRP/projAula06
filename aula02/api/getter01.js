export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userText = req.body.text;

  if (!userText) {
    return res.status(400).json({ error: 'Sem texto enviado' });
  }
  
  try {
    const processedText = userText.split('').reverse().join('');;
    return res.json({ result: processedText });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
