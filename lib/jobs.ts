export type JobStatus = "active" | "paused" | "closed";
export type ApplicationStatus = "new" | "reviewing" | "interview" | "offered" | "hired" | "rejected";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Self-employed" | "Contract";
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  indeedUrl?: string;
  linkedinUrl?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  licenceType: string;
  experience: string;
  availability: string;
  coverLetter: string;
  source: "website" | "indeed" | "linkedin" | "other";
  status: ApplicationStatus;
  createdAt: string;
  notes: string;
  cvFilename?: string;
  cvBase64?: string;
  cvMimeType?: string;
}

export const DEFAULT_JOBS: Job[] = [
  {
    id: "job-001",
    title: "Multi-Drop Delivery Driver",
    department: "Operations",
    location: "West Midlands",
    type: "Self-employed",
    salary: "Competitive + fuel allowance",
    description: "We are looking for reliable, professional self-employed delivery drivers to join our growing West Midlands multi-drop network. You will be responsible for delivering parcels to multiple locations daily, providing excellent customer service at every door.",
    requirements: ["Valid UK driving licence (held 1+ year, max 6 points)","Smartphone for route app","DBS check (we arrange and pay)","Drugs & alcohol test (we arrange and pay)","Ability to work independently","Customer-focused attitude"],
    responsibilities: ["Complete daily multi-drop delivery routes efficiently","Provide excellent customer service at every delivery","Use our route app to manage deliveries","Collect proof of delivery at each stop","Report any issues to the logistics team promptly"],
    benefits: ["Competitive weekly pay","Fuel paid on top of day rate","Training fully paid for","DBS check paid by us","Flexible working days","Bring your own van or rent from us (low deposit)"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "job-002",
    title: "Multi-Drop Delivery Driver",
    department: "Operations",
    location: "East Midlands",
    type: "Self-employed",
    salary: "Competitive + fuel allowance",
    description: "Seehra Transport is expanding its East Midlands network and looking for experienced multi-drop delivery drivers. Join a professional team delivering 15,000+ parcels per week across the UK.",
    requirements: ["Valid UK driving licence (held 1+ year, max 6 points)","Own van or ability to rent from us","Smartphone for route app","DBS check required (we pay)","Reliable and punctual"],
    responsibilities: ["Manage daily delivery routes across East Midlands","Deliver to residential and commercial addresses","Maintain high standards of customer service","Complete proof of delivery for every parcel"],
    benefits: ["Weekly payments — every week without fail","Fuel allowance on top of day rate","Full paid training provided","Choose your working days","Low-deposit van rental available","Ongoing operational support"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "job-003",
    title: "Logistics Coordinator",
    department: "Operations",
    location: "Oldbury, West Midlands",
    type: "Full-time",
    salary: "£24,000 – £28,000 per year",
    description: "We are looking for a highly organised Logistics Coordinator to join our Oldbury HQ team. You will manage daily route planning, driver communications, and client delivery schedules.",
    requirements: ["Previous logistics or transport coordination experience","Strong organisational and communication skills","Proficiency in Microsoft Office / Google Workspace","Ability to work under pressure","Full UK driving licence preferred"],
    responsibilities: ["Plan and optimise daily delivery routes","Communicate with drivers throughout the day","Handle client queries and delivery updates","Maintain accurate records and reporting","Coordinate with warehouse team on collections"],
    benefits: ["£24,000 – £28,000 salary","Monday to Friday, 9am–5pm","28 days holiday including bank holidays","Company pension","Career progression opportunities"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
