import {
  Megaphone,
  ClipboardList,
  Users,
  Vote,
  BarChart3,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import React from "react";

export interface TimelineStep {
  id: string;
  step: number;
  title: string;
  icon: React.ReactNode;
  summary: string;
  detail: string;
}

export const timelineSteps: TimelineStep[] = [
  {
    id: "announcement",
    step: 1,
    title: "Election Announcement",
    icon: <Megaphone className="w-5 h-5" />,
    summary:
      "The government or electoral body officially announces the date and scope of the upcoming election.",
    detail:
      "An election is formally announced by the head of state, parliament, or an independent electoral commission. This proclamation specifies the date of the vote, the offices or issues to be decided, and the timeline for nominations. In many countries, this triggers a formal election period during which specific rules about campaigning and media coverage come into effect. The announcement may be routine (following a fixed election calendar) or called at the discretion of the executive, depending on the country's constitutional framework.",
  },
  {
    id: "registration",
    step: 2,
    title: "Voter Registration",
    icon: <ClipboardList className="w-5 h-5" />,
    summary:
      "Eligible citizens register to vote, either through automatic enrollment or a manual sign-up process.",
    detail:
      "Voter registration is the process by which eligible citizens are added to the official electoral roll. In some nations like Sweden and Germany, registration is automatic based on government records such as civil registries. In others like the United States, citizens must actively register before a specified deadline. Some jurisdictions allow same-day registration at polling stations. The registration period also involves verifying voter identities and ensuring the rolls are accurate and up to date — a crucial step in maintaining election integrity.",
  },
  {
    id: "campaigning",
    step: 3,
    title: "Campaigning",
    icon: <Users className="w-5 h-5" />,
    summary:
      "Candidates and parties present their platforms, debate policies, and seek public support.",
    detail:
      "The campaign period is when candidates and political parties actively engage with voters to present their policy positions and seek support. This includes rallies, debates, advertising (television, radio, digital, and print), door-to-door canvassing, and social media outreach. Most democracies regulate campaign activities through laws governing spending limits, donation disclosure, equal media access, and blackout periods close to election day. The campaign period is vital for an informed electorate, as it allows citizens to compare candidates and make informed choices.",
  },
  {
    id: "voting",
    step: 4,
    title: "Voting Day",
    icon: <Vote className="w-5 h-5" />,
    summary:
      "Citizens cast their ballots at designated polling stations or through mail-in and early voting options.",
    detail:
      "On election day, registered voters cast their ballots at designated polling stations, which are typically set up in schools, community centers, and public buildings. Many countries also offer early voting, postal (mail-in) voting, and overseas voting for citizens abroad. At polling stations, voters' identities are verified against the electoral roll before they receive their ballot. The secrecy of the vote is protected by private voting booths. Poll workers and independent observers monitor the process to ensure fairness. In some countries, voting is compulsory (e.g., Australia, Belgium), while in others it is voluntary.",
  },
  {
    id: "counting",
    step: 5,
    title: "Vote Counting",
    icon: <BarChart3 className="w-5 h-5" />,
    summary:
      "Ballots are securely counted under the supervision of election officials and independent observers.",
    detail:
      "After polls close, ballots are counted under strict protocols designed to ensure accuracy and transparency. Counting may be done by hand, by machine, or through a combination of both. Representatives from political parties and independent observers are typically allowed to witness the count. Results are tabulated at the precinct level, then aggregated at district, state or provincial, and national levels. Many jurisdictions conduct random audits or recounts to verify the accuracy of the results. Provisional and overseas ballots may take additional days to process. The initial results announced on election night are usually unofficial until formally certified.",
  },
  {
    id: "certification",
    step: 6,
    title: "Certification of Results",
    icon: <ShieldCheck className="w-5 h-5" />,
    summary:
      "Official bodies verify and certify the final election results, resolving any disputes or legal challenges.",
    detail:
      "After all votes are counted, official electoral bodies — such as national election commissions, canvassing boards, or courts — formally certify the results. This process includes resolving any disputes, recounts, or legal challenges filed by candidates or parties. Certification confirms that the election was conducted in accordance with the law and that the declared results are accurate. In many democracies, there is a formal period during which results can be contested through the courts. Once certified, the results are legally binding and set the stage for the transition of power.",
  },
  {
    id: "inauguration",
    step: 7,
    title: "Inauguration & Transfer of Power",
    icon: <Landmark className="w-5 h-5" />,
    summary:
      "The newly elected officials are sworn in and formally assume their responsibilities.",
    detail:
      "The final step in the election process is the inauguration, where the winning candidates are formally sworn into office. This ceremony symbolizes the peaceful transfer of power — one of the defining features of a healthy democracy. The outgoing officeholders hand over authority, and the new government begins its mandate. Inauguration ceremonies vary widely around the world: in the United States, the presidential inauguration takes place on January 20th; in parliamentary systems, a new prime minister may be sworn in within days of the election. The peaceful and orderly transition of power is a cornerstone of democratic governance.",
  },
];
