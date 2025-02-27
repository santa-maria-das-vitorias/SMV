import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        date: true,
        image: true,
        have_image: true,
        content: true,
        author: true,
        categories: {
          select: {
            category_id: true
          }
        }
      }
    });

    res.json(articles);
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    res.status(500).json({ error: 'Erro ao buscar artigos' });
  }
});

export default router;
