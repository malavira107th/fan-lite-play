import { describe, expect, it } from "vitest";

// Re-implement the points calculation function here for isolated testing
// (mirrors the logic in server/routers.ts)
function calculatePoints(perf: {
  runsScored: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  fifties: number;
  hundreds: number;
  ducks: number;
  wickets: number;
  maidens: number;
  dotBalls: number;
  catches: number;
  stumpings: number;
  runOuts: number;
}): number {
  let pts = 0;
  pts += perf.runsScored * 1;
  pts += perf.fours * 1;
  pts += perf.sixes * 2;
  pts += perf.fifties * 8;
  pts += perf.hundreds * 16;
  pts -= perf.ducks * 2;
  if (perf.ballsFaced >= 10) {
    const sr = (perf.runsScored / perf.ballsFaced) * 100;
    if (sr >= 170) pts += 6;
    else if (sr >= 150) pts += 4;
    else if (sr >= 130) pts += 2;
    else if (sr < 50) pts -= 6;
    else if (sr < 60) pts -= 4;
    else if (sr < 70) pts -= 2;
  }
  pts += perf.wickets * 25;
  pts += perf.maidens * 8;
  pts += perf.dotBalls * 1;
  if (perf.wickets >= 5) pts += 16;
  else if (perf.wickets >= 4) pts += 8;
  else if (perf.wickets >= 3) pts += 4;
  pts += perf.catches * 8;
  pts += perf.stumpings * 12;
  pts += perf.runOuts * 6;
  return pts;
}

const emptyPerf = {
  runsScored: 0, ballsFaced: 0, fours: 0, sixes: 0,
  fifties: 0, hundreds: 0, ducks: 0,
  wickets: 0, maidens: 0, dotBalls: 0,
  catches: 0, stumpings: 0, runOuts: 0,
};

describe("calculatePoints — batting", () => {
  it("scores 1 point per run", () => {
    expect(calculatePoints({ ...emptyPerf, runsScored: 50 })).toBe(50);
  });

  it("awards 8 bonus points for a fifty", () => {
    expect(calculatePoints({ ...emptyPerf, runsScored: 50, fifties: 1 })).toBe(58);
  });

  it("awards 16 bonus points for a hundred", () => {
    expect(calculatePoints({ ...emptyPerf, runsScored: 100, hundreds: 1 })).toBe(116);
  });

  it("deducts 2 points for a duck", () => {
    expect(calculatePoints({ ...emptyPerf, ducks: 1 })).toBe(-2);
  });

  it("awards 1 point per four", () => {
    expect(calculatePoints({ ...emptyPerf, fours: 4 })).toBe(4);
  });

  it("awards 2 points per six", () => {
    expect(calculatePoints({ ...emptyPerf, sixes: 3 })).toBe(6);
  });

  it("awards +6 strike rate bonus for SR >= 170", () => {
    // 17 runs off 10 balls = SR 170
    expect(calculatePoints({ ...emptyPerf, runsScored: 17, ballsFaced: 10 })).toBe(17 + 6);
  });

  it("awards +4 strike rate bonus for SR >= 150", () => {
    // 15 runs off 10 balls = SR 150
    expect(calculatePoints({ ...emptyPerf, runsScored: 15, ballsFaced: 10 })).toBe(15 + 4);
  });

  it("deducts 6 points for SR < 50", () => {
    // 4 runs off 10 balls = SR 40
    expect(calculatePoints({ ...emptyPerf, runsScored: 4, ballsFaced: 10 })).toBe(4 - 6);
  });

  it("does not apply SR bonus/penalty for fewer than 10 balls", () => {
    // 2 runs off 9 balls = SR 22.2, but < 10 balls so no penalty
    expect(calculatePoints({ ...emptyPerf, runsScored: 2, ballsFaced: 9 })).toBe(2);
  });
});

describe("calculatePoints — bowling", () => {
  it("awards 25 points per wicket", () => {
    expect(calculatePoints({ ...emptyPerf, wickets: 2 })).toBe(50);
  });

  it("awards 8 points per maiden over", () => {
    expect(calculatePoints({ ...emptyPerf, maidens: 2 })).toBe(16);
  });

  it("awards 1 point per dot ball", () => {
    expect(calculatePoints({ ...emptyPerf, dotBalls: 12 })).toBe(12);
  });

  it("awards 4 bonus points for 3 wickets", () => {
    expect(calculatePoints({ ...emptyPerf, wickets: 3 })).toBe(75 + 4);
  });

  it("awards 8 bonus points for 4 wickets", () => {
    expect(calculatePoints({ ...emptyPerf, wickets: 4 })).toBe(100 + 8);
  });

  it("awards 16 bonus points for 5 wickets", () => {
    expect(calculatePoints({ ...emptyPerf, wickets: 5 })).toBe(125 + 16);
  });
});

describe("calculatePoints — fielding", () => {
  it("awards 8 points per catch", () => {
    expect(calculatePoints({ ...emptyPerf, catches: 2 })).toBe(16);
  });

  it("awards 12 points per stumping", () => {
    expect(calculatePoints({ ...emptyPerf, stumpings: 1 })).toBe(12);
  });

  it("awards 6 points per run out", () => {
    expect(calculatePoints({ ...emptyPerf, runOuts: 2 })).toBe(12);
  });
});

describe("calculatePoints — combined", () => {
  it("calculates a realistic all-round performance correctly", () => {
    // 60 runs, 1 fifty, 8 fours, 2 sixes, 2 wickets, 1 catch
    // 60 + 8 + 8 + 4 + 4 + 50 + 8 = 142
    const pts = calculatePoints({
      ...emptyPerf,
      runsScored: 60,
      ballsFaced: 45,
      fours: 8,
      sixes: 2,
      fifties: 1,
      wickets: 2,
      catches: 1,
    });
    // 60 runs + 8 fours + 4 sixes + 8 fifty bonus + 50 wickets + 8 catch
    // SR = 60/45 * 100 = 133.3 → +2 bonus
    expect(pts).toBe(60 + 8 + 4 + 8 + 50 + 8 + 2);
  });

  it("zero performance returns 0", () => {
    expect(calculatePoints(emptyPerf)).toBe(0);
  });
});
