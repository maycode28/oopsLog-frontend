import type { AIResult, AnimalAIItem } from '../types/mindTuning.types';
import type { AnalyzeFlipCardDto, AnalyzeResponseDto } from './types';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const ensureNonEmptyString = (value: unknown, fieldName: string) => {
  if (!isNonEmptyString(value)) {
    throw new Error(`Invalid analysis response. (${fieldName})`);
  }

  return value.trim();
};

const mapFlipCard = (card: AnalyzeFlipCardDto | undefined, fact: string | undefined): AnimalAIItem => {
  if (!card) {
    return {};
  }

  return {
    label: card.l,
    fact,
    distortion: card.m,
    perspective: card.r,
    thanks: fact,
  };
};

const validateFlipCards = (value: unknown): AnalyzeFlipCardDto[] => {
  if (!Array.isArray(value)) {
    throw new Error('Invalid analysis response. (fc)');
  }

  return value.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Invalid analysis response. (fc[${index}])`);
    }

    const card = item as Record<string, unknown>;

    return {
      l: ensureNonEmptyString(card.l, `fc[${index}].l`),
      m: ensureNonEmptyString(card.m, `fc[${index}].m`),
      r: ensureNonEmptyString(card.r, `fc[${index}].r`),
    };
  });
};

const validateFacts = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    throw new Error('Invalid analysis response. (fs)');
  }

  const facts = value
    .filter(isNonEmptyString)
    .map((fact) => fact.trim());

  if (facts.length === 0) {
    throw new Error('Invalid analysis response. (fs)');
  }

  return facts;
};

export function parseAnalyzeResponse(payload: unknown): AnalyzeResponseDto {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid analysis response.');
  }

  const data = payload as Record<string, unknown>;

  return {
    ti: ensureNonEmptyString(data.ti, 'ti'),
    fc: validateFlipCards(data.fc),
    fs: validateFacts(data.fs),
    am: ensureNonEmptyString(data.am, 'am'),
  };
}

export function mapAnalyzeResponseToAIResult(payload: unknown): AIResult {
  const data = parseAnalyzeResponse(payload);

  return {
    flipCards: data.fc.map((card, index) => ({
      label: card.l,
      mistakenThought: card.m,
      reframedThought: card.r,
      fact: data.fs[index],
    })),
    animals: [
      mapFlipCard(data.fc[0], data.fs[0]),
      mapFlipCard(data.fc[1], data.fs[1]),
      mapFlipCard(data.fc[2], data.fs[2]),
    ],
    title: data.ti,
    summary: data.am,
    analysisMessage: data.am,
    facts: data.fs,
    comfortMessage: data.am,
  };
}
