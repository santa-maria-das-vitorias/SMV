import express from 'express';
import { PrismaClient } from '@prisma/client';
import categoryRoutes from './routes/categories';
import articleRoutes from './routes/articles';
import statsRoutes from './routes/stats';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/stats', statsRoutes);

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});