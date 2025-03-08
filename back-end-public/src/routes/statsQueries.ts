import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função de utilidade para formatar as reações
export const formatReactions = (reactions: any) => ({
  like: reactions.like || 0,
  love: reactions.love || 0,
  surprised: reactions.surprised || 0,
  sad: reactions.sad || 0,
});

// Função para buscar estatísticas do artigo
export const getArticleStats = async (articleSlug: string) => {
  return await prisma.articleStats.findUnique({
    where: { article_slug: articleSlug },
  });
};

// Função para criar estatísticas do artigo
export const createArticleStats = async (articleSlug: string, reactions: any, visits: number) => {
  await prisma.$executeRaw`
    CALL public_stats.create_article_stats(${articleSlug}, ${JSON.stringify(reactions)}::jsonb, ${visits})
  `;
};

// Função para incrementar visita e reação do artigo
export const incrementArticleStats = async (articleSlug: string, reactionType: string) => {
  await Promise.all([
    prisma.$executeRaw`CALL public_stats.increment_article_visit(${articleSlug})`,
    prisma.$executeRaw`CALL public_stats.increment_article_reaction(${articleSlug}, ${reactionType})`
  ]);
};