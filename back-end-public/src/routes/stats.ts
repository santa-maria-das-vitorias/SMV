import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { formatReactions, getArticleStats, createArticleStats, incrementArticleStats } from './statsQueries';

const router = Router();

// Função de utilidade para validação
const validateRequest = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return false;
  }
  return true;
};

// POST - Criar estatísticas
router.post(
  '/',
  [
    body('articleSlug').isString().trim().escape(),
    body('reactions').isObject(),
    body('visits').isInt(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    if (!validateRequest(req, res)) return;

    const { articleSlug, reactions, visits } = req.body;

    try {
      const existingStats = await getArticleStats(articleSlug);

      if (existingStats) {
        res.status(400).json({ error: 'Estatísticas do artigo já existem' });
        return;
      }

      await createArticleStats(articleSlug, reactions, visits);

      res.status(201).json({
        articleSlug,
        reactions: formatReactions(reactions),
        visits,
      });
    } catch (error) {
      console.error('Error creating article stats:', error);
      res.status(500).json({ error: 'Erro ao criar estatísticas do artigo' });
    }
  }
);

// PUT - Atualizar estatísticas
router.put(
  '/:articleSlug',
  [
    param('articleSlug').isString().trim().escape(),
    body('reactionType').isString().trim().escape(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    if (!validateRequest(req, res)) return;

    const { articleSlug } = req.params;
    const { reactionType } = req.body;

    try {
      const existingStats = await getArticleStats(articleSlug);

      if (!existingStats) {
        res.status(404).json({ error: 'Estatísticas do artigo não encontradas' });
        return;
      }

      await incrementArticleStats(articleSlug, reactionType);

      const updatedStats = await getArticleStats(articleSlug);

      if (!updatedStats || !updatedStats.reactions) {
        res.status(500).json({ error: 'Erro ao atualizar estatísticas do artigo' });
        return;
      }

      res.json({
        articleSlug: updatedStats.article_slug,
        reactions: formatReactions(updatedStats.reactions),
        visits: updatedStats.visits,
      });
    } catch (error) {
      console.error('Error updating article stats:', error);
      res.status(500).json({ error: 'Erro ao atualizar estatísticas do artigo' });
    }
  }
);

// GET - Buscar estatísticas
router.get(
  '/:articleSlug',
  async (req: Request, res: Response): Promise<void> => {
    const { articleSlug } = req.params;

    try {
      const stats = await getArticleStats(articleSlug);

      if (!stats || !stats.reactions) {
        res.status(404).json({ error: 'Estatísticas do artigo não encontradas' });
        return;
      }

      res.json({
        articleSlug: stats.article_slug,
        reactions: formatReactions(stats.reactions),
        visits: stats.visits,
      });
    } catch (error) {
      console.error('Error fetching article stats:', error);
      res.status(500).json({ error: 'Erro ao buscar estatísticas do artigo' });
    }
  }
);

export default router;