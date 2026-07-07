export type details = {
  title: string;
  description: string;
};

export type ComparisonTrainingCard = {
  title: string;
  badge?: string;
  features: details[];
};

export type ConmparisonTraining = {
  blockType: 'ConmparisonTraining';
  heading: string;
  knowledgeBase: ComparisonTrainingCard;
  trainingPlatform: ComparisonTrainingCard;
};
