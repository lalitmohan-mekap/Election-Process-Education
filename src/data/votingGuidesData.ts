export interface VotingGuide {
  name: string;
  flag: string;
  votingAge: number;
  registrationProcess: "Automatic" | "Manual" | "Mixed";
  votingMethods: string[];
  idRequired: boolean;
  idDescription: string;
  electionDay: string;
  steps: string[];
}

export const votingGuides: Record<string, VotingGuide> = {
  US: {
    name: "United States",
    flag: "🇺🇸",
    votingAge: 18,
    registrationProcess: "Manual",
    votingMethods: ["In-person", "Mail-in", "Early voting"],
    idRequired: true,
    idDescription:
      "Requirements vary by state. Some require photo ID, others accept non-photo ID or signed affidavits.",
    electionDay:
      "First Tuesday after the first Monday in November (federal elections).",
    steps: [
      "Check your eligibility — you must be a U.S. citizen, meet your state's residency requirements, and be at least 18 years old by Election Day.",
      "Register to vote through your state's election office, online portal, or at the DMV. Registration deadlines vary by state (some allow same-day registration).",
      "Find your polling place using your state's voter information portal or vote.org.",
      "Bring required identification to the polling station. Check your state's specific ID laws in advance.",
      "Cast your ballot in the voting booth. For federal elections, you may vote for President, Senators, and Representatives.",
      "If you cannot vote in person, request an absentee or mail-in ballot before the deadline set by your state.",
    ],
  },
  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    votingAge: 18,
    registrationProcess: "Manual",
    votingMethods: ["In-person", "Postal vote", "Proxy vote"],
    idRequired: true,
    idDescription:
      "Photo ID is required at polling stations in England since 2023. Acceptable forms include passport, driving licence, and free Voter Authority Certificate.",
    electionDay:
      "Traditionally held on Thursdays. The date is set by the Prime Minister within a 5-year parliamentary term.",
    steps: [
      "Register to vote online at gov.uk/register-to-vote. You will need your National Insurance number.",
      "Check the electoral register to confirm your name and address are correct.",
      "Receive your polling card by post, which tells you where to vote.",
      "On election day, go to your assigned polling station and bring a valid form of photo ID.",
      "Receive your ballot paper, mark your choice with an X, and place it in the ballot box.",
      "If you cannot attend in person, apply for a postal vote or appoint a proxy to vote on your behalf.",
    ],
  },
  IN: {
    name: "India",
    flag: "🇮🇳",
    votingAge: 18,
    registrationProcess: "Manual",
    votingMethods: ["In-person (EVM)", "Postal vote (limited)"],
    idRequired: true,
    idDescription:
      "Voter ID card (EPIC) is the primary document, but 11 other forms of ID are accepted including Aadhaar, passport, and driving licence.",
    electionDay:
      "Elections are conducted in multiple phases over several weeks due to the country's vast size. Polling day is a public holiday.",
    steps: [
      "Check eligibility — you must be an Indian citizen and at least 18 years old on the qualifying date.",
      "Register online through the National Voters' Service Portal (NVSP) or at your local Electoral Registration Officer.",
      "Receive your Voter ID card (EPIC) and verify your name on the electoral roll.",
      "Find your polling station and booth number using the Voter Helpline App or the CEO website of your state.",
      "On polling day, bring your Voter ID or approved alternate ID to the polling station.",
      "Verify your identity, receive your ballot slip, and cast your vote using the Electronic Voting Machine (EVM). Press the button next to your chosen candidate.",
    ],
  },
  DE: {
    name: "Germany",
    flag: "🇩🇪",
    votingAge: 18,
    registrationProcess: "Automatic",
    votingMethods: ["In-person", "Postal vote"],
    idRequired: true,
    idDescription:
      "A valid identity card (Personalausweis) or passport is required at the polling station.",
    electionDay:
      "Federal elections are held on a Sunday, typically in September every four years.",
    steps: [
      "Registration is automatic — all German citizens are registered based on their local residents' registration office (Einwohnermeldeamt).",
      "You will receive a polling notification (Wahlbenachrichtigung) by mail approximately 4–6 weeks before the election.",
      "On election day (always a Sunday), go to your designated polling station with your notification and valid ID.",
      "You will receive two ballots: one for a direct candidate in your constituency (Erststimme) and one for a party list (Zweitstimme).",
      "Mark your selections and place the ballots in the ballot box.",
      "If you prefer postal voting, apply for a Briefwahlunterlagen at your local election office and mail your completed ballot before election day.",
    ],
  },
  AU: {
    name: "Australia",
    flag: "🇦🇺",
    votingAge: 18,
    registrationProcess: "Manual",
    votingMethods: ["In-person", "Postal vote", "Early voting"],
    idRequired: false,
    idDescription:
      "No photo ID is required at the polling station. You simply state your name and address, which is checked against the electoral roll.",
    electionDay:
      "Federal elections are always held on a Saturday.",
    steps: [
      "Enrol to vote with the Australian Electoral Commission (AEC). Enrolment is compulsory for all eligible citizens.",
      "Check your enrolment details are up to date at aec.gov.au.",
      "On election day (Saturday), go to any polling station in your state or territory.",
      "Give your name and address to the polling official, who will mark you off the electoral roll.",
      "You will receive a green ballot (House of Representatives) and a white ballot (Senate). Number candidates in order of preference.",
      "Voting is compulsory — if you do not vote without a valid reason, you may receive a fine of AUD 20–222.",
    ],
  },
  FR: {
    name: "France",
    flag: "🇫🇷",
    votingAge: 18,
    registrationProcess: "Automatic",
    votingMethods: ["In-person", "Proxy vote"],
    idRequired: true,
    idDescription:
      "A valid identity document (national ID card, passport, or driving licence) is required.",
    electionDay:
      "Elections are held on Sundays. Presidential elections take place in April/May every five years.",
    steps: [
      "French citizens are automatically registered to vote at age 18 through the national registry.",
      "Verify your registration and polling station on the government portal service-public.fr.",
      "Receive your voter card (carte d'électeur) by mail.",
      "On election day (Sunday), bring your ID to the polling station. The voter card is not mandatory but speeds up the process.",
      "Take the ballots of all candidates from the display table, enter the voting booth, place your chosen ballot in the envelope, and deposit it in the ballot box.",
      "If a second round is needed (no candidate reaches 50%), it is held two weeks after the first round.",
    ],
  },
  BR: {
    name: "Brazil",
    flag: "🇧🇷",
    votingAge: 16,
    registrationProcess: "Manual",
    votingMethods: ["In-person (electronic)"],
    idRequired: true,
    idDescription:
      "Voter registration card (Título de Eleitor) and a photo ID are required.",
    electionDay:
      "Elections are held on the first Sunday of October. Runoff elections (if needed) are held on the last Sunday of October.",
    steps: [
      "Register to vote at a Regional Electoral Court (TRE) or online. Registration is mandatory for ages 18–70 and optional for ages 16–17 and over 70.",
      "Receive your voter registration card (Título de Eleitor) with your assigned polling zone and section.",
      "On election day (Sunday), go to your designated polling station with your voter card and a photo ID.",
      "Voting is done on electronic voting machines — enter the candidate's number on the keypad and confirm your vote on screen.",
      "After voting, your finger is marked with indelible ink to prevent double-voting.",
      "If you cannot vote, you must justify your absence within 60 days at a TRE office or online to avoid penalties.",
    ],
  },
  JP: {
    name: "Japan",
    flag: "🇯🇵",
    votingAge: 18,
    registrationProcess: "Automatic",
    votingMethods: ["In-person", "Early voting", "Absentee"],
    idRequired: false,
    idDescription:
      "No photo ID is required. Voters receive a ballot entry ticket by mail which they present at the polling station.",
    electionDay:
      "Elections are typically held on Sundays.",
    steps: [
      "Japanese citizens are automatically registered based on their Basic Resident Register at age 18.",
      "You will receive a ballot entry ticket (投票所入場券) by mail before election day.",
      "On election day (Sunday), bring your ticket to your assigned polling station.",
      "Hand your ticket to the poll workers and receive your ballot paper.",
      "Write the name of your chosen candidate (or party for PR seats) by hand on the blank ballot.",
      "Place your completed ballot in the ballot box. Early voting is available at designated locations in the days before election day.",
    ],
  },
  SE: {
    name: "Sweden",
    flag: "🇸🇪",
    votingAge: 18,
    registrationProcess: "Automatic",
    votingMethods: ["In-person", "Early voting", "Postal vote (overseas)"],
    idRequired: true,
    idDescription:
      "A valid ID is required at the polling station. Accepted forms include passport, national ID card, and driving licence.",
    electionDay:
      "General elections are held on the second Sunday of September every four years.",
    steps: [
      "All Swedish citizens aged 18+ are automatically registered to vote based on the national population register.",
      "You will receive a voting card (röstkort) by mail approximately 3 weeks before the election.",
      "You can vote early at any early voting station across Sweden starting 18 days before election day.",
      "On election day (Sunday), go to your designated polling station with your voting card and valid ID.",
      "You will vote in three simultaneous elections: Riksdag (parliament), county council, and municipal council. Select one ballot for each.",
      "Place your ballots in the provided envelopes and hand them to the poll worker.",
    ],
  },
  NZ: {
    name: "New Zealand",
    flag: "🇳🇿",
    votingAge: 18,
    registrationProcess: "Manual",
    votingMethods: ["In-person", "Early voting", "Postal vote"],
    idRequired: false,
    idDescription:
      "No ID is required to vote, though first-time voters may need to show identification when registering.",
    electionDay:
      "General elections are held on a Saturday, typically in October every three years.",
    steps: [
      "Enrol to vote with the Electoral Commission. You can enrol online at vote.nz if you have a New Zealand driver licence or passport.",
      "Check your enrolment details and electorate information on vote.nz.",
      "You can vote early at any advance voting place in the two weeks before election day.",
      "On election day (Saturday), go to the voting place assigned to your electorate.",
      "You will receive two ballot papers: one for your local electorate MP and one for the party you want to represent you in Parliament.",
      "Mark your choices and place your ballots in the ballot box. If you are not enrolled, you can still cast a special vote on the day.",
    ],
  },
};
