import type { BizInfo } from "./bizInfo.interface";
import type { CvTechnicalInfo } from "./cv-technical.interface";
import type { Technical } from "./technical.interface";

export type Cv = {
  id : string | undefined,
  furigana : string | undefined,
  is_actived : boolean,
  name: string | undefined,
  gender: string | undefined,
  birthday: string | undefined,
  lang1_hearing: string | undefined,
  lang1_speaking: string | undefined,
  lang1_reading: string | undefined,
  lang1_writing: string | undefined,
  lang2_hearing: string | undefined,
  lang2_speaking: string | undefined,
  lang2_reading: string | undefined,
  lang2_writing: string | undefined,
  last_university_name: string | undefined,
  subject: string | undefined,
  graduation_year: string | undefined,
  final_education: string | undefined,
  certificate1_name: string | undefined,
  certificate1_year: number | undefined,
  certificate2_name: string | undefined,
  certificate2_year: number | undefined,
  certificate3_name: string | undefined,
  certificate3_year: number | undefined,
  certificate4_name: string | undefined,
  certificate4_year: number | undefined,
  work_process: string | undefined,
  note: string | undefined,
  technicals : Technical[]  | undefined,
  cvTechInfos : CvTechnicalInfo[]  | undefined,
  bizInfos : BizInfo[] | undefined
};
