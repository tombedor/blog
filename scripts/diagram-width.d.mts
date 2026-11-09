export type DiagramScene = {
  elements?: Array<{
    type?: string;
    x?: number;
    width?: number;
    fontSize?: number;
    isDeleted?: boolean;
    points?: Array<[number, number]>;
  }>;
};

export function recommendedDiagramWidth(scene: DiagramScene): number | null;
