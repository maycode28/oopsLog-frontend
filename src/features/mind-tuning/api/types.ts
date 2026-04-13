export interface AnalyzeRequest {
  text: string;
}

export interface AnalyzeFlipCardDto {
  l: string;
  m: string;
  r: string;
}

export interface AnalyzeResponseDto {
  ti: string;
  fc: AnalyzeFlipCardDto[];
  fs: string[];
  am: string;
}
