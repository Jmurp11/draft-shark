export interface Mention {
  items: any[];
  labelKey: string;
  triggerChar: string;
  maxItems: number;
  allowSpace: boolean;
  mentionSelect: any;
}

export interface MentionConfig {
  mentions: Mention[];
}
