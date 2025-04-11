export interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
  isAuthor: boolean;
  authorImageUrl?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isAuthor: boolean;
  authorImageUrl?: string;
  childCount: number;
  replies: Reply[];
}

export interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
}

export interface ReplyFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
}

export interface CommentItemProps {
  comment: Comment;
  isAuthor: boolean;
  onUpdateComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onToggleReplies: (commentId: string) => void;
  isExpanded: boolean;
  children?: React.ReactNode;
}

export interface ReplyItemProps {
  reply: Reply;
  isAuthor: boolean;
  onUpdate: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}
