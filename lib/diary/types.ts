export type KnowledgeCategory =
  | "identity"
  | "career"
  | "education"
  | "technology"
  | "project"
  | "philosophy"
  | "relationship"
  | "contact";

export type KnowledgeRecord = {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  keywords: string[];
  connections: string[];
  weight: 1 | 2 | 3;
  period?: string;
};

export type ConversationTurn = {
  role: "visitor" | "diary";
  text: string;
};

export type DiaryFocus = {
  category?: KnowledgeCategory;
  recordId?: string;
};
