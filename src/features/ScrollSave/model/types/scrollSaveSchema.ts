export interface ScrollSchema {
   path: string;
   position: number;
}

export type ScrollPosition = Record<string, ScrollSchema>;

export interface ScrollSaveSchema {
   scroll: ScrollPosition;
   direction: string;
}
