export interface Player {
  player: {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    team: {
      team: {
        city: string;
        nickname: string;
        abbreviation: string;
        imageUrl: string;
      }
      bye: number;
      rank: number;
      passRank: number;
      rushRank: number;
      pointsFor: number;
      yards: number;
      plays: number;
      yardsPerPlay: number;
      turnovers: number;
      passAttempts: number;
      passCompletions: number;
      passYards: number;
      passTd: number;
      interception: number;
      netYardsPerPass: number;
      rushAttempt: number;
      rushYards: number;
      rushTd: number;
      yardsPerRush: number;
      scorePercentage: number;
      turnoverPercentage: number;
      offensiveLineRank: number;
      runningBackSoS: number;
    };
    tier: string;
    position: string;
    adp: number;
    rank: number;
  };
  completions: number;
  attempts: number;
  passYards: number;
  passTd: number;
  interception: number;
  carries: number;
  rushTd: number;
  rushYards: number;
  fumbles: number;
  receptions: number;
  receivingYards: number;
  receivingTd: number;
  fantasyPoints: number;
  selected: boolean;
}
