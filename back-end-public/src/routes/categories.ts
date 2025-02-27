import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    console.log('Fetching categories...');
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

export default router;