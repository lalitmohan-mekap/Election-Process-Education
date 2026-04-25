export type ElectoralSystemType =
  | "FPTP"
  | "PR"
  | "Mixed"
  | "RCV"
  | "Two-Round";

export interface CountryData {
  name: string;
  flag: string;
  electoralSystem: ElectoralSystemType;
  systemDescription: string;
  voterTurnout: number;
  turnoutYear: number;
  keyFact: string;
}

export const systemColors: Record<ElectoralSystemType, string> = {
  FPTP: "#3b82f6",      // blue-500
  PR: "#22c55e",         // green-500
  Mixed: "#a855f7",      // purple-500
  RCV: "#f59e0b",        // amber-500
  "Two-Round": "#f43f5e", // rose-500
};

export const systemLabels: Record<ElectoralSystemType, string> = {
  FPTP: "First-Past-The-Post",
  PR: "Proportional Representation",
  Mixed: "Mixed System",
  RCV: "Ranked Choice Voting",
  "Two-Round": "Two-Round System",
};

export const countriesData: Record<string, CountryData> = {
  US: {
    name: "United States",
    flag: "🇺🇸",
    electoralSystem: "FPTP",
    systemDescription:
      "Uses a first-past-the-post system for congressional elections and an Electoral College for presidential elections.",
    voterTurnout: 66,
    turnoutYear: 2020,
    keyFact:
      "The U.S. Electoral College has 538 electors, and a candidate needs 270 to win the presidency.",
  },
  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    electoralSystem: "FPTP",
    systemDescription:
      "Members of Parliament are elected via first-past-the-post in 650 constituencies.",
    voterTurnout: 67,
    turnoutYear: 2024,
    keyFact:
      "The UK has held general elections since 1265, making it one of the oldest parliamentary democracies.",
  },
  CA: {
    name: "Canada",
    flag: "🇨🇦",
    electoralSystem: "FPTP",
    systemDescription:
      "Members of Parliament elected in 338 ridings using first-past-the-post.",
    voterTurnout: 63,
    turnoutYear: 2025,
    keyFact:
      "Canada has had ongoing debates about switching to proportional representation since the early 2000s.",
  },
  IN: {
    name: "India",
    flag: "🇮🇳",
    electoralSystem: "FPTP",
    systemDescription:
      "The world's largest democracy uses FPTP across 543 Lok Sabha constituencies.",
    voterTurnout: 66,
    turnoutYear: 2024,
    keyFact:
      "India's 2024 general election involved over 960 million eligible voters — the largest democratic exercise in history.",
  },
  DE: {
    name: "Germany",
    flag: "🇩🇪",
    electoralSystem: "Mixed",
    systemDescription:
      "Uses a mixed-member proportional system combining direct constituency seats with party list seats.",
    voterTurnout: 77,
    turnoutYear: 2021,
    keyFact:
      "Germany's Bundestag can vary in size — the 2021 election resulted in 736 seats due to overhang mandates.",
  },
  JP: {
    name: "Japan",
    flag: "🇯🇵",
    electoralSystem: "Mixed",
    systemDescription:
      "Uses a parallel voting system with single-member districts and proportional representation blocks.",
    voterTurnout: 56,
    turnoutYear: 2024,
    keyFact:
      "Japan's House of Representatives has 465 seats — 289 from districts and 176 from proportional lists.",
  },
  MX: {
    name: "Mexico",
    flag: "🇲🇽",
    electoralSystem: "Mixed",
    systemDescription:
      "Uses a parallel system with 300 single-member districts and 200 proportional representation seats.",
    voterTurnout: 61,
    turnoutYear: 2024,
    keyFact:
      "Mexico's independent electoral institute (INE) is one of the largest election management bodies in the world.",
  },
  KR: {
    name: "South Korea",
    flag: "🇰🇷",
    electoralSystem: "Mixed",
    systemDescription:
      "Mixed-member majoritarian system with 253 district seats and 47 proportional seats.",
    voterTurnout: 67,
    turnoutYear: 2024,
    keyFact:
      "South Korea holds elections on Wednesdays and declares them public holidays to boost voter turnout.",
  },
  FR: {
    name: "France",
    flag: "🇫🇷",
    electoralSystem: "Two-Round",
    systemDescription:
      "Uses a two-round system for presidential and legislative elections.",
    voterTurnout: 72,
    turnoutYear: 2022,
    keyFact:
      "In France, if no presidential candidate wins over 50% in the first round, the top two face a runoff.",
  },
  BR: {
    name: "Brazil",
    flag: "🇧🇷",
    electoralSystem: "Two-Round",
    systemDescription:
      "Presidential elections use a two-round system; legislative seats use open-list PR.",
    voterTurnout: 79,
    turnoutYear: 2022,
    keyFact:
      "Voting is compulsory in Brazil for citizens aged 18-70, with fines for those who don't vote without justification.",
  },
  EG: {
    name: "Egypt",
    flag: "🇪🇬",
    electoralSystem: "Two-Round",
    systemDescription:
      "Presidential elections use a two-round system with a majority threshold.",
    voterTurnout: 45,
    turnoutYear: 2023,
    keyFact:
      "Egypt's parliament, the People's Assembly, is one of the oldest legislative bodies in Africa and the Middle East.",
  },
  SE: {
    name: "Sweden",
    flag: "🇸🇪",
    electoralSystem: "PR",
    systemDescription:
      "Uses a party-list proportional representation system with a 4% threshold.",
    voterTurnout: 84,
    turnoutYear: 2022,
    keyFact:
      "Sweden consistently achieves voter turnout above 80%, among the highest in the world.",
  },
  NL: {
    name: "Netherlands",
    flag: "🇳🇱",
    electoralSystem: "PR",
    systemDescription:
      "Uses open-list proportional representation across a single nationwide constituency.",
    voterTurnout: 78,
    turnoutYear: 2023,
    keyFact:
      "The Netherlands treats the entire country as one constituency, giving it one of the purest forms of PR globally.",
  },
  ZA: {
    name: "South Africa",
    flag: "🇿🇦",
    electoralSystem: "PR",
    systemDescription:
      "Uses closed-list proportional representation for the National Assembly.",
    voterTurnout: 59,
    turnoutYear: 2024,
    keyFact:
      "South Africa's 1994 election — the first with universal suffrage — saw a 86% turnout and marked the end of apartheid.",
  },
  ES: {
    name: "Spain",
    flag: "🇪🇸",
    electoralSystem: "PR",
    systemDescription:
      "Uses the D'Hondt method of proportional representation across 52 multi-member constituencies.",
    voterTurnout: 70,
    turnoutYear: 2023,
    keyFact:
      "Spain returned to democracy in 1977 after nearly four decades of Franco's dictatorship.",
  },
  DK: {
    name: "Denmark",
    flag: "🇩🇰",
    electoralSystem: "PR",
    systemDescription:
      "Uses a proportional representation system with multi-member constituencies and a 2% threshold.",
    voterTurnout: 84,
    turnoutYear: 2022,
    keyFact:
      "Denmark regularly ranks among the top democracies worldwide in the Democracy Index.",
  },
  NZ: {
    name: "New Zealand",
    flag: "🇳🇿",
    electoralSystem: "Mixed",
    systemDescription:
      "Uses mixed-member proportional representation since 1996.",
    voterTurnout: 78,
    turnoutYear: 2023,
    keyFact:
      "New Zealand was the first self-governing country to grant women the right to vote in 1893.",
  },
  AU: {
    name: "Australia",
    flag: "🇦🇺",
    electoralSystem: "RCV",
    systemDescription:
      "Uses preferential (ranked choice) voting for the House of Representatives.",
    voterTurnout: 90,
    turnoutYear: 2022,
    keyFact:
      "Voting is compulsory in Australia — eligible citizens who don't vote can be fined up to AUD 222.",
  },
  IE: {
    name: "Ireland",
    flag: "🇮🇪",
    electoralSystem: "RCV",
    systemDescription:
      "Uses the Single Transferable Vote (STV), a form of ranked choice voting, in multi-seat constituencies.",
    voterTurnout: 63,
    turnoutYear: 2024,
    keyFact:
      "Ireland's STV system has been in use since 1921 and was retained after two referendums attempted to replace it.",
  },
  NG: {
    name: "Nigeria",
    flag: "🇳🇬",
    electoralSystem: "FPTP",
    systemDescription:
      "Uses first-past-the-post for both presidential and legislative elections.",
    voterTurnout: 27,
    turnoutYear: 2023,
    keyFact:
      "Nigeria is Africa's most populous country and its largest democracy with over 93 million registered voters.",
  },
  KE: {
    name: "Kenya",
    flag: "🇰🇪",
    electoralSystem: "FPTP",
    systemDescription:
      "Uses first-past-the-post for constituency seats and a mixed system for the presidency.",
    voterTurnout: 65,
    turnoutYear: 2022,
    keyFact:
      "Kenya's 2010 constitution introduced a devolved government structure with 47 counties, each electing a governor.",
  },
  IT: {
    name: "Italy",
    flag: "🇮🇹",
    electoralSystem: "Mixed",
    systemDescription:
      "Uses a parallel voting system with both FPTP and proportional representation components.",
    voterTurnout: 64,
    turnoutYear: 2022,
    keyFact:
      "Italy has changed its electoral system multiple times — the current system was adopted in 2017.",
  },
  PL: {
    name: "Poland",
    flag: "🇵🇱",
    electoralSystem: "PR",
    systemDescription:
      "Uses the D'Hondt method of proportional representation with a 5% threshold for parties.",
    voterTurnout: 74,
    turnoutYear: 2023,
    keyFact:
      "Poland's 2023 election saw the highest voter turnout since the fall of communism in 1989.",
  },
  AR: {
    name: "Argentina",
    flag: "🇦🇷",
    electoralSystem: "Two-Round",
    systemDescription:
      "Presidential elections use a modified two-round system with a 45% threshold for first-round victory.",
    voterTurnout: 78,
    turnoutYear: 2023,
    keyFact:
      "Argentina requires a candidate to win 45% of the vote (or 40% with a 10-point lead) to avoid a runoff.",
  },
  NO: {
    name: "Norway",
    flag: "🇳🇴",
    electoralSystem: "PR",
    systemDescription:
      "Uses a modified Sainte-Laguë method of proportional representation.",
    voterTurnout: 78,
    turnoutYear: 2021,
    keyFact:
      "Norway consistently ranks as one of the strongest democracies in the world in the Democracy Index.",
  },
  FI: {
    name: "Finland",
    flag: "🇫🇮",
    electoralSystem: "PR",
    systemDescription:
      "Uses the D'Hondt method with open lists across 13 multi-member constituencies.",
    voterTurnout: 72,
    turnoutYear: 2023,
    keyFact:
      "Finland was the first country in Europe to grant women full political rights in 1906.",
  },
  TR: {
    name: "Turkey",
    flag: "🇹🇷",
    electoralSystem: "Two-Round",
    systemDescription:
      "Presidential elections use a two-round system; parliamentary elections use PR with a 7% threshold.",
    voterTurnout: 87,
    turnoutYear: 2023,
    keyFact:
      "Turkey's 2023 election saw an 87% turnout — one of the highest for any country without compulsory voting.",
  },
  ID: {
    name: "Indonesia",
    flag: "🇮🇩",
    electoralSystem: "PR",
    systemDescription:
      "Uses open-list proportional representation for legislative elections.",
    voterTurnout: 82,
    turnoutYear: 2024,
    keyFact:
      "Indonesia's 2024 election was one of the most complex single-day elections ever, with voters filling 5 different ballots.",
  },
  GH: {
    name: "Ghana",
    flag: "🇬🇭",
    electoralSystem: "FPTP",
    systemDescription:
      "Uses first-past-the-post for parliamentary elections and a two-round system for the presidency.",
    voterTurnout: 61,
    turnoutYear: 2024,
    keyFact:
      "Ghana is widely regarded as one of the most stable democracies in West Africa with peaceful power transfers since 1992.",
  },
  CL: {
    name: "Chile",
    flag: "🇨🇱",
    electoralSystem: "PR",
    systemDescription:
      "Uses the D'Hondt method of proportional representation for legislative elections.",
    voterTurnout: 55,
    turnoutYear: 2021,
    keyFact:
      "Chile transitioned from a binomial electoral system to proportional representation in 2015.",
  },
};
