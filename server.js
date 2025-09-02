import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(express.json());

// Endpoint para salvar dados no data.json
app.post('/api/save-data', async (req, res) => {
  try {
    const data = req.body;
    const filePath = path.join(__dirname, 'data.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true, message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
