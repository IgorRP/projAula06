import express from 'express';

const app = express();

app.use(express.json());

app.post('/api/server', async (req, res) => {
  const userText = req.body.text;

  if (!userText) {
    return res.status(400).json({ error: 'Sem texto enviado' });
  }

  try {
    const processedText = userText;
    return res.json({ result: processedText });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default app;
