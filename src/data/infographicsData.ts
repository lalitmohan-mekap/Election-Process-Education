export interface InfographicCard {
  id: string;
  title: string;
  stat: string;
  description: string;
  source: string;
  gradient: [string, string]; // [from, to] Tailwind-style hex colors
}

export const infographicsData: InfographicCard[] = [
  {
    id: "india-voters",
    title: "Largest Electorate",
    stat: "960M+",
    description:
      "India's 2024 general election involved over 960 million eligible voters, making it the largest democratic exercise in human history.",
    source: "Election Commission of India, 2024",
    gradient: ["#f97316", "#ef4444"],
  },
  {
    id: "au-compulsory",
    title: "Compulsory Voting",
    stat: "90%",
    description:
      "Australia achieves ~90% voter turnout thanks to compulsory voting. Citizens who don't vote face fines up to AUD 222.",
    source: "Australian Electoral Commission, 2022",
    gradient: ["#3b82f6", "#8b5cf6"],
  },
  {
    id: "nz-women",
    title: "First to Enfranchise Women",
    stat: "1893",
    description:
      "New Zealand became the first self-governing country to grant all women the right to vote in national elections.",
    source: "New Zealand Parliament",
    gradient: ["#10b981", "#06b6d4"],
  },
  {
    id: "electoral-systems",
    title: "Electoral Systems Worldwide",
    stat: "5+",
    description:
      "Countries use at least 5 major types of electoral systems: FPTP, PR, Mixed, Ranked Choice, and Two-Round voting.",
    source: "International IDEA",
    gradient: ["#8b5cf6", "#ec4899"],
  },
  {
    id: "youth-vote",
    title: "Youth Voting Age",
    stat: "16",
    description:
      "Countries like Brazil, Austria, Cuba, and Scotland allow citizens as young as 16 to vote in some elections.",
    source: "Inter-Parliamentary Union",
    gradient: ["#f59e0b", "#f97316"],
  },
  {
    id: "democracies",
    title: "Democracies Worldwide",
    stat: "167",
    description:
      "The Economist Intelligence Unit's Democracy Index evaluates 167 countries, classifying them as full democracies, flawed democracies, hybrid regimes, or authoritarian.",
    source: "EIU Democracy Index, 2023",
    gradient: ["#06b6d4", "#3b82f6"],
  },
  {
    id: "turkey-turnout",
    title: "Highest Voluntary Turnout",
    stat: "87%",
    description:
      "Turkey's 2023 election achieved 87% turnout — one of the highest for any country without compulsory voting laws.",
    source: "Supreme Election Council of Turkey, 2023",
    gradient: ["#ef4444", "#f97316"],
  },
  {
    id: "evm-india",
    title: "Electronic Voting Machines",
    stat: "5.5M",
    description:
      "India deployed over 5.5 million Electronic Voting Machines (EVMs) across 1 million polling stations in its 2024 election.",
    source: "Election Commission of India, 2024",
    gradient: ["#10b981", "#84cc16"],
  },
  {
    id: "oldest-parliament",
    title: "Oldest Parliament",
    stat: "930 AD",
    description:
      "Iceland's Althing, established around 930 AD, is widely considered the world's oldest surviving parliament.",
    source: "Althingi.is",
    gradient: ["#6366f1", "#8b5cf6"],
  },
  {
    id: "global-turnout",
    title: "Global Average Turnout",
    stat: "66%",
    description:
      "The global average voter turnout has been steadily declining from around 76% in the 1990s to approximately 66% in recent years.",
    source: "International IDEA Voter Turnout Database",
    gradient: ["#f43f5e", "#a855f7"],
  },
  {
    id: "mail-voting",
    title: "Mail-In Voting Surge",
    stat: "46%",
    description:
      "In the 2020 U.S. presidential election, approximately 46% of all votes were cast by mail or absentee ballot — a historic high.",
    source: "U.S. Election Assistance Commission, 2020",
    gradient: ["#0ea5e9", "#6366f1"],
  },
  {
    id: "sa-1994",
    title: "End of Apartheid Election",
    stat: "86%",
    description:
      "South Africa's 1994 election — the first with universal suffrage — saw 86% turnout and marked the end of apartheid, electing Nelson Mandela as president.",
    source: "South African Electoral Commission",
    gradient: ["#f59e0b", "#10b981"],
  },
];
