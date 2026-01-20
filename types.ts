export enum AppScreen {
  HOME = 'HOME',
  AR_STEP_1 = 'AR_STEP_1',
  AR_STEP_2 = 'AR_STEP_2',
  AR_STEP_3 = 'AR_STEP_3',
  ANALYSIS_RESULT = 'ANALYSIS_RESULT',
  TV_SELECTION = 'TV_SELECTION',
  SIMULATION_RESULT = 'SIMULATION_RESULT',
  LANDSCAPE_PREVIEW = 'LANDSCAPE_PREVIEW'
}

export interface TvModel {
  id: string;
  name: string;
  subtext: string;
  price: string;
  image: string;
  tag?: string;
  tagColor?: string;
  bestDist?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  specs?: string;
}