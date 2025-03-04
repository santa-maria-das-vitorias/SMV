import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
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

router.get('/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const category = prisma.category.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        articles: {
          select: {
            article: {
              select: {
                id: true,
                title: true,
                slug: true,
                date: true,
                image: true,
                have_image: true,
                author: true,
                categories: {
                  select: {
                    category_id: true
                  }
                }
              }
            }
          }
        }
      }
    }).then((category) => {
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      const articles = category.articles.map(articleCategory => articleCategory.article);

      res.json(articles);
    }).catch((error) => {
      console.error('Erro ao buscar artigos da categoria:', error);
      res.status(500).json({ error: 'Erro ao buscar artigos da categoria' });
    });
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ error: 'Erro ao buscar categoria' });
  }
});

export default router;