export interface RankData {
  level: string;
  percentile: number;
  score: number;
}

const RANK_THRESHOLDS = [
  { level: "S+", threshold: 1 },
  { level: "S", threshold: 12.5 },
  { level: "A+", threshold: 25 },
  { level: "A", threshold: 37.5 },
  { level: "B+", threshold: 50 },
  { level: "B", threshold: 62.5 },
  { level: "C+", threshold: 75 },
  { level: "C", threshold: 100 },
];

function exponentialCdf(x: number): number {
  return 1 - 2 ** -x;
}

function logNormalCdf(x: number): number {
  if (x <= 0) return 0;
  return 0.5 * (1 + erf((Math.log(x) - 0) / (1 * Math.SQRT2)));
}

function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

export function calculateRank(stats: {
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
  stars: number;
  followers: number;
  contributedTo: number;
}): RankData {
  const COMMITS_MEDIAN = 250;
  const PRS_MEDIAN = 50;
  const ISSUES_MEDIAN = 25;
  const REVIEWS_MEDIAN = 2;
  const STARS_MEDIAN = 50;
  const FOLLOWERS_MEDIAN = 10;
  const CONTRIBUTED_MEDIAN = 5;

  const COMMITS_WEIGHT = 2;
  const PRS_WEIGHT = 3;
  const ISSUES_WEIGHT = 1;
  const REVIEWS_WEIGHT = 1;
  const STARS_WEIGHT = 4;
  const FOLLOWERS_WEIGHT = 1;
  const CONTRIBUTED_WEIGHT = 1;

  const TOTAL_WEIGHT =
    COMMITS_WEIGHT +
    PRS_WEIGHT +
    ISSUES_WEIGHT +
    REVIEWS_WEIGHT +
    STARS_WEIGHT +
    FOLLOWERS_WEIGHT +
    CONTRIBUTED_WEIGHT;

  const score =
    (COMMITS_WEIGHT * exponentialCdf(stats.commits / COMMITS_MEDIAN) +
      PRS_WEIGHT * exponentialCdf(stats.prs / PRS_MEDIAN) +
      ISSUES_WEIGHT * exponentialCdf(stats.issues / ISSUES_MEDIAN) +
      REVIEWS_WEIGHT * exponentialCdf(stats.reviews / REVIEWS_MEDIAN) +
      STARS_WEIGHT * logNormalCdf(stats.stars / STARS_MEDIAN) +
      FOLLOWERS_WEIGHT * logNormalCdf(stats.followers / FOLLOWERS_MEDIAN) +
      CONTRIBUTED_WEIGHT * exponentialCdf(stats.contributedTo / CONTRIBUTED_MEDIAN)) /
    TOTAL_WEIGHT;

  const percentile = (1 - score) * 100;

  let level = "C";
  for (const rank of RANK_THRESHOLDS) {
    if (percentile <= rank.threshold) {
      level = rank.level;
      break;
    }
  }

  return { level, percentile, score };
}
