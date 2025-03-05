import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const router = Router();

const prismaPublicStats = new PrismaClient()

router.post('/', async (req: Request, res: Response) => {
  const { articleSlug, reactions, currentReaction, visits } = req.body;

  try {
    const newStats = await prismaPublicStats.articleStats.create({
      data: {
        article_slug: articleSlug,
        reactions: reactions,
        current_reaction: currentReaction,
        visits: visits,
      },
    });
    res.status(201).json(newStats);
  } catch (error) {
    console.error('Error creating article stats:', error);
    res.status(500).json({ error: 'Erro ao criar estatísticas do artigo' });
  }
});

router.put('/:articleSlug', async (req: Request, res: Response) => {
  const { articleSlug } = req.params;
  const { reactions, currentReaction, visits } = req.body;

  try {
    const updatedStats = await prismaPublicStats.articleStats.update({
      where: { article_slug: articleSlug },
      data: {
        reactions: reactions,
        current_reaction: currentReaction,
        visits: visits,
      },
    });
    res.json(updatedStats);
  } catch (error) {
    console.error('Error updating article stats:', error);
    res.status(500).json({ error: 'Erro ao atualizar estatísticas do artigo' });
  }
});

const handler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { articleSlug } = req.params;

  try {
    const stats = await prismaPublicStats.articleStats.findUnique({
      where: { article_slug: articleSlug },
    });

    if (!stats) {
      res.status(404).json({ error: 'Estatísticas do artigo não encontradas' });
      return;
    }

    res.json(stats);
  } catch (error) {
    console.error('Error fetching article stats:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas do artigo' });
  }
};

router.get('/:articleSlug', handler);


export default router;