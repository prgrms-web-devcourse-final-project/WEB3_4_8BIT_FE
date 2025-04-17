export interface SeaTimeData {
  tph_level: string;
  tph_time: string;
  hl_code: "저조" | "고조";
}

export type SeaTimeResponse = {
  data: SeaTimeData[];
};
