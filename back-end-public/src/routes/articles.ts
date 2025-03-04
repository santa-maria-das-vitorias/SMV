import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        date: true,
        image: true,
        have_image: true,
        content: false,
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

router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
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

    if (!article) {
      res.status(404).json({ error: 'Artigo não encontrado' });
      return;
    }

    res.json(article);
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    res.status(500).json({ error: 'Erro ao buscar artigo' });
  }
});

export default router;