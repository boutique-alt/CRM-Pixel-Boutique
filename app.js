/**
 * Pixel CRM & Boutique CRM - Core Logic & Supabase Cloud Integration
 * Clean, Simple & Resilient for Everyday Use
 */

// ==========================================
// SUPABASE CLOUD DATABASE CONFIGURATION
// Project: ltemeusfcaapyhmifezg
// ==========================================
const SUPABASE_URL = "https://ltemeusfcaapyhmifezg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZW1ldXNmY2FhcHlobWlmZXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNDEzODEsImV4cCI6MjEwNzcxNzM4MX0.EIdFZH7N_yoEAlrrhzO702M8BwA4SzHY2XL30HxCmjQ";

let supabaseClient = null;
function initSupabase() {
  if (typeof window !== 'undefined' && window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log("🟢 Supabase Live Cloud Database Connected!");
    } catch (e) {
      console.warn("Supabase init skipped, using local cache:", e);
    }
  }
}

// Storage Keys (Instant Local Fallback & Offline Cache)
const STORAGE_LEADS = 'pixel_crm_leads_v2';
const STORAGE_CLIENTS = 'pixel_crm_clients_v2';
const STORAGE_USERS = 'pixel_crm_users_v1';
const STORAGE_CURRENT_USER = 'pixel_crm_current_user_v1';

// Default Requirements / Services List
const REQUIREMENTS = [
  "Logo Design",
  "Corporate Brochure",
  "Branding Guidelines",
  "Business Card Design",
  "Banner Design",
  "Pamphlet / Flyer Design",
  "Flex / Standee Design",
  "Facebook Page Creation",
  "Instagram Page Creation",
  "LinkedIn Page Creation",
  "YouTube Channel Creation",
  "Google Business Profile",
  "Basic Website",
  "Bigger Websites",
  "Web Application",
  "Website Maintenance",
  "Search Engine Optimization (SEO)",
  "E-Commerce",
  "Mobile App Development",
  "SaaS & CRM Systems",
  "WhatsApp Marketing",
  "Email Marketing",
  "Social Media (Organic)",
  "AI Influencer",
  "Meta / Google Advertisement",
  "Live Calling AI Agents (24/7)",
  "LinkedIn Ads & B2B Marketing",
  "Other"
];

// Seed Data matching reference mockup
const DEFAULT_LEADS = [
  {
    "id": "lead-imp-1",
    "company": "Bhoomi",
    "contactName": "Sunil Jaiswal",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "DONE | For September | 25th Jul",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-2",
    "company": "Optimum",
    "contactName": "Rajesh Agarwal",
    "contactNumber": "8013747563",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "This week",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-3",
    "company": "Sandep Pal",
    "contactName": "Sandep Pal",
    "contactNumber": "9835914485",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-4",
    "company": "Personality Edge",
    "contactName": "Personality Edge",
    "contactNumber": "N/A",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-5",
    "company": "Vidhi Bansal",
    "contactName": "Vidhi Bansal",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-6",
    "company": "Alan Baptist",
    "contactName": "Alan Baptist",
    "contactNumber": "N/A",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "DONE | DONE | He has plan for any websites. Will he start with one specially the NGO one from now ?",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-7",
    "company": "Baljeet",
    "contactName": "Baljeet",
    "contactNumber": "7006472167",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "details send on whatsapp, need to fix an online meet 30-07/not picking on 01-08/ | 3rd Aug; 4pm",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-8",
    "company": "Hasanuzjaman",
    "contactName": "Hasanuzjaman",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-9",
    "company": "App",
    "contactName": "Kumar Fitness",
    "contactNumber": "N/A",
    "requirement": "Mobile App Development",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-10",
    "company": "Web main",
    "contactName": "Kumar Fitness",
    "contactNumber": "N/A",
    "requirement": "Website Maintenance",
    "dealType": "Regular",
    "recurringCycle": "Quarterly",
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-11",
    "company": "Social Media",
    "contactName": "Kumar Fitness",
    "contactNumber": "N/A",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-12",
    "company": "MA Pest Control",
    "contactName": "Saikat Roy",
    "contactNumber": "9830088919",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "DONE | Plan shared. Costing is pending | 25th Jul",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-13",
    "company": "Shivam Enterprises",
    "contactName": "Abhishek Podder",
    "contactNumber": "9874743731",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Digital marleting, talk once, call after 3 pm / meeting fixed for 30-7, 29-07-26",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-14",
    "company": "Dropshot",
    "contactName": "Dropshot",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-15",
    "company": "Meghna",
    "contactName": "Marraige Photographer",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-16",
    "company": "Billing System",
    "contactName": "Durga Gold",
    "contactNumber": "N/A",
    "requirement": "SaaS & CRM Systems",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-17",
    "company": "Shree Balaji Furnishing",
    "contactName": "Shree Balaji Furnishing",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-18",
    "company": "Comfort Luxury",
    "contactName": "Comfort Luxury",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-19",
    "company": "Amit Sharma",
    "contactName": "Amit Sharma",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-20",
    "company": "Ripley",
    "contactName": "Ripley",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-21",
    "company": "Siddhartha Ganguli",
    "contactName": "Siddhartha Ganguli",
    "contactNumber": "9836966003",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Meeting to be set / meeting fixed for friday 31st july but need to call him on the day. call after 4pm | 27th Jul",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-22",
    "company": "DBull",
    "contactName": "Sayak Dutta",
    "contactNumber": "6291781081",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Meta Ad, WhatsApp Marketing, Landing Page, CRM",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-23",
    "company": "Saikat ALORA Interiors",
    "contactName": "Saikat ALORA Interiors",
    "contactNumber": "877 782 8003 / 98362 21887",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Talk once",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-24",
    "company": "Magowa car rentral",
    "contactName": "Magowa car rentral",
    "contactNumber": "97620 01053",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Need social media promotion, whatsapp send, 30-07/",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-25",
    "company": "Ecommerce",
    "contactName": "Mobyara",
    "contactNumber": "N/A",
    "requirement": "E-Commerce",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-26",
    "company": "Digital Marketing",
    "contactName": "Mobyara",
    "contactNumber": "N/A",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-27",
    "company": "Alina Ghosh",
    "contactName": "Alina Ghosh",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-28",
    "company": "Interior",
    "contactName": "Sharmistha Dutta",
    "contactNumber": "9831852572",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "she is busy she needs more time to be ready.29-07/",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-29",
    "company": "Vinit Agarwal",
    "contactName": "Vinit Agarwal",
    "contactNumber": "98300 18655",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-30",
    "company": "Raibakat Chakraborty",
    "contactName": "Raibakat Chakraborty",
    "contactNumber": "8282997775",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "He told me he put the planning on hold 29-07/ Hung up",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-31",
    "company": "Shailesh LaptoFix",
    "contactName": "Shailesh LaptoFix",
    "contactNumber": "98745 66671",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "He wants WhatsApp Marketing",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-32",
    "company": "Kajal Banerjee",
    "contactName": "Kajal Banerjee",
    "contactNumber": "98300 82443",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "She had some videos to be edited",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-33",
    "company": "Neeraj Ahuja",
    "contactName": "Neeraj Ahuja",
    "contactNumber": "9811053588",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-34",
    "company": "Hrishikesh Bharti",
    "contactName": "Hrishikesh Bharti",
    "contactNumber": "7669458369",
    "requirement": "E-Commerce",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Ecommerce (shoe)/ switch off",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-35",
    "company": "Bipasha Banerjee",
    "contactName": "Bipasha Banerjee",
    "contactNumber": "7604068430",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Hung up, on 29-07/Hung up 03-08",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-36",
    "company": "Fresh 5 Lead",
    "contactName": "Fresh 5 Lead",
    "contactNumber": "9689755653",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Pest control. Starter pack, ringing on 29-07/ not required now 03-08",
    "isClient": false,
    "status": "LOST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-37",
    "company": "Rakhi Maloo",
    "contactName": "Rakhi Maloo",
    "contactNumber": "9075758741",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Instagram, Cut the call on 29-07/ Hung up 03-08/ ringing | 25th Jul",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-38",
    "company": "Niranjan Mudhiraj",
    "contactName": "Niranjan Mudhiraj",
    "contactNumber": "8096017049",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Shared details/ busy on 29-07/ | 25th Jul",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-39",
    "company": "Raajrupa Sarkar Ganguly",
    "contactName": "Raajrupa Sarkar Ganguly",
    "contactNumber": "72783 58593",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Talk once / ringing 03-08/ Voicemail on 05-08 | 24th Jul",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-40",
    "company": "Siddharth Goel",
    "contactName": "Goel Communication",
    "contactNumber": "9874469829",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Wanted to fix a meeting on monday, hung up on 29-07/meeting fixed on 03-08 | 3rd Aug",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-41",
    "company": "Mir Abbas",
    "contactName": "Mir Abbas",
    "contactNumber": "7780911106",
    "requirement": "Corporate Brochure",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Had a talk. Shared prochure and portfilio, he will call us later 29-07/",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-42",
    "company": "Abdur Rehman",
    "contactName": "Abdur Rehman",
    "contactNumber": "8250732873 / 95474 96082",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "95474 96082 - md tarikh/ not picking 25th jul, tarikh told me to get the information from abdur sir but he is busy 29-07/",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-43",
    "company": "Vidya Jadhav",
    "contactName": "Vidya Jadhav",
    "contactNumber": "9326219191",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Starter pack. Need to know her budget, Ringing on 29-07/ | 25th Jul",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-44",
    "company": "Jintu Kalita",
    "contactName": "Optius",
    "contactNumber": "9678911668",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Website for Dental Clinic with appointment system",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-45",
    "company": "Borilavali Restaurant",
    "contactName": "Sanjay Lead",
    "contactNumber": "89549 92626",
    "requirement": "E-Commerce",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "he wants a ecommerce website for resturants and sell it to different. he will inform us whenever he got a lead 25-07jul",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-46",
    "company": "Vedant Maurya",
    "contactName": "Vedant Maurya",
    "contactNumber": "7052863744",
    "requirement": "Search Engine Optimization (SEO)",
    "dealType": "Regular",
    "recurringCycle": "Quarterly",
    "comment": "WhatsApp Marketing, seo, social media, meta ads, hr related company(kind of placement and hiring property), not picking on 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-47",
    "company": "Aniket Patani",
    "contactName": "Aniket Patani",
    "contactNumber": "9610444822",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "MEta Ad, WhatsApp Marketing, Landing Page, CRM, fng global",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-48",
    "company": "Amay Guruji",
    "contactName": "Amay Guruji",
    "contactNumber": "9850007911",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Talk once",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-49",
    "company": "Dhruti Shah",
    "contactName": "Dhruti Shah",
    "contactNumber": "97574 87201",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Digital Marketing, Dental clinic",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-50",
    "company": "Sharjin Pathan",
    "contactName": "Sharjin Pathan",
    "contactNumber": "77382 22112",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Interior designer from mumbai, wants website and social media, busy on 29-07",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-51",
    "company": "Interior Designer",
    "contactName": "Interior Designer",
    "contactNumber": "7738222112",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Website requirement, ringing on 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-52",
    "company": "Suraj Lead",
    "contactName": "Suraj Lead",
    "contactNumber": "8976591357",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Starter pack for financial business. When will he start ?",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-53",
    "company": "Nalin Baranwal",
    "contactName": "Nalin Baranwal",
    "contactNumber": "7084703654",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Wants reels and more Sir needs to call him to discuss further details, mutual fund company",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-54",
    "company": "Ajay Kumar Agarwal",
    "contactName": "Ajay Kumar Agarwal",
    "contactNumber": "9830443434",
    "requirement": "Corporate Brochure",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Brochure Sent brochure work",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-55",
    "company": "kapiberry Beverages",
    "contactName": "Cijo",
    "contactNumber": "7994472957",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested is degital marketing and social media campaigning. Details send",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-56",
    "company": "Abhishek Barnwal / Naveen ji",
    "contactName": "Abhishek Barnwal / Naveen ji",
    "contactNumber": "9839116625",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Wants to see some raw reels and their edited versions, Already sent",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-57",
    "company": "Silluka",
    "contactName": "Silluka",
    "contactNumber": "9810927740",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Starter pack, not picking up 25th july",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-58",
    "company": "Lakshay Singhee",
    "contactName": "Lakshay Singhee",
    "contactNumber": "8877018919",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Custom Envelop 100 pcs needs, call back needed",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-59",
    "company": "Opal clothing",
    "contactName": "Opal clothing",
    "contactNumber": "9903971176",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "ba | Sent details and quotation, follow up on",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-60",
    "company": "Ajay Lead",
    "contactName": "Ajay Lead",
    "contactNumber": "7003048595",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-61",
    "company": "Kuntal Saha",
    "contactName": "Kuntal Saha",
    "contactNumber": "8637816917",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-62",
    "company": "TRIO ONLINE",
    "contactName": "TRIO ONLINE",
    "contactNumber": "7003742597",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Whatsapp message sent",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-63",
    "company": "Naman",
    "contactName": "Naman",
    "contactNumber": "8443062725",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-64",
    "company": "Moloy lead",
    "contactName": "Moloy lead",
    "contactNumber": "9038068885",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested in leads and marketing, already sent all the details on whatsapp, need leads for insurance 11-08",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-65",
    "company": "New Lead",
    "contactName": "New Lead",
    "contactNumber": "6295699415",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Agriculture business wants to expand",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-66",
    "company": "Coffee & candles",
    "contactName": "Coffee & candles",
    "contactNumber": "7780911106",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Sent details on whatsapp",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-67",
    "company": "Saleem Shaikh",
    "contactName": "Saleem Shaikh",
    "contactNumber": "9049381106",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "WELTH ADVISORY/ wants to start from monday 25th may",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-68",
    "company": "SEN TAX CONSULTANCY",
    "contactName": "SEN TAX CONSULTANCY",
    "contactNumber": "8282843433",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Do all by himself, we need to budge him more",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-69",
    "company": "Leena",
    "contactName": "Leena",
    "contactNumber": "8459065848",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "She needs help in digital marketing",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-70",
    "company": "Abdul Matin",
    "contactName": "Abdul Matin",
    "contactNumber": "7908182465",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-71",
    "company": "Major Vikram Gupta",
    "contactName": "Major Vikram Gupta",
    "contactNumber": "9830068302",
    "requirement": "Business Card Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Need business card, wants to see some sample ASAP",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-72",
    "company": "ColourFit",
    "contactName": "ColourFit",
    "contactNumber": "9123901096",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-73",
    "company": "Palani Balasundaram",
    "contactName": "Palani Balasundaram",
    "contactNumber": "8105420202",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested, confermation after 5th June",
    "isClient": false,
    "status": "HOTTEST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-74",
    "company": "South Breeze School",
    "contactName": "South Breeze School",
    "contactNumber": "7980843047",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested in Reels and Ads",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-75",
    "company": "Anjan Chatterjee",
    "contactName": "Anjan Chatterjee",
    "contactNumber": "9163354015",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested in whatsapp marketing, need to speek to Dibyendu sir ASAP",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-76",
    "company": "Kritika Kinda",
    "contactName": "Kritika Kinda",
    "contactNumber": "9836746666",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intersted, need a team who can handle all her social media works and add brand value",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-77",
    "company": "Asuthosh Sharma",
    "contactName": "Asuthosh Sharma",
    "contactNumber": "6353701548",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "handle everything on social media by himself but wants to know what we can do better for him",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-78",
    "company": "Nurul Hassan",
    "contactName": "Nurul Hassan",
    "contactNumber": "7908129117",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-79",
    "company": "RT Solution",
    "contactName": "Samrat",
    "contactNumber": "7318737997",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-80",
    "company": "Liorr Perfumes",
    "contactName": "Liorr Perfumes",
    "contactNumber": "7605039381",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-81",
    "company": "Manish Karnani",
    "contactName": "Manish Karnani",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "933133322",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-82",
    "company": "Nidhi Saraf",
    "contactName": "Nidhi Saraf",
    "contactNumber": "9831068484",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-83",
    "company": "Tripology",
    "contactName": "Tripology",
    "contactNumber": "99866 96040",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-84",
    "company": "Sudhangshu",
    "contactName": "Sudhangshu",
    "contactNumber": "8529734993",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "he have few needs but can speak after 9pm",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-85",
    "company": "Himanshu",
    "contactName": "Himanshu",
    "contactNumber": "7889057163",
    "requirement": "Search Engine Optimization (SEO)",
    "dealType": "Regular",
    "recurringCycle": "Quarterly",
    "comment": "Intrested in SEO, already sent all the details on whatsapp",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-86",
    "company": "Palak",
    "contactName": "Palak",
    "contactNumber": "9740631095",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-87",
    "company": "Anoop Kedia",
    "contactName": "Anoop Kedia",
    "contactNumber": "7980093487",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-88",
    "company": "Propertydikhaobhaiya & AugmentRealtors",
    "contactName": "Propertydikhaobhaiya & AugmentRealtors",
    "contactNumber": "79806 58061",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-89",
    "company": "Drishti Vision Solution",
    "contactName": "Drishti Vision Solution",
    "contactNumber": "7015177522",
    "requirement": "Search Engine Optimization (SEO)",
    "dealType": "Regular",
    "recurringCycle": "Quarterly",
    "comment": "Intersted in SEO send our detaills of whatsapp ( https://drishtivision.in/ )",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-90",
    "company": "Amruta",
    "contactName": "Amruta",
    "contactNumber": "7977804143",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested but need a call back after 4pm",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-91",
    "company": "Avani",
    "contactName": "Avani",
    "contactNumber": "9830159509",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-92",
    "company": "Website",
    "contactName": "Gopal",
    "contactNumber": "9477316915",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-93",
    "company": "New Lead",
    "contactName": "New Lead",
    "contactNumber": "7418581807",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-94",
    "company": "Nishantji",
    "contactName": "Nishantji",
    "contactNumber": "98300 32434",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-95",
    "company": "Nishant Taj",
    "contactName": "Nishant Taj",
    "contactNumber": "98319 51330",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-96",
    "company": "Vinit Nishant",
    "contactName": "Vinit Nishant",
    "contactNumber": "98755 66367",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-97",
    "company": "A",
    "contactName": "Lead",
    "contactNumber": "78376 28223",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-98",
    "company": "Ritikesh Kumar",
    "contactName": "Ritikesh Kumar",
    "contactNumber": "83406 05703",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-99",
    "company": "Sarah Imtiaz",
    "contactName": "Sarah Imtiaz",
    "contactNumber": "9831242369",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-100",
    "company": "Sikkim Taxi Rental",
    "contactName": "Sikkim Taxi Rental",
    "contactNumber": "9609358582",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-101",
    "company": "Parth",
    "contactName": "Parth",
    "contactNumber": "9909002277",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-102",
    "company": "Srija Agarbatti",
    "contactName": "Atul",
    "contactNumber": "63931 18707",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-103",
    "company": "BonnTonn Cafe",
    "contactName": "BonnTonn Cafe",
    "contactNumber": "N/A",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Website development. Connect after 23rd May",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-104",
    "company": "Manish Shah",
    "contactName": "Manish Shah",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-105",
    "company": "Moushumi Chatterjee",
    "contactName": "Moushumi Chatterjee",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-106",
    "company": "Rajeev Badhani",
    "contactName": "Rajeev Badhani",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-107",
    "company": "Smita 1 Lead",
    "contactName": "Smita 1 Lead",
    "contactNumber": "N/A",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-108",
    "company": "Yash",
    "contactName": "Yash",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-109",
    "company": "Ekta Business Card",
    "contactName": "Ekta Business Card",
    "contactNumber": "N/A",
    "requirement": "Business Card Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-110",
    "company": "Hopping tails",
    "contactName": "Raj",
    "contactNumber": "7208517859",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Wants to talk to my senior",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-111",
    "company": "Md Sharique",
    "contactName": "Md Sharique",
    "contactNumber": "N/A",
    "requirement": "Google Business Profile",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Google business profile and Business Marketing",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-112",
    "company": "Rishi Packaging",
    "contactName": "Rishi Packaging",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-113",
    "company": "Nishant Goyal",
    "contactName": "Nishant Goyal",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-114",
    "company": "Dev Gopal Sinha",
    "contactName": "Dev Gopal Sinha",
    "contactNumber": "9748811054",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Next month midddle try to call | 1st Aug",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-115",
    "company": "Vatsala Impex",
    "contactName": "Ankit Goyal",
    "contactNumber": "9810108144",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "24-06-26 Busy, call after sometime.",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-116",
    "company": "Dhananjaya",
    "contactName": "Dhananjaya",
    "contactNumber": "7509337596",
    "requirement": "Branding Guidelines",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Pickle business, needs branding and marketing, call on Monday 22nd, for more details / 26-06- switch off",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-117",
    "company": "Wallah Habibi Perfumes",
    "contactName": "Wallah Habibi Perfumes",
    "contactNumber": "7042341321",
    "requirement": "Search Engine Optimization (SEO)",
    "dealType": "Regular",
    "recurringCycle": "Quarterly",
    "comment": "need to talk after 25th May, intrested in ads on social media and Seo",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-118",
    "company": "Abhishek Rathi",
    "contactName": "Abhishek Rathi",
    "contactNumber": "7890008922",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Sunday Call",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-119",
    "company": "Dharewal Jewellers",
    "contactName": "Dharewal Jewellers",
    "contactNumber": "9836857555",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Need to meet next week on wednessday/ no need rn on 05-08 | call 29th jul",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-120",
    "company": "Hyd",
    "contactName": "Srinivas Dry Cleaner",
    "contactNumber": "7799799951",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Need to call him around 2:30 on 05-08 | 25 Jul",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-121",
    "company": "Ishika Lead",
    "contactName": "Ishika Lead",
    "contactNumber": "6291475614",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Call after 2 weeks, on 29-07",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-122",
    "company": "Paresh Vakhharria",
    "contactName": "Paresh Vakhharria",
    "contactNumber": "9820396131",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "busy on 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-123",
    "company": "Balbinder Singh",
    "contactName": "Balbinder Singh",
    "contactNumber": "8824386564",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "invalid number, 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-124",
    "company": "Bhavna Bhanushali",
    "contactName": "Bhavna Bhanushali",
    "contactNumber": "8850963765",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "busy on 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-125",
    "company": "Bajrang Events",
    "contactName": "Sanjay",
    "contactNumber": "9849229690",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Busy on 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-126",
    "company": "Sunny",
    "contactName": "Sunny",
    "contactNumber": "9390504513",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "ringing 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-127",
    "company": "Santosh Kumar",
    "contactName": "Santosh Kumar",
    "contactNumber": "8885881555",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "ringing 29-07",
    "isClient": false,
    "status": "COLD",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-128",
    "company": "Dg Lead",
    "contactName": "Dg Lead",
    "contactNumber": "9177852870",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-129",
    "company": "Sam Lead",
    "contactName": "Sam Lead",
    "contactNumber": "7017960184",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-130",
    "company": "LBS Vijay Lead",
    "contactName": "LBS Vijay Lead",
    "contactNumber": "7330663444",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-131",
    "company": "New 2 Lead",
    "contactName": "New 2 Lead",
    "contactNumber": "8108642175",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Prospective lead from sales campaign",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-132",
    "company": "Kiran",
    "contactName": "Kiran",
    "contactNumber": "7666935909",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "13:30 pm",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-133",
    "company": "luxury living",
    "contactName": "luxury living",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "914771443",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-134",
    "company": "Om, Ahmedabad",
    "contactName": "Om, Ahmedabad",
    "contactNumber": "7383478888",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested, need to call on 31st july for more details. 30-07/ busy on 05-08",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-135",
    "company": "Wallah Habibi Perfumes",
    "contactName": "Wallah Habibi Perfumes",
    "contactNumber": "7042341321",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested, need to call after 2:30 on 30th july for more details. 30-07/ ringing",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-136",
    "company": "Shrikant Kejrewal",
    "contactName": "Shrikant Kejrewal",
    "contactNumber": "7767977676",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested, candle business, need to call again today, 30-07/",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-137",
    "company": "Sajid ali",
    "contactName": "Sajid ali",
    "contactNumber": "93243 60986",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "ac repair and resell business, want to promote his businsess for leads. 30-07/",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-138",
    "company": "Ekta Business Card",
    "contactName": "Ekta Business Card",
    "contactNumber": "7439477135",
    "requirement": "Business Card Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "insurance company- need everything",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-139",
    "company": "doctor",
    "contactName": "Rajib",
    "contactNumber": "8584985870",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "need website for his business along with all",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-140",
    "company": "Archana kawat [Cha adda (sitola mandir)]",
    "contactName": "Archana kawat [Cha adda (sitola mandir)]",
    "contactNumber": "8274064759",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "need everything from bigining",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-141",
    "company": "Supratik Das",
    "contactName": "Protishruti",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "DO NOT WANT SERVICE ANYMORE",
    "isClient": false,
    "status": "LOST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-142",
    "company": "Jyoh's",
    "contactName": "Jyoh's",
    "contactNumber": "8332885426",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Not intrested",
    "isClient": false,
    "status": "LOST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-143",
    "company": "Ahmed",
    "contactName": "Ahmed",
    "contactNumber": "9769325466",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-144",
    "company": "Paresh Shah",
    "contactName": "Paresh Shah",
    "contactNumber": "9920908076, 7526002730",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "pickle ball manufacturer want to start social media need a proposal.29-07",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-145",
    "company": "Tropiflakes",
    "contactName": "Tropiflakes",
    "contactNumber": "9920987571",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-146",
    "company": "07",
    "contactName": "Full Fledged ecom, Meta, WhatsApp, SEO, He already did with some other vendor 29",
    "contactNumber": "N/A",
    "requirement": "Search Engine Optimization (SEO)",
    "dealType": "Regular",
    "recurringCycle": "Quarterly",
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "LOST",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-147",
    "company": "Ganguly Bagan",
    "contactName": "Marriage Banerjee",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-148",
    "company": "Jadadish Chodavadiya",
    "contactName": "Jadadish Chodavadiya",
    "contactNumber": "9016520576",
    "requirement": "Mobile App Development",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Intrested, send him detaills on whatapp call after lunch on 29-07/ 03-08 he will by thursday | 25th Jul",
    "isClient": false,
    "status": "HOT",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-149",
    "company": "Millie SenGupta",
    "contactName": "Millie SenGupta",
    "contactNumber": "9830022542",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-150",
    "company": "Vivek Bhagat",
    "contactName": "Vivek Bhagat",
    "contactNumber": "N/A",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Social media",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-151",
    "company": "Ashwini Nikam",
    "contactName": "Ashwini Nikam",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Fresher",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-152",
    "company": "Kamlesh Patel",
    "contactName": "Kamlesh Patel",
    "contactNumber": "N/A",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Social media",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-153",
    "company": "Sharun Kanan",
    "contactName": "Sharun Kanan",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-154",
    "company": "Anushree Joshi",
    "contactName": "Anushree Joshi",
    "contactNumber": "N/A",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Social media",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-155",
    "company": "Pravin Kakad",
    "contactName": "Pravin Kakad",
    "contactNumber": "N/A",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Website",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-156",
    "company": "Satyam Pandey",
    "contactName": "Satyam Pandey",
    "contactNumber": "N/A",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Website, social media",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-157",
    "company": "Ayush Agarwal",
    "contactName": "Ayush Agarwal",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-158",
    "company": "Amey Kathe",
    "contactName": "Amey Kathe",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-159",
    "company": "Abhishek",
    "contactName": "Abhishek",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-160",
    "company": "Chetna Dungarwal",
    "contactName": "Chetna Dungarwal",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-161",
    "company": "Nitin Kotkar",
    "contactName": "Nitin Kotkar",
    "contactNumber": "N/A",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Website",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-162",
    "company": "Anushree Joshi",
    "contactName": "Anushree Joshi",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-163",
    "company": "Deepak Seth",
    "contactName": "Deepak Seth",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-164",
    "company": "Manoj Sharma",
    "contactName": "Manoj Sharma",
    "contactNumber": "N/A",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Social media",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-165",
    "company": "Palani Balasundaram",
    "contactName": "Palani Balasundaram",
    "contactNumber": "N/A",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "digital marketing",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-166",
    "company": "Kritika",
    "contactName": "Kritika",
    "contactNumber": "N/A",
    "requirement": "Business Card Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "beusiness card",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-167",
    "company": "Rajkumar Ambiquest",
    "contactName": "Rajkumar Ambiquest",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-168",
    "company": "Anjan Chatterjee",
    "contactName": "Anjan Chatterjee",
    "contactNumber": "N/A",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "whatsapp Marketing",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-169",
    "company": "Rahul Ghosh",
    "contactName": "Rahul Ghosh",
    "contactNumber": "N/A",
    "requirement": "WhatsApp Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "whatsapp Marketing",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-170",
    "company": "𝗡𝗜𝗥𝗔𝗡𝗝𝗔𝗡 𝗠𝗔𝗥𝗨𝗧𝗜 𝗘𝗟𝗘𝗖𝗧𝗥𝗢𝗡𝗜𝗖𝗦",
    "contactName": "𝗡𝗜𝗥𝗔𝗡𝗝𝗔𝗡 𝗠𝗔𝗥𝗨𝗧𝗜 𝗘𝗟𝗘𝗖𝗧𝗥𝗢𝗡𝗜𝗖𝗦",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "All",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-171",
    "company": "ORDER MADE GARMENTS",
    "contactName": "ORDER MADE GARMENTS",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-172",
    "company": "Tanya Choudhary",
    "contactName": "Tanya Choudhary",
    "contactNumber": "N/A",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Sm",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-173",
    "company": "Abhishesk HoyslaNaTure Stay",
    "contactName": "Abhishesk HoyslaNaTure Stay",
    "contactNumber": "N/A",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Meta ads",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-174",
    "company": "Saket Lumiva",
    "contactName": "Saket Lumiva",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-175",
    "company": "Venkatgiri",
    "contactName": "Venkatgiri",
    "contactNumber": "N/A",
    "requirement": "Logo Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Logo and card made by us | SM Decor Lead Sanwar Ali | print related scope",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-176",
    "company": "Aravind Naktola",
    "contactName": "Aravind Naktola",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-177",
    "company": "Sonia Saha",
    "contactName": "Sonia Saha",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-178",
    "company": "Atri Ganguly",
    "contactName": "Atri Ganguly",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "All, insurance",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-179",
    "company": "Moloy",
    "contactName": "Moloy",
    "contactNumber": "N/A",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "All, insurance",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-180",
    "company": "Hiren Patel",
    "contactName": "Hiren Patel",
    "contactNumber": "90999 11127",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "social media",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-181",
    "company": "Nurul Hassan",
    "contactName": "Nurul Hassan",
    "contactNumber": "79081 29117",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-182",
    "company": "Ossim Fitness Rajesh",
    "contactName": "Ossim Fitness Rajesh",
    "contactNumber": "91620147996",
    "requirement": "Website Maintenance",
    "dealType": "Regular",
    "recurringCycle": "Quarterly",
    "comment": "website revamp and traffic",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-183",
    "company": "Farha",
    "contactName": "Farha",
    "contactNumber": "84206 17103",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-184",
    "company": "Avon Manoj Kumar",
    "contactName": "Avon Manoj Kumar",
    "contactNumber": "98712 19383",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-185",
    "company": "Rajesh Jain",
    "contactName": "Rajesh Jain",
    "contactNumber": "93300 01001",
    "requirement": "LinkedIn Ads & B2B Marketing",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "New catalouge needed for linkedin informed on 06-08",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-186",
    "company": "Abhay Singh",
    "contactName": "Abhay Singh",
    "contactNumber": "99788 02982",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "SMM Medta dds",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-187",
    "company": "Prakash Sil",
    "contactName": "Prakash Sil",
    "contactNumber": "81598 98505",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "lead",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-188",
    "company": "Priti Vashtu",
    "contactName": "Priti Vashtu",
    "contactNumber": "93150 71052",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-189",
    "company": "Sudhangshu",
    "contactName": "Sudhangshu",
    "contactNumber": "85297 34993",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-190",
    "company": "Keshav Somani",
    "contactName": "Keshav Somani",
    "contactNumber": "79806 67441",
    "requirement": "Logo Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Logo and website",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-191",
    "company": "Zaib Khan",
    "contactName": "Zaib Khan",
    "contactNumber": "89570 93958",
    "requirement": "Social Media (Organic)",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Smm",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-192",
    "company": "Md Shahid",
    "contactName": "Md Shahid",
    "contactNumber": "98306 96865",
    "requirement": "Basic Website",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "website",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-193",
    "company": "Shahid",
    "contactName": "Shahid",
    "contactNumber": "98755 06910",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Contact inquiry",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-194",
    "company": "House of Gifts",
    "contactName": "House of Gifts",
    "contactNumber": "93304 53857",
    "requirement": "Other",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "we",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-195",
    "company": "Manab Sen",
    "contactName": "Manab Sen",
    "contactNumber": "89610 58026",
    "requirement": "Business Card Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Business Card",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-196",
    "company": "Karan Sahu",
    "contactName": "Karan Sahu",
    "contactNumber": "90733 57499",
    "requirement": "Business Card Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Business Card",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-197",
    "company": "Major Vikram Gupta",
    "contactName": "Major Vikram Gupta",
    "contactNumber": "98300 68302",
    "requirement": "Business Card Design",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Business Card",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-198",
    "company": "Farhan Ahmed",
    "contactName": "Farhan Ahmed",
    "contactNumber": "73099 49495",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Digital Marketing",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  },
  {
    "id": "lead-imp-199",
    "company": "The Teacher Hub",
    "contactName": "The Teacher Hub",
    "contactNumber": "90733 12196",
    "requirement": "Meta / Google Advertisement",
    "dealType": "One-Time",
    "recurringCycle": null,
    "comment": "Digital Marketing",
    "isClient": false,
    "status": "WARM",
    "createdAt": "2026-10-14 05:30 PM"
  }
];

const DEFAULT_CLIENTS = [
  {
    id: "client-1",
    company: "Apex Footwear Store",
    contactName: "Sultan Mahmud",
    contactNumber: "01733-445566",
    requirement: "Basic Website",
    dealType: "One-Time",
    recurringCycle: null,
    becameClientAt: "2026-10-10 03:30:15 PM",
    dealAmount: 50000,
    payments: [
      { id: "p1", amount: 10000, date: "2026-10-10", method: "Bank Transfer", note: "1st installment (Advance)" },
      { id: "p2", amount: 5000, date: "2026-10-13", method: "bKash / Nagad", note: "2nd payment" }
    ]
  },
  {
    id: "client-2",
    company: "Nexus Healthcare Diagnostic",
    contactName: "Dr. Arif Chowdhury",
    contactNumber: "01711-998800",
    requirement: "SaaS & CRM Systems",
    dealType: "Regular",
    recurringCycle: "Half-Yearly",
    becameClientAt: "2026-10-08 12:15:40 PM",
    dealAmount: 35000,
    payments: [
      { id: "p3", amount: 35000, date: "2026-10-08", method: "Bank Transfer", note: "Full upfront payment" }
    ]
  }
];

// Boutique Default Seed Data (Fashion, Couture & Designer Studio Leads)
const DEFAULT_BOUTIQUE_LEADS = [
  {
    id: "btq-lead-1",
    company: "Aanya Bridal Couture",
    contactName: "Aanya Sen",
    contactNumber: "9830112233",
    requirement: "E-Commerce",
    dealType: "One-Time",
    recurringCycle: null,
    comment: "Autumn Bridal Lehenga collection setup & boutique showcase | urgent follow-up",
    isClient: false,
    status: "HOTTEST",
    createdAt: "2026-10-15 11:30 AM"
  },
  {
    id: "btq-lead-2",
    company: "The Silk Thread Studio",
    contactName: "Meera Das",
    contactNumber: "8017223344",
    requirement: "Instagram Page Creation",
    dealType: "Regular",
    recurringCycle: "Monthly",
    comment: "Handloom silk sarees & custom blouse styling reels promotion",
    isClient: false,
    status: "WARM",
    createdAt: "2026-10-15 01:15 PM"
  },
  {
    id: "btq-lead-3",
    company: "Velvet & Gold Boutique",
    contactName: "Ritu Verma",
    contactNumber: "9831998877",
    requirement: "Social Media (Organic)",
    dealType: "Regular",
    recurringCycle: "Quarterly",
    comment: "Diwali & Wedding ethnic wear collection catalogue shoot",
    isClient: false,
    status: "HOTTEST",
    createdAt: "2026-10-14 04:45 PM"
  },
  {
    id: "btq-lead-4",
    company: "Urban Stitch Tailoring",
    contactName: "Kabir Bose",
    contactNumber: "7003445566",
    requirement: "WhatsApp Marketing",
    dealType: "One-Time",
    recurringCycle: null,
    comment: "Bespoke Men's Kurta & Sherwani tailoring clients follow-up",
    isClient: false,
    status: "WARM",
    createdAt: "2026-10-14 02:20 PM"
  },
  {
    id: "btq-lead-5",
    company: "Chic Pret Studio",
    contactName: "Tanya Roy",
    contactNumber: "9163223399",
    requirement: "Meta / Google Advertisement",
    dealType: "One-Time",
    recurringCycle: null,
    comment: "Indo-Western gowns launch ad campaign for upcoming festive season",
    isClient: false,
    status: "HOTTEST",
    createdAt: "2026-10-13 06:10 PM"
  },
  {
    id: "btq-lead-6",
    company: "Zari Handloom Heritage",
    contactName: "Debashish Mondal",
    contactNumber: "9874112255",
    requirement: "Basic Website",
    dealType: "One-Time",
    recurringCycle: null,
    comment: "Bishnupuri & Baluchari pure silk saree catalogue website",
    isClient: false,
    status: "WARM",
    createdAt: "2026-10-13 12:40 PM"
  },
  {
    id: "btq-lead-7",
    company: "Blush & Blossom Kids",
    contactName: "Pooja Ghosh",
    contactNumber: "8240556677",
    requirement: "Logo Design",
    dealType: "One-Time",
    recurringCycle: null,
    comment: "Kids designer partywear brand identity & packaging tags",
    isClient: false,
    status: "COLD",
    createdAt: "2026-10-12 03:00 PM"
  },
  {
    id: "btq-lead-8",
    company: "Monochrome Minimalist Studio",
    contactName: "Sneha Paul",
    contactNumber: "9836778811",
    requirement: "Search Engine Optimization (SEO)",
    dealType: "Regular",
    recurringCycle: "Monthly",
    comment: "Eco-friendly cotton apparel store local discovery optimization",
    isClient: false,
    status: "WARM",
    createdAt: "2026-10-12 05:25 PM"
  }
];

const DEFAULT_BOUTIQUE_CLIENTS = [
  {
    id: "btq-client-1",
    company: "Royal Heritage Attire",
    contactName: "Anindita Roy",
    contactNumber: "9830554433",
    requirement: "E-Commerce",
    dealType: "One-Time",
    recurringCycle: null,
    becameClientAt: "2026-10-11 02:40:10 PM",
    dealAmount: 65000,
    payments: [
      { id: "bp1", amount: 35000, date: "2026-10-11", method: "Bank Transfer", note: "Advance booking for store launch" },
      { id: "bp2", amount: 15000, date: "2026-10-14", method: "UPI", note: "2nd milestone payment" }
    ]
  },
  {
    id: "btq-client-2",
    company: "Shree Fashion Boutique",
    contactName: "Sunita Khandelwal",
    contactNumber: "9831447722",
    requirement: "Social Media (Organic)",
    dealType: "Regular",
    recurringCycle: "Quarterly",
    becameClientAt: "2026-10-09 11:20:05 AM",
    dealAmount: 45000,
    payments: [
      { id: "bp3", amount: 45000, date: "2026-10-09", method: "UPI", note: "Full payment for Festive Quarter" }
    ]
  }
];

// App State
let leads = [];
let clients = [];
let pendingWonLead = null; // Holds temporary lead for WON alert confirmation
let users = [];
let currentUser = null;

// Default Seeded Users & Owner Configuration
let selectedAuthBrand = 'Pixel';

const OWNER_CONFIG = {
  Pixel: {
    phone: "8240017974",
    defaultCode: "pixelcrm"
  },
  Boutique: {
    phone: "8334816333",
    defaultCode: "boutiquecrm"
  }
};

const STORAGE_SECRET_CODES = 'pixel_crm_secret_codes_v1';
const STORAGE_OWNER_PHONES = 'pixel_crm_owner_phones_v1';

function getOwnerPhone(brand) {
  try {
    const stored = localStorage.getItem(STORAGE_OWNER_PHONES);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed[brand]) return parsed[brand];
    }
  } catch (e) {}
  return OWNER_CONFIG[brand] ? OWNER_CONFIG[brand].phone : (brand === 'Pixel' ? '8240017974' : '8334816333');
}

function setOwnerPhone(brand, newPhone) {
  try {
    let current = {
      Pixel: OWNER_CONFIG.Pixel.phone,
      Boutique: OWNER_CONFIG.Boutique.phone
    };
    const stored = localStorage.getItem(STORAGE_OWNER_PHONES);
    if (stored) current = { ...current, ...JSON.parse(stored) };
    current[brand] = newPhone.trim();
    localStorage.setItem(STORAGE_OWNER_PHONES, JSON.stringify(current));

    // Update in users array
    let ownerUser = users.find(u => u.brand === brand && (u.role === `${brand} Owner` || u.id === `usr-owner-${brand.toLowerCase()}`));
    if (ownerUser) {
      ownerUser.phone = newPhone.trim();
    } else {
      users.push({
        id: `usr-owner-${brand.toLowerCase()}`,
        name: `${brand} Owner`,
        phone: newPhone.trim(),
        brand: brand,
        password: "admin",
        role: `${brand} Owner`,
        createdAt: getCurrentFormattedDateTime()
      });
    }
    saveUsers();
  } catch (e) {
    console.warn("Failed to save owner phone:", e);
  }
}

function getSecretCode(brand) {
  try {
    const stored = localStorage.getItem(STORAGE_SECRET_CODES);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed[brand]) return parsed[brand];
    }
  } catch (e) {}
  return OWNER_CONFIG[brand] ? OWNER_CONFIG[brand].defaultCode : (brand === 'Pixel' ? 'pixelcrm' : 'boutiquecrm');
}

function setSecretCode(brand, newCode) {
  try {
    let current = {
      Pixel: OWNER_CONFIG.Pixel.defaultCode,
      Boutique: OWNER_CONFIG.Boutique.defaultCode
    };
    const stored = localStorage.getItem(STORAGE_SECRET_CODES);
    if (stored) current = { ...current, ...JSON.parse(stored) };
    current[brand] = newCode.trim();
    localStorage.setItem(STORAGE_SECRET_CODES, JSON.stringify(current));
  } catch (e) {
    console.warn("Failed to save secret code:", e);
  }
}

const DEFAULT_USERS = [
  {
    id: "usr-owner-pixel",
    name: "Pixel Owner",
    phone: "8240017974",
    brand: "Pixel",
    password: "admin",
    role: "Pixel Owner",
    createdAt: "2026-10-14"
  },
  {
    id: "usr-owner-boutique",
    name: "Boutique Owner",
    phone: "8334816333",
    brand: "Boutique",
    password: "admin",
    role: "Boutique Owner",
    createdAt: "2026-10-14"
  },
  {
    id: "usr-admin-pixel",
    name: "Pixel Admin",
    phone: "9830012345",
    brand: "Pixel",
    password: "admin",
    role: "Pixel Workspace",
    createdAt: "2026-10-14"
  },
  {
    id: "usr-admin-boutique",
    name: "Boutique Admin",
    phone: "9830054321",
    brand: "Boutique",
    password: "admin",
    role: "Boutique Workspace",
    createdAt: "2026-10-14"
  }
];

// Active Brand Resolver
function getActiveBrand() {
  if (currentUser && currentUser.brand) {
    return currentUser.brand;
  }
  return selectedAuthBrand || 'Pixel';
}

function getBrandStorageKey(type) {
  const brand = getActiveBrand().toLowerCase();
  return `crm_${brand}_${type}_v1`;
}

// Workspace Brand Selector (Modal: Pixel or Boutique)
function selectAuthBrand(brand) {
  selectedAuthBrand = brand;
  const btnPixel = document.getElementById('brand-opt-pixel');
  const btnBoutique = document.getElementById('brand-opt-boutique');
  const modalSub = document.getElementById('auth-modal-sub');
  const signinSubmit = document.getElementById('btn-submit-signin');
  const signupSubmit = document.getElementById('btn-submit-signup');
  const quickDemoText = document.getElementById('quick-demo-pill-text');

  if (btnPixel) btnPixel.classList.toggle('active', brand === 'Pixel');
  if (btnBoutique) btnBoutique.classList.toggle('active', brand === 'Boutique');

  if (modalSub) {
    modalSub.textContent = brand === 'Pixel' ? 'Your Digital Destination' : 'Boutique Workspace Access';
  }
  if (signinSubmit) signinSubmit.innerHTML = `<span>Sign In to ${brand} &rarr;</span>`;
  if (signupSubmit) signupSubmit.innerHTML = `<span>Create ${brand} Account & Enter &rarr;</span>`;

  // Update secret code placeholder and hints for selected workspace
  const secretInput = document.getElementById('signup-secret-code');
  const secretHint = document.getElementById('signup-secret-hint');
  if (secretInput) {
    secretInput.placeholder = `Enter company code (e.g. ${brand === 'Pixel' ? 'pixelcrm' : 'boutiquecrm'})`;
  }
  if (secretHint) {
    secretHint.textContent = `Secret code provided by business owner to join ${brand}.`;
  }

  if (quickDemoText) {
    const ownerPhone = getOwnerPhone(brand);
    quickDemoText.innerHTML = `⚡ Quick Fill: <strong>${ownerPhone}</strong> / <strong>admin</strong> (${brand})`;
  }
}

// Secure Workspace Switch Handler (Requires Sign Out & Re-authentication)
function handleSwitchAccountRequest() {
  const currentBrand = getActiveBrand();
  const targetBrand = currentBrand === 'Pixel' ? 'Boutique' : 'Pixel';

  const shouldSwitch = confirm(
    `Switch to ${targetBrand} Workspace?\n\nFor security and data privacy, you will be signed out of ${currentBrand} to authenticate into ${targetBrand}.`
  );

  if (shouldSwitch) {
    currentUser = null;
    localStorage.removeItem(STORAGE_CURRENT_USER);
    leads = [];
    clients = [];
    selectAuthBrand(targetBrand);
    updateAuthUI();
    renderDashboard();
    renderLeadsTable();
    renderClientsTable();
    showToast(`Please sign in to ${targetBrand} Workspace.`, "info");
  }
}

// Authentication Helpers
function loadUsers() {
  try {
    const storedUsers = localStorage.getItem(STORAGE_USERS);
    let loaded = storedUsers ? JSON.parse(storedUsers) : [];
    if (!Array.isArray(loaded)) loaded = [];

    // Ensure all default users and owners always exist
    DEFAULT_USERS.forEach(def => {
      const idx = loaded.findIndex(u => u.phone === def.phone && u.brand === def.brand);
      if (idx === -1) {
        loaded.push(def);
      }
    });

    // Also guarantee dynamic owner accounts exist
    ['Pixel', 'Boutique'].forEach(brand => {
      const ownerPhone = getOwnerPhone(brand);
      const exists = loaded.some(u => u.phone === ownerPhone && u.brand === brand);
      if (!exists) {
        loaded.push({
          id: `usr-owner-${brand.toLowerCase()}`,
          name: `${brand} Owner`,
          phone: ownerPhone,
          brand: brand,
          password: "admin",
          role: `${brand} Owner`,
          createdAt: "2026-10-14"
        });
      }
    });

    users = loaded;
    saveUsers();
  } catch (e) {
    users = DEFAULT_USERS;
  }
}

function saveUsers() {
  try {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save users:", e);
  }
}

function checkAuthState() {
  try {
    const storedCurrent = localStorage.getItem(STORAGE_CURRENT_USER);
    if (storedCurrent) {
      const parsed = JSON.parse(storedCurrent);
      if (parsed && parsed.brand && (parsed.brand === 'Pixel' || parsed.brand === 'Boutique')) {
        currentUser = parsed;
        selectedAuthBrand = currentUser.brand;
      } else {
        currentUser = null;
      }
    } else {
      currentUser = null;
    }
  } catch (e) {
    currentUser = null;
  }
  updateAuthUI();
}

function updateAuthUI() {
  const overlay = document.getElementById('auth-overlay');
  const sidebarInitials = document.getElementById('sidebar-user-initials');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarRole = document.getElementById('sidebar-user-role');
  const pageTitle = document.getElementById('page-title');
  const sidebarBrandImg = document.getElementById('sidebar-brand-img');

  const wsBadge = document.getElementById('topbar-workspace-badge');
  const wsBadgeImg = document.getElementById('ws-badge-img');
  const wsName = document.getElementById('ws-badge-name');
  const topbarAvatarImg = document.getElementById('topbar-user-avatar-img');

  const brand = getActiveBrand();

  if (!currentUser) {
    // Show Auth Overlay - Block entire CRM
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Clear sensitive data in memory while unauthenticated
    leads = [];
    clients = [];

    if (sidebarInitials) sidebarInitials.textContent = '--';
    if (sidebarName) sidebarName.textContent = 'Guest';
    if (sidebarRole) sidebarRole.textContent = 'Signed Out';
    if (pageTitle) pageTitle.textContent = 'Welcome — Sign In Required';

    if (wsBadge) wsBadge.className = 'ws-badge-pill';
    if (wsBadgeImg) wsBadgeImg.style.display = 'none';
    if (wsName) wsName.textContent = '🔒 Locked (Sign In)';
  } else {
    // Authenticated into currentUser.brand
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';

    const initials = brand === 'Boutique' ? 'BT' : 'PX';

    if (sidebarInitials) sidebarInitials.textContent = initials;
    if (sidebarName) sidebarName.textContent = currentUser.phone ? `+91 ${currentUser.phone}` : `${brand} User`;
    if (sidebarRole) sidebarRole.textContent = `${brand} Workspace`;
    if (pageTitle) pageTitle.textContent = `Good Day, ${brand} Team 👏`;
    document.title = `${brand} CRM — Your Digital Destination`;

    if (sidebarBrandImg) {
      sidebarBrandImg.src = 'logo.png';
      sidebarBrandImg.alt = `${brand} CRM`;
    }

    if (wsBadge) wsBadge.className = `ws-badge-pill ${brand === 'Boutique' ? 'boutique' : 'pixel'}`;
    if (wsBadgeImg) {
      wsBadgeImg.src = 'logo-icon.png';
      wsBadgeImg.style.display = 'inline-block';
    }
    if (topbarAvatarImg) {
      topbarAvatarImg.src = 'logo-icon.png';
    }
    if (wsName) wsName.textContent = `${brand} Workspace`;
  }
}

// State for In-App Smart OTP verification
let generatedOtp = null;
let otpTargetPhone = null;

function switchAuthTab(mode) {
  const tabsContainer = document.querySelector('.auth-tabs');
  const btnSignin = document.getElementById('tab-btn-signin');
  const btnSignup = document.getElementById('tab-btn-signup');
  const formSignin = document.getElementById('form-signin');
  const formSignup = document.getElementById('form-signup');
  const formForgot = document.getElementById('form-forgot');

  if (mode === 'signin') {
    if (tabsContainer) tabsContainer.style.display = 'grid';
    if (btnSignin) btnSignin.classList.add('active');
    if (btnSignup) btnSignup.classList.remove('active');
    if (formSignin) formSignin.classList.add('active');
    if (formSignup) formSignup.classList.remove('active');
    if (formForgot) formForgot.classList.remove('active');
  } else if (mode === 'signup') {
    if (tabsContainer) tabsContainer.style.display = 'grid';
    if (btnSignup) btnSignup.classList.add('active');
    if (btnSignin) btnSignin.classList.remove('active');
    if (formSignup) formSignup.classList.add('active');
    if (formSignin) formSignin.classList.remove('active');
    if (formForgot) formForgot.classList.remove('active');
  } else if (mode === 'forgot') {
    if (tabsContainer) tabsContainer.style.display = 'none';
    if (formForgot) formForgot.classList.add('active');
    if (formSignin) formSignin.classList.remove('active');
    if (formSignup) formSignup.classList.remove('active');

    // Reset forgot steps
    const stepPhone = document.getElementById('forgot-step-phone');
    const stepVerify = document.getElementById('forgot-step-verify');
    if (stepPhone) stepPhone.style.display = 'block';
    if (stepVerify) stepVerify.style.display = 'none';
  }
}

function openForgotView() {
  const signinPhone = document.getElementById('signin-phone');
  const forgotPhone = document.getElementById('forgot-phone');
  if (signinPhone && forgotPhone && signinPhone.value.trim()) {
    forgotPhone.value = signinPhone.value.trim();
  }
  switchAuthTab('forgot');
}

function handleSendOtp() {
  const phoneInput = document.getElementById('forgot-phone');
  const phone = phoneInput ? phoneInput.value.trim() : '';

  if (!phone) {
    showToast("Please enter your registered mobile number.", "danger");
    return;
  }

  // Find user strictly matching phone and workspace
  let foundUser = users.find(u => u.phone === phone && u.brand === selectedAuthBrand);
  if (!foundUser) {
    const ownerPhone = getOwnerPhone(selectedAuthBrand);
    if (phone === ownerPhone || (selectedAuthBrand === 'Boutique' && phone === '8334816333') || (selectedAuthBrand === 'Pixel' && phone === '8240017974')) {
      foundUser = {
        id: `usr-owner-${selectedAuthBrand.toLowerCase()}`,
        name: `${selectedAuthBrand} Owner`,
        phone: phone,
        brand: selectedAuthBrand,
        password: "admin",
        role: `${selectedAuthBrand} Owner`,
        createdAt: getCurrentFormattedDateTime()
      };
      users.push(foundUser);
      saveUsers();
    } else {
      showToast(`No account found for ${phone} in ${selectedAuthBrand} CRM.`, "warning");
      return;
    }
  }

  // Generate 4-digit OTP code
  generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  otpTargetPhone = phone;

  // Transition to Step 2
  const stepPhone = document.getElementById('forgot-step-phone');
  const stepVerify = document.getElementById('forgot-step-verify');
  const otpDisplay = document.getElementById('otp-display-code');

  if (stepPhone) stepPhone.style.display = 'none';
  if (stepVerify) stepVerify.style.display = 'block';
  if (otpDisplay) otpDisplay.textContent = generatedOtp;

  // Prominent in-app SMS notification simulation
  showToast(`📲 Verification Code: Your OTP is ${generatedOtp}`, "info");
}

function autoFillOtp() {
  if (generatedOtp) {
    const otpInput = document.getElementById('forgot-otp');
    if (otpInput) {
      otpInput.value = generatedOtp;
      showToast("OTP code auto-filled!", "success");
    }
  }
}

async function handleResetPasswordSubmit() {
  const otpInput = document.getElementById('forgot-otp');
  const passInput = document.getElementById('forgot-new-password');

  const enteredOtp = otpInput ? otpInput.value.trim() : '';
  const newPass = passInput ? passInput.value : '';

  if (!enteredOtp) {
    showToast("Please enter the 4-digit OTP.", "danger");
    return;
  }
  if (enteredOtp !== generatedOtp) {
    showToast("Invalid OTP code. Please check and try again.", "danger");
    return;
  }
  if (!newPass || newPass.length < 4) {
    showToast("Password must be at least 4 characters.", "danger");
    return;
  }

  // Find user and update password
  let user = users.find(u => u.phone === otpTargetPhone && u.brand === selectedAuthBrand);
  if (!user) {
    showToast("User account not found.", "danger");
    return;
  }

  user.password = newPass;
  saveUsers();

  // Also update in Supabase cloud users table
  if (supabaseClient) {
    try {
      await supabaseClient
        .from('users')
        .update({ password: newPass })
        .eq('phone', otpTargetPhone)
        .eq('workspace', selectedAuthBrand);
      console.log("☁️ Password updated in Supabase cloud!");
    } catch (e) {
      console.warn("Supabase password update note:", e);
    }
  }

  // Directly log in user with updated account
  currentUser = user;
  localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(currentUser));
  syncUserToSupabase(currentUser);

  loadData();
  updateAuthUI();
  renderDashboard();
  renderLeadsTable();
  renderClientsTable();

  // Reset form inputs & state
  if (otpInput) otpInput.value = '';
  if (passInput) passInput.value = '';
  generatedOtp = null;
  otpTargetPhone = null;

  showToast(`Password updated successfully! Welcome to ${selectedAuthBrand} CRM! 🎉`, "success");
}

function quickFillAdmin() {
  const phoneInput = document.getElementById('signin-phone');
  const passInput = document.getElementById('signin-password');
  const ownerPhone = getOwnerPhone(selectedAuthBrand);
  if (phoneInput) phoneInput.value = ownerPhone;
  if (passInput) passInput.value = 'admin';
  switchAuthTab('signin');
  showToast(`Demo credentials filled for ${selectedAuthBrand}!`);
}

// Change Secret Code & Owner Phone (Owner OTP Protected)
let generatedOwnerOtp = null;
let currentChangingBrand = 'Pixel';

function openChangeSecretModal() {
  currentChangingBrand = selectedAuthBrand || 'Pixel';
  const titleEl = document.getElementById('modal-secret-title');
  const subEl = document.getElementById('modal-secret-sub');
  const phoneEl = document.getElementById('secret-owner-number');
  const step1 = document.getElementById('secret-step-1');
  const step2 = document.getElementById('secret-step-2');
  const otpInput = document.getElementById('owner-otp-input');
  const secretInput = document.getElementById('new-secret-input');
  const phoneInput = document.getElementById('new-owner-phone-input');
  const modal = document.getElementById('modal-secret-code');

  if (titleEl) titleEl.textContent = `Security Control (${currentChangingBrand})`;
  if (subEl) subEl.textContent = `Update Secret Code or Owner Mobile Number`;
  const ownerPhone = getOwnerPhone(currentChangingBrand);
  if (phoneEl) phoneEl.textContent = `+91 ${ownerPhone}`;

  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  if (otpInput) otpInput.value = '';
  if (secretInput) secretInput.value = '';
  if (phoneInput) phoneInput.value = ownerPhone;
  generatedOwnerOtp = null;

  if (modal) modal.classList.remove('hidden');
}

function closeChangeSecretModal() {
  const modal = document.getElementById('modal-secret-code');
  if (modal) modal.classList.add('hidden');
  generatedOwnerOtp = null;
}

function handleSendOwnerOtp() {
  const ownerPhone = getOwnerPhone(currentChangingBrand);
  generatedOwnerOtp = String(Math.floor(1000 + Math.random() * 9000));

  const step1 = document.getElementById('secret-step-1');
  const step2 = document.getElementById('secret-step-2');
  const otpDisplay = document.getElementById('owner-otp-display');

  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = 'block';
  if (otpDisplay) otpDisplay.textContent = generatedOwnerOtp;

  showToast(`📲 Owner verification OTP sent to +91 ${ownerPhone}: Code is ${generatedOwnerOtp}`, "info");
}

function autoFillOwnerOtp() {
  if (generatedOwnerOtp) {
    const otpInput = document.getElementById('owner-otp-input');
    if (otpInput) {
      otpInput.value = generatedOwnerOtp;
      showToast("Owner OTP auto-filled!", "success");
    }
  }
}

function handleSaveNewSecretCode() {
  const otpInput = document.getElementById('owner-otp-input');
  const secretInput = document.getElementById('new-secret-input');
  const phoneInput = document.getElementById('new-owner-phone-input');

  const enteredOtp = otpInput ? otpInput.value.trim() : '';
  const newCode = secretInput ? secretInput.value.trim() : '';
  const newPhone = phoneInput ? phoneInput.value.trim() : '';
  const currentOwnerPhone = getOwnerPhone(currentChangingBrand);

  if (!enteredOtp) {
    showToast("Please enter the 4-digit Owner OTP.", "danger");
    return;
  }
  if (enteredOtp !== generatedOwnerOtp) {
    showToast("Invalid Owner OTP code. Please check and try again.", "danger");
    return;
  }

  const hasNewPhone = newPhone && newPhone !== currentOwnerPhone;
  const hasNewCode = newCode && newCode.length > 0;

  if (!hasNewPhone && !hasNewCode) {
    showToast("Please enter a new mobile number or a new secret code to update.", "warning");
    return;
  }

  const updates = [];

  // 1. Process Mobile Number Update
  if (hasNewPhone) {
    if (newPhone.length < 10) {
      showToast("Owner Mobile Number must be at least 10 digits.", "danger");
      return;
    }
    setOwnerPhone(currentChangingBrand, newPhone);
    updates.push(`Owner Number (+91 ${newPhone})`);
  }

  // 2. Process Secret Code Update
  if (hasNewCode) {
    if (newCode.length < 3) {
      showToast("New Secret Code must be at least 3 characters long.", "danger");
      return;
    }
    setSecretCode(currentChangingBrand, newCode);
    const signupSecretInput = document.getElementById('signup-secret-code');
    if (signupSecretInput && selectedAuthBrand === currentChangingBrand) {
      signupSecretInput.value = newCode;
    }
    updates.push(`Secret Code ("${newCode}")`);
  }

  closeChangeSecretModal();
  selectAuthBrand(currentChangingBrand);
  showToast(`Security updated for ${currentChangingBrand}: ${updates.join(" & ")} successfully! 🎉`, "success");
}

window.selectAuthBrand = selectAuthBrand;
window.handleSwitchAccountRequest = handleSwitchAccountRequest;
window.quickFillAdmin = quickFillAdmin;
window.switchAuthTab = switchAuthTab;
window.handleSignOut = handleSignOut;
window.openForgotView = openForgotView;
window.handleSendOtp = handleSendOtp;
window.autoFillOtp = autoFillOtp;
window.handleResetPasswordSubmit = handleResetPasswordSubmit;
window.openChangeSecretModal = openChangeSecretModal;
window.closeChangeSecretModal = closeChangeSecretModal;
window.handleSendOwnerOtp = handleSendOwnerOtp;
window.autoFillOwnerOtp = autoFillOwnerOtp;
window.handleSaveNewSecretCode = handleSaveNewSecretCode;

function handleSignInSubmit(e) {
  e.preventDefault();
  const phone = document.getElementById('signin-phone').value.trim();
  const password = document.getElementById('signin-password').value;

  if (!phone || !password) {
    showToast("Please enter mobile number and password.", "danger");
    return;
  }

  // Find user strictly matching phone AND selected workspace brand
  let foundUser = users.find(u => u.phone === phone && u.brand === selectedAuthBrand);

  if (foundUser) {
    const ownerPhone = getOwnerPhone(selectedAuthBrand);
    // Password validation: accept saved password or demo admin passwords
    const isValidPass = (foundUser.password === password) ||
      (password === 'admin' && (phone === ownerPhone || phone === '8240017974' || phone === '8334816333' || phone === '9830012345' || phone === '9830054321'));

    if (!isValidPass) {
      showToast("Incorrect password. Please try again.", "danger");
      return;
    }
  } else {
    const ownerPhone = getOwnerPhone(selectedAuthBrand);
    if (phone === ownerPhone || (selectedAuthBrand === 'Boutique' && phone === '8334816333') || (selectedAuthBrand === 'Pixel' && phone === '8240017974')) {
      foundUser = {
        id: `usr-owner-${selectedAuthBrand.toLowerCase()}`,
        name: `${selectedAuthBrand} Owner`,
        phone: phone,
        brand: selectedAuthBrand,
        password: password,
        role: `${selectedAuthBrand} Owner`,
        createdAt: getCurrentFormattedDateTime()
      };
      users.push(foundUser);
      saveUsers();
    } else {
      // Check if user is registered in the other brand
      const userInOtherBrand = users.find(u => u.phone === phone);
      if (userInOtherBrand) {
        showToast(`This number is registered under ${userInOtherBrand.brand}. Please select ${userInOtherBrand.brand} to log in, or sign up for ${selectedAuthBrand}.`, "warning");
        return;
      }

      showToast(`No account found for this mobile number in ${selectedAuthBrand}. Please Sign Up with the Company Secret Code.`, "danger");
      return;
    }
  }

  currentUser = foundUser;
  localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(currentUser));
  syncUserToSupabase(currentUser);

  // Load ONLY the authenticated workspace data (Pixel or Boutique)
  loadData();
  updateAuthUI();
  renderDashboard();
  renderLeadsTable();
  renderClientsTable();
  showToast(`Welcome to ${selectedAuthBrand} Workspace! 👋`, "success");
}

function handleSignUpSubmit(e) {
  e.preventDefault();
  const phone = document.getElementById('signup-phone').value.trim();
  const password = document.getElementById('signup-password').value;
  const secretInput = document.getElementById('signup-secret-code');
  const enteredSecret = secretInput ? secretInput.value.trim() : '';

  if (!phone || !password) {
    showToast("Please enter mobile number and password.", "danger");
    return;
  }

  if (!enteredSecret) {
    showToast(`Please enter Company Secret Code to sign up for ${selectedAuthBrand}.`, "danger");
    if (secretInput) secretInput.focus();
    return;
  }

  const activeSecret = getSecretCode(selectedAuthBrand);
  if (enteredSecret.toLowerCase() !== activeSecret.toLowerCase()) {
    const ownerPhone = getOwnerPhone(selectedAuthBrand);
    showToast(`Invalid Secret Code! Contact ${selectedAuthBrand} Owner (+91 ${ownerPhone}) or change code with Owner OTP.`, "danger");
    return;
  }

  let existingUser = users.find(u => u.phone === phone && u.brand === selectedAuthBrand);
  if (existingUser) {
    showToast(`An account with this number already exists in ${selectedAuthBrand}. Please Sign In.`, "warning");
    switchAuthTab('signin');
    const signinPhone = document.getElementById('signin-phone');
    if (signinPhone) signinPhone.value = phone;
    return;
  }

  const newUser = {
    id: "usr-" + Date.now(),
    name: `${selectedAuthBrand} User`,
    phone: phone,
    brand: selectedAuthBrand,
    password: password,
    role: `${selectedAuthBrand} Workspace`,
    createdAt: getCurrentFormattedDateTime()
  };
  users.push(newUser);
  saveUsers();
  currentUser = newUser;

  localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(currentUser));
  syncUserToSupabase(currentUser);

  // Load ONLY the authenticated workspace data (Pixel or Boutique)
  loadData();
  updateAuthUI();
  renderDashboard();
  renderLeadsTable();
  renderClientsTable();
  showToast(`Account created for ${selectedAuthBrand}! Welcome! 🎉`, "success");
}

function handleSignOut() {
  const brand = getActiveBrand();
  if (confirm(`Are you sure you want to sign out of ${brand} CRM?`)) {
    currentUser = null;
    localStorage.removeItem(STORAGE_CURRENT_USER);
    leads = [];
    clients = [];
    updateAuthUI();
    renderDashboard();
    renderLeadsTable();
    renderClientsTable();
    showToast("You have been signed out.");
  }
}

// Format Currency (Indian Rupee ₹)
function formatMoney(amount) {
  const val = Number(amount) || 0;
  return "₹" + val.toLocaleString('en-IN');
}

// Format Date & Exact Time
function getCurrentFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

// Persistence Helpers: Dynamic by Workspace (Pixel vs Boutique) with Supabase Cloud Sync
function loadData() {
  // 1. Fast local load from cache (0ms latency)
  loadDataFromLocal();

  // 2. Fetch live data from Supabase in the background
  syncFromSupabase();
}

function loadDataFromLocal() {
  try {
    const brand = getActiveBrand();
    const leadsKey = getBrandStorageKey('leads');
    const clientsKey = getBrandStorageKey('clients');

    if (brand === 'Boutique') {
      const storedLeads = localStorage.getItem(leadsKey);
      const storedClients = localStorage.getItem(clientsKey);
      leads = storedLeads ? JSON.parse(storedLeads) : JSON.parse(JSON.stringify(DEFAULT_BOUTIQUE_LEADS));
      clients = storedClients ? JSON.parse(storedClients) : JSON.parse(JSON.stringify(DEFAULT_BOUTIQUE_CLIENTS));
    } else {
      // Pixel Workspace
      const storedLeads = localStorage.getItem(leadsKey) || localStorage.getItem(STORAGE_LEADS);
      const storedClients = localStorage.getItem(clientsKey) || localStorage.getItem(STORAGE_CLIENTS) || localStorage.getItem('pixel_crm_clients_v1');
      leads = storedLeads ? JSON.parse(storedLeads) : JSON.parse(JSON.stringify(DEFAULT_LEADS));
      clients = storedClients ? JSON.parse(storedClients) : JSON.parse(JSON.stringify(DEFAULT_CLIENTS));
    }
  } catch (e) {
    console.error("Failed to parse workspace local data:", e);
    const brand = getActiveBrand();
    if (brand === 'Boutique') {
      leads = JSON.parse(JSON.stringify(DEFAULT_BOUTIQUE_LEADS));
      clients = JSON.parse(JSON.stringify(DEFAULT_BOUTIQUE_CLIENTS));
    } else {
      leads = JSON.parse(JSON.stringify(DEFAULT_LEADS));
      clients = JSON.parse(JSON.stringify(DEFAULT_CLIENTS));
    }
  }
}

function saveData() {
  try {
    const brand = getActiveBrand();
    const leadsKey = getBrandStorageKey('leads');
    const clientsKey = getBrandStorageKey('clients');
    localStorage.setItem(leadsKey, JSON.stringify(leads));
    localStorage.setItem(clientsKey, JSON.stringify(clients));

    // Also sync to legacy keys if Pixel for backward compatibility
    if (brand === 'Pixel') {
      localStorage.setItem(STORAGE_LEADS, JSON.stringify(leads));
      localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(clients));
    }
  } catch (e) {
    console.error("Failed to save workspace data:", e);
  }
}

// ==========================================
// SUPABASE REALTIME CLOUD SYNC FUNCTIONS
// ==========================================
async function syncFromSupabase() {
  if (!supabaseClient) return;
  const brand = getActiveBrand();
  try {
    // 1. Fetch leads from Supabase
    const { data: dbLeads, error: lErr } = await supabaseClient
      .from('leads')
      .select('*')
      .eq('workspace', brand)
      .order('created_at', { ascending: false });

    // 2. Fetch clients with payments from Supabase
    const { data: dbClients, error: cErr } = await supabaseClient
      .from('clients')
      .select('*, payments(*)')
      .eq('workspace', brand)
      .order('created_at', { ascending: false });

    let updated = false;

    if (!lErr && dbLeads && dbLeads.length > 0) {
      leads = dbLeads.map(l => ({
        id: l.id,
        company: l.company,
        contactName: l.contact_name,
        contactNumber: l.contact_number,
        requirement: l.requirement,
        dealType: l.deal_type,
        recurringCycle: l.recurring_cycle,
        comment: l.comment,
        isClient: !!l.is_client,
        status: l.status,
        createdAt: l.created_at
      }));
      updated = true;
    }

    if (!cErr && dbClients && dbClients.length > 0) {
      clients = dbClients.map(c => ({
        id: c.id,
        company: c.company,
        contactName: c.contact_name,
        contactNumber: c.contact_number,
        requirement: c.requirement,
        dealType: c.deal_type,
        recurringCycle: c.recurring_cycle,
        becameClientAt: c.became_client_at,
        dealAmount: Number(c.deal_amount) || 0,
        payments: (c.payments || []).map(p => ({
          id: p.id,
          amount: Number(p.amount) || 0,
          date: p.payment_date,
          method: p.method,
          note: p.note
        }))
      }));
      updated = true;
    }

    if (updated) {
      saveData();
      renderDashboard();
      renderLeadsTable();
      renderClientsTable();
      console.log(`☁️ Supabase: Synced ${brand} workspace data successfully!`);
    }
  } catch (err) {
    console.warn("Supabase background sync notice:", err);
  }
}

async function syncLeadToSupabase(lead) {
  if (!supabaseClient) return;
  try {
    const brand = getActiveBrand();
    await supabaseClient.from('leads').upsert({
      id: lead.id,
      workspace: brand,
      company: lead.company,
      contact_name: lead.contactName || '',
      contact_number: lead.contactNumber || '',
      requirement: lead.requirement || 'Other',
      deal_type: lead.dealType || 'One-Time',
      recurring_cycle: lead.recurringCycle || null,
      comment: lead.comment || '',
      is_client: !!lead.isClient,
      status: lead.status || 'WARM'
    });
  } catch (e) {
    console.warn("Failed to sync lead to Supabase:", e);
  }
}

async function deleteLeadFromSupabase(leadId) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.from('leads').delete().eq('id', leadId);
  } catch (e) {
    console.warn("Failed to delete lead from Supabase:", e);
  }
}

async function updateLeadStatusInSupabase(leadId, status, isClient = false) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.from('leads').update({ status, is_client: isClient }).eq('id', leadId);
  } catch (e) {
    console.warn("Failed to update status in Supabase:", e);
  }
}

async function syncClientToSupabase(client) {
  if (!supabaseClient) return;
  try {
    const brand = getActiveBrand();
    await supabaseClient.from('clients').upsert({
      id: client.id,
      workspace: brand,
      company: client.company,
      contact_name: client.contactName || '',
      contact_number: client.contactNumber || '',
      requirement: client.requirement || 'Other',
      deal_type: client.dealType || 'One-Time',
      recurring_cycle: client.recurringCycle || null,
      became_client_at: client.becameClientAt || '',
      deal_amount: client.dealAmount || 0
    });
    if (client.payments && client.payments.length > 0) {
      for (const p of client.payments) {
        await syncPaymentToSupabase(p, client.id);
      }
    }
  } catch (e) {
    console.warn("Failed to sync client to Supabase:", e);
  }
}

async function deleteClientFromSupabase(clientId) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.from('clients').delete().eq('id', clientId);
  } catch (e) {
    console.warn("Failed to delete client from Supabase:", e);
  }
}

async function syncPaymentToSupabase(payment, clientId) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.from('payments').upsert({
      id: payment.id,
      client_id: clientId,
      amount: payment.amount,
      payment_date: payment.date,
      method: payment.method,
      note: payment.note
    });
  } catch (e) {
    console.warn("Failed to sync payment to Supabase:", e);
  }
}

async function deletePaymentFromSupabase(paymentId) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.from('payments').delete().eq('id', paymentId);
  } catch (e) {
    console.warn("Failed to delete payment from Supabase:", e);
  }
}

async function syncUserToSupabase(user) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.from('users').upsert({
      id: user.id,
      phone: user.phone,
      password: user.password,
      name: user.name,
      brand: user.brand || 'Pixel',
      role: user.role || 'Admin Workspace'
    });
  } catch (e) {
    console.warn("Failed to sync user to Supabase:", e);
  }
}

// Client Math Utilities
function getClientFinancials(client) {
  const deal = Number(client.dealAmount) || 0;
  const payments = client.payments || [];
  const paid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const due = Math.max(0, deal - paid);
  
  let status = "UNPAID";
  if (paid >= deal && deal > 0) {
    status = "PAID";
  } else if (paid > 0) {
    status = "PARTIAL";
  }

  return { deal, paid, due, status };
}

// Toast Notifications
function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'danger' ? 'toast-danger' : 'toast-success'}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Mobile Sidebar Drawer Helpers
function openSidebarMobile() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebarMobile() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Navigation Tab Switching
function switchTab(tabName) {
  // Sync desktop sidebar nav items
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Sync mobile bottom bar items
  document.querySelectorAll('.mobile-bottom-item[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Auto-close mobile drawer if open
  closeSidebarMobile();

  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById(`view-${tabName}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  // Update Page Title & Breadcrumb
  const titleEl = document.getElementById('page-title');
  const subEl = document.getElementById('page-subtitle');
  const breadcrumbEl = document.getElementById('top-breadcrumb-active');
  const brand = getActiveBrand();

  if (tabName === 'dashboard') {
    if (breadcrumbEl) breadcrumbEl.textContent = 'Dashboard';
    titleEl.textContent = `Good Day, ${brand} Team 👏`;
    subEl.textContent = `Here is what is happening with your ${brand} sales pipeline today`;
    renderDashboard();
  } else if (tabName === 'leads') {
    if (breadcrumbEl) breadcrumbEl.textContent = `${brand} Pipeline`;
    titleEl.textContent = `${brand} Leads Management`;
    subEl.textContent = `Track and nurture prospective customer deals for ${brand}`;
    renderLeadsTable();
  } else if (tabName === 'clients') {
    if (breadcrumbEl) breadcrumbEl.textContent = `${brand} Clients`;
    titleEl.textContent = `${brand} Clients & Payment Tracking`;
    subEl.textContent = `Track confirmed ${brand} clients, installments, and remaining balances`;
    renderClientsTable();
  }
}

// Populate Requirement / Service Dropdowns
function populateRequirementFilters() {
  const filterSelect = document.getElementById('leads-filter-req');
  const leadSelect = document.getElementById('lead-requirement');
  const clientSelect = document.getElementById('client-requirement');

  if (filterSelect) {
    const curVal = filterSelect.value || 'ALL';
    filterSelect.innerHTML = '<option value="ALL">All Requirements / Services</option>';
    REQUIREMENTS.forEach(req => {
      const opt = document.createElement('option');
      opt.value = req;
      opt.textContent = req;
      filterSelect.appendChild(opt);
    });
    filterSelect.value = curVal;
  }

  if (leadSelect) {
    const curVal = leadSelect.value;
    leadSelect.innerHTML = '<option value="" disabled selected>-- Select Service / Requirement --</option>';
    REQUIREMENTS.forEach(req => {
      const opt = document.createElement('option');
      opt.value = req;
      opt.textContent = req;
      leadSelect.appendChild(opt);
    });
    if (curVal) leadSelect.value = curVal;
  }

  if (clientSelect) {
    const curVal = clientSelect.value;
    clientSelect.innerHTML = '<option value="" disabled selected>-- Select Service / Requirement --</option>';
    REQUIREMENTS.forEach(req => {
      const opt = document.createElement('option');
      opt.value = req;
      opt.textContent = req;
      clientSelect.appendChild(opt);
    });
    if (curVal) clientSelect.value = curVal;
  }
}

// ==========================================
// 1. DASHBOARD RENDERING (Dribbble Style)
// ==========================================
function renderDashboard() {
  // Counts
  const totalLeads = leads.length;
  const totalClients = clients.length;
  const hotLeads = leads.filter(l => l.status === 'HOT' || l.status === 'HOTTEST').length;

  let totalDealSum = 0;
  let totalReceivedSum = 0;
  let totalDueSum = 0;

  clients.forEach(c => {
    const fin = getClientFinancials(c);
    totalDealSum += fin.deal;
    totalReceivedSum += fin.paid;
    totalDueSum += fin.due;
  });

  // Metric Elements
  const mLeads = document.getElementById('metric-total-leads');
  const mClients = document.getElementById('metric-total-clients');
  const mHot = document.getElementById('metric-hot-leads');
  const mDeal = document.getElementById('metric-deal-amount');
  const mRec = document.getElementById('metric-received-amount');
  const mDue = document.getElementById('metric-due-amount');

  if (mLeads) mLeads.textContent = totalLeads;
  if (mClients) mClients.textContent = totalClients;
  if (mHot) mHot.textContent = hotLeads;
  if (mDeal) mDeal.textContent = formatMoney(totalDealSum);
  if (mRec) mRec.textContent = formatMoney(totalReceivedSum);
  if (mDue) mDue.textContent = formatMoney(totalDueSum);

  // Nav badges (desktop + mobile)
  const navL = document.getElementById('nav-leads-count');
  const navC = document.getElementById('nav-clients-count');
  if (navL) navL.textContent = totalLeads;
  if (navC) navC.textContent = totalClients;

  const mobNavL = document.getElementById('mobile-nav-leads-count');
  const mobNavC = document.getElementById('mobile-nav-clients-count');
  if (mobNavL) mobNavL.textContent = totalLeads;
  if (mobNavC) mobNavC.textContent = totalClients;

  // 1. Circular Win Rate Gauge (Circumference: 2 * PI * 54 = 339)
  const totalDealsOverall = totalLeads + totalClients;
  const winRate = totalDealsOverall > 0 ? Math.round((totalClients / totalDealsOverall) * 100) : 0;
  const gaugePercentEl = document.getElementById('gauge-percent');
  const gaugeFillEl = document.getElementById('gauge-circle-fill');
  if (gaugePercentEl) gaugePercentEl.textContent = `${winRate}%`;
  if (gaugeFillEl) {
    const offset = Math.max(0, 339 - (339 * (winRate / 100)));
    gaugeFillEl.style.strokeDashoffset = offset;
  }

  // 2. Priority Deal Spotlight Banner
  const spotlightLead = leads.find(l => l.status === 'HOT') || leads.find(l => l.status === 'HOTTEST') || leads[0];
  const spotAvatarLetter = document.getElementById('spotlight-avatar-letter');
  const spotTitle = document.getElementById('spotlight-title');
  const spotContactName = document.getElementById('spotlight-contact-name');
  const spotDesc = document.getElementById('spotlight-desc');
  const spotMeta = document.getElementById('spotlight-meta');

  if (spotlightLead && spotTitle) {
    const initialLetter = (spotlightLead.company || 'P').charAt(0).toUpperCase();
    if (spotAvatarLetter) spotAvatarLetter.textContent = initialLetter;
    spotTitle.textContent = spotlightLead.company;
    if (spotContactName) spotContactName.textContent = `— ${spotlightLead.contactName}`;
    spotDesc.textContent = spotlightLead.comment 
      ? `“${spotlightLead.comment}”` 
      : `High-value prospective deal for ${spotlightLead.requirement}. Ready for closing.`;
    spotMeta.innerHTML = `
      <span class="meta-tag-pill">📞 ${escapeHtml(spotlightLead.contactNumber)}</span>
      <span class="meta-tag-pill">🏷️ ${escapeHtml(spotlightLead.requirement)} (${escapeHtml(spotlightLead.dealType || 'One-Time')})</span>
    `;
  } else if (spotTitle) {
    if (spotAvatarLetter) spotAvatarLetter.textContent = '✨';
    spotTitle.textContent = "Pipeline All Clear!";
    if (spotContactName) spotContactName.textContent = "— Ready for new deals";
    spotDesc.textContent = "Great job! All active deals have been processed or converted to clients.";
    spotMeta.innerHTML = `<span class="meta-tag-pill">✨ Ready for new prospects</span>`;
  }

  // 3. Pipeline Stage Distribution (4 Colored Cards matching mock)
  const hottestCount = leads.filter(l => l.status === 'HOTTEST' || l.status === 'HOT').length;
  const warmCount = leads.filter(l => l.status === 'WARM' || l.status === 'COLD').length;
  const wonCount = totalClients;
  const dueClientsCount = clients.filter(c => {
    const fin = getClientFinancials(c);
    return fin.due > 0;
  }).length;

  const totalBase = (totalLeads + totalClients) || 1;
  const hotPct = Math.round((hottestCount / totalBase) * 100);
  const warmPct = Math.round((warmCount / totalBase) * 100);
  const wonPct = Math.round((wonCount / totalBase) * 100);
  const duePct = Math.round((dueClientsCount / totalBase) * 100);

  // Update Card 1: Hot/Hottest
  const elCountHot = document.getElementById('stage-count-hot');
  const elPctHot = document.getElementById('stage-pct-hot');
  const elTrackHot = document.getElementById('stage-track-hot');
  if (elCountHot) elCountHot.textContent = hottestCount;
  if (elPctHot) elPctHot.textContent = `${hotPct}%`;
  if (elTrackHot) elTrackHot.style.width = `${Math.min(100, hotPct)}%`;

  // Update Card 2: Warm/Cold
  const elCountWarm = document.getElementById('stage-count-warm');
  const elPctWarm = document.getElementById('stage-pct-warm');
  const elTrackWarm = document.getElementById('stage-track-warm');
  if (elCountWarm) elCountWarm.textContent = warmCount;
  if (elPctWarm) elPctWarm.textContent = `${warmPct}%`;
  if (elTrackWarm) elTrackWarm.style.width = `${Math.min(100, warmPct)}%`;

  // Update Card 3: Won Clients
  const elCountWon = document.getElementById('stage-count-won');
  const elPctWon = document.getElementById('stage-pct-won');
  const elTrackWon = document.getElementById('stage-track-won');
  if (elCountWon) elCountWon.textContent = wonCount;
  if (elPctWon) elPctWon.textContent = `${wonPct}%`;
  if (elTrackWon) elTrackWon.style.width = `${Math.min(100, wonPct)}%`;

  // Update Card 4: Due Balance
  const elCountDue = document.getElementById('stage-count-due');
  const elPctDue = document.getElementById('stage-pct-due');
  const elTrackDue = document.getElementById('stage-track-due');
  if (elCountDue) elCountDue.textContent = dueClientsCount;
  if (elPctDue) elPctDue.textContent = `${duePct}%`;
  if (elTrackDue) elTrackDue.style.width = `${Math.min(100, duePct)}%`;

  // Mini Leads Table in Dashboard
  const dashLeadsTable = document.getElementById('dash-leads-table');
  const priorityLeads = leads
    .filter(l => l.status === 'HOTTEST' || l.status === 'HOT')
    .slice(0, 5);

  if (dashLeadsTable) {
    if (priorityLeads.length === 0) {
      dashLeadsTable.innerHTML = `<tr><td colspan="4" class="text-muted" style="text-align:center; padding: 20px;">No hot leads right now.</td></tr>`;
    } else {
      dashLeadsTable.innerHTML = priorityLeads.map(l => {
        const initial = (l.company || 'P').charAt(0).toUpperCase();
        return `
          <tr>
            <td>
              <div class="company-avatar-cell">
                <div class="avatar-letter-box">${initial}</div>
                <strong>${escapeHtml(l.company)}</strong>
              </div>
            </td>
            <td>${escapeHtml(l.contactName)}<br><small class="text-muted">${escapeHtml(l.contactNumber)}</small></td>
            <td>${escapeHtml(l.requirement)}</td>
            <td><span class="badge-status ${l.status}">${l.status}</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  // Mini Clients Table in Dashboard
  const dashClientsTable = document.getElementById('dash-clients-table');
  const recentClients = clients.slice(0, 5);

  if (dashClientsTable) {
    if (recentClients.length === 0) {
      dashClientsTable.innerHTML = `<tr><td colspan="5" class="text-muted" style="text-align:center; padding: 20px;">No clients registered yet.</td></tr>`;
    } else {
      dashClientsTable.innerHTML = recentClients.map(c => {
        const fin = getClientFinancials(c);
        const statusLabel = fin.due > 0 ? 'Pending' : 'Completed';
        const statusClass = fin.due > 0 ? 'pending' : 'completed';
        return `
          <tr>
            <td><strong>${escapeHtml(c.company)}</strong></td>
            <td>${escapeHtml(c.contactName)}</td>
            <td>${formatMoney(fin.deal)}</td>
            <td><span class="${fin.due > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}">${formatMoney(fin.due)}</span></td>
            <td><span class="badge-pay ${statusClass}">${statusLabel}</span></td>
          </tr>
        `;
      }).join('');
    }
  }
}

// ==========================================
// 2. LEADS MANAGEMENT (CRUD & STATUS)
// ==========================================
function renderLeadsTable() {
  const tbody = document.getElementById('leads-table-body');
  const emptyState = document.getElementById('leads-empty-state');
  const searchVal = document.getElementById('leads-search').value.toLowerCase().trim();
  const filterStatus = document.getElementById('leads-filter-status').value;
  const filterReq = document.getElementById('leads-filter-req').value;
  const filterTypeEl = document.getElementById('leads-filter-type');
  const filterType = filterTypeEl ? filterTypeEl.value : 'ALL';

  const filtered = leads.filter(l => {
    const matchSearch = (
      l.company.toLowerCase().includes(searchVal) ||
      l.contactName.toLowerCase().includes(searchVal) ||
      l.contactNumber.toLowerCase().includes(searchVal)
    );
    const matchStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchReq = filterReq === 'ALL' || l.requirement === filterReq;
    const matchType = filterType === 'ALL' || (l.dealType || 'One-Time') === filterType;

    return matchSearch && matchStatus && matchReq && matchType;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  tbody.innerHTML = filtered.map((lead, idx) => `
    <tr>
      <td class="table-index">${idx + 1}</td>
      <td><strong>${escapeHtml(lead.company)}</strong></td>
      <td>${escapeHtml(lead.contactName)}</td>
      <td><a href="tel:${escapeHtml(lead.contactNumber)}" style="color: inherit; text-decoration: none;">${escapeHtml(lead.contactNumber)}</a></td>
      <td><span class="text-secondary">${escapeHtml(lead.requirement)}</span></td>
      <td>
        ${(lead.dealType === 'Regular')
          ? `<span class="badge-type regular" title="Regular: ${escapeHtml(lead.recurringCycle || 'Quarterly')}">🔁 Regular (${escapeHtml(lead.recurringCycle || 'Quarterly')})</span>`
          : `<span class="badge-type one-time">One-Time</span>`
        }
      </td>
      <td><span style="font-size:0.82rem; color:#64748b;" title="${escapeHtml(lead.comment || '')}">${escapeHtml(lead.comment ? (lead.comment.length > 35 ? lead.comment.substring(0, 35) + '...' : lead.comment) : '—')}</span></td>
      <td>
        <span class="badge-client ${lead.isClient ? 'yes' : 'no'}">
          ${lead.isClient ? 'Yes (Client)' : 'No'}
        </span>
      </td>
      <td>
        <!-- Quick Status Change Dropdown -->
        <select class="table-status-select badge-status ${lead.status}" onchange="handleLeadStatusChange('${lead.id}', this.value, '${lead.status}')">
          <option value="LOST" ${lead.status === 'LOST' ? 'selected' : ''}>🔴 LOST</option>
          <option value="HOTTEST" ${lead.status === 'HOTTEST' ? 'selected' : ''}>🟢 HOTTEST</option>
          <option value="HOT" ${lead.status === 'HOT' ? 'selected' : ''}>🟠 HOT</option>
          <option value="WARM" ${lead.status === 'WARM' ? 'selected' : ''}>🟡 WARM</option>
          <option value="COLD" ${lead.status === 'COLD' ? 'selected' : ''}>🔵 COLD</option>
          <option value="WON" ${lead.status === 'WON' ? 'selected' : ''}>🏆 WON</option>
        </select>
      </td>
      <td class="text-right">
        <div class="action-btn-group">
          <button class="btn-sm-action" onclick="openEditLeadModal('${lead.id}')" title="Edit Lead">
            ✏️ Edit
          </button>
          <button class="btn-sm-action btn-del" onclick="deleteLead('${lead.id}')" title="Delete Lead">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Open Add Lead Modal
function openAddLeadModal() {
  document.getElementById('modal-lead-title').textContent = 'Add New Lead';
  document.getElementById('lead-id').value = '';
  document.getElementById('lead-company').value = '';
  document.getElementById('lead-contact-name').value = '';
  document.getElementById('lead-contact-number').value = '';
  document.getElementById('lead-requirement').value = '';
  document.getElementById('lead-deal-type').value = 'One-Time';
  document.getElementById('lead-recurring-cycle').value = 'Quarterly';
  document.getElementById('lead-cycle-group').style.display = 'none';
  document.getElementById('lead-comment').value = '';
  document.getElementById('lead-status').value = 'WARM';
  document.getElementById('lead-client-flag-display').textContent = 'No (Lead)';
  document.getElementById('lead-client-flag-display').className = 'read-only-badge';

  document.getElementById('modal-lead').classList.add('open');
}

// Open Edit Lead Modal
function openEditLeadModal(id) {
  const lead = leads.find(l => l.id === id);
  if (!lead) return;

  document.getElementById('modal-lead-title').textContent = 'Edit Lead';
  document.getElementById('lead-id').value = lead.id;
  document.getElementById('lead-company').value = lead.company;
  document.getElementById('lead-contact-name').value = lead.contactName;
  document.getElementById('lead-contact-number').value = lead.contactNumber;
  document.getElementById('lead-requirement').value = lead.requirement;
  
  const dType = lead.dealType || 'One-Time';
  document.getElementById('lead-deal-type').value = dType;
  document.getElementById('lead-recurring-cycle').value = lead.recurringCycle || 'Quarterly';
  document.getElementById('lead-cycle-group').style.display = dType === 'Regular' ? 'block' : 'none';

  document.getElementById('lead-comment').value = lead.comment || '';
  document.getElementById('lead-status').value = lead.status;
  
  const flagDisplay = document.getElementById('lead-client-flag-display');
  flagDisplay.textContent = lead.isClient ? 'Yes (Converted Client)' : 'No (Lead)';
  flagDisplay.className = lead.isClient ? 'read-only-badge text-success' : 'read-only-badge';

  document.getElementById('modal-lead').classList.add('open');
}

// Close Lead Modal
function closeLeadModal() {
  document.getElementById('modal-lead').classList.remove('open');
}

// Save Lead (Add or Update)
function handleLeadFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('lead-id').value;
  const company = document.getElementById('lead-company').value.trim();
  const contactName = document.getElementById('lead-contact-name').value.trim();
  const contactNumber = document.getElementById('lead-contact-number').value.trim();
  const requirement = document.getElementById('lead-requirement').value;
  const dealType = document.getElementById('lead-deal-type').value;
  const recurringCycle = dealType === 'Regular' ? document.getElementById('lead-recurring-cycle').value : null;
  const comment = document.getElementById('lead-comment').value.trim();
  const status = document.getElementById('lead-status').value;

  if (id) {
    // Edit Mode
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex !== -1) {
      const prevStatus = leads[leadIndex].status;
      leads[leadIndex] = {
        ...leads[leadIndex],
        company,
        contactName,
        contactNumber,
        requirement,
        dealType,
        recurringCycle,
        comment,
        status: (status === 'WON' && prevStatus !== 'WON') ? prevStatus : status
      };

      saveData();
      syncLeadToSupabase(leads[leadIndex]);
      closeLeadModal();

      if (status === 'WON' && prevStatus !== 'WON') {
        // Trigger conversion flow
        triggerWonAlert(leads[leadIndex]);
        return;
      }

      showToast("Lead updated successfully!");
    }
  } else {
    // Create Mode
    const newLead = {
      id: "lead-" + Date.now(),
      company,
      contactName,
      contactNumber,
      requirement,
      dealType,
      recurringCycle,
      comment,
      isClient: false,
      status: status === 'WON' ? 'HOTTEST' : status, // If selected WON at creation, trigger alert
      createdAt: getCurrentFormattedDateTime()
    };

    leads.unshift(newLead);
    saveData();
    syncLeadToSupabase(newLead);
    closeLeadModal();

    if (status === 'WON') {
      triggerWonAlert(newLead);
      return;
    }

    showToast("New lead created successfully!");
  }

  renderLeadsTable();
  renderDashboard();
}

// Delete Lead
function deleteLead(id) {
  const lead = leads.find(l => l.id === id);
  if (!lead) return;

  if (confirm(`Are you sure you want to delete lead for "${lead.company}"?`)) {
    leads = leads.filter(l => l.id !== id);
    saveData();
    deleteLeadFromSupabase(id);
    showToast("Lead deleted successfully.", "danger");
    renderLeadsTable();
    renderDashboard();
  }
}

// Handle Quick Status Change in Lead Table
function handleLeadStatusChange(leadId, newStatus, oldStatus) {
  const lead = leads.find(l => l.id === leadId);
  if (!lead) return;

  if (newStatus === 'WON') {
    // Trigger WON alert workflow
    triggerWonAlert(lead);
    // Temporarily re-render to revert dropdown until confirmed
    renderLeadsTable();
    return;
  }

  // Normal Status update
  lead.status = newStatus;
  saveData();
  updateLeadStatusInSupabase(leadId, newStatus, false);
  showToast(`Status updated to ${newStatus}`);
  renderLeadsTable();
  renderDashboard();
}

// ==========================================
// 3. THE "WON" ALERT & CLIENT CONVERSION LOGIC
// ==========================================
function triggerWonAlert(lead) {
  pendingWonLead = lead;
  document.getElementById('won-lead-summary').innerHTML = `
    <strong>${escapeHtml(lead.contactName)}</strong> from <strong>${escapeHtml(lead.company)}</strong> 
    (${escapeHtml(lead.requirement)}) will be converted to your <strong>Clients</strong> list with current timestamp.
  `;
  
  const dType = lead.dealType || 'One-Time';
  document.getElementById('won-deal-type').value = dType;
  document.getElementById('won-recurring-cycle').value = lead.recurringCycle || 'Quarterly';
  document.getElementById('won-cycle-group').style.display = dType === 'Regular' ? 'block' : 'none';

  document.getElementById('won-deal-amount').value = '';
  document.getElementById('won-initial-payment').value = '0';

  document.getElementById('modal-won-confirm').classList.add('open');
}

function handleWonConfirmYes() {
  if (!pendingWonLead) return;

  const dealInput = document.getElementById('won-deal-amount');
  const dealAmount = parseFloat(dealInput.value);

  if (isNaN(dealAmount) || dealAmount <= 0) {
    alert("Please enter a valid Total Agreed Deal Amount (e.g. 50000).");
    dealInput.focus();
    return;
  }

  const dealType = document.getElementById('won-deal-type').value;
  const recurringCycle = dealType === 'Regular' ? document.getElementById('won-recurring-cycle').value : null;

  const initialPayInput = document.getElementById('won-initial-payment');
  const initialPayment = parseFloat(initialPayInput.value) || 0;

  const timestamp = getCurrentFormattedDateTime();
  const convertedLeadId = pendingWonLead.id;
  const convertedCompanyName = pendingWonLead.company;

  // 1. Create Client Record with Exact Timestamp & Type
  const newClient = {
    id: "client-" + Date.now(),
    leadId: convertedLeadId,
    company: pendingWonLead.company,
    contactName: pendingWonLead.contactName,
    contactNumber: pendingWonLead.contactNumber,
    requirement: pendingWonLead.requirement,
    dealType: dealType,
    recurringCycle: recurringCycle,
    becameClientAt: timestamp,
    dealAmount: dealAmount,
    payments: []
  };

  if (initialPayment > 0) {
    newClient.payments.push({
      id: "pay-" + Date.now(),
      amount: initialPayment,
      date: new Date().toISOString().split('T')[0],
      method: "Advance Payment",
      note: "Initial payment received upon closing deal (WON)"
    });
  }

  // 2. Add to Clients table
  clients.unshift(newClient);

  // 3. Remove from Leads table completely (won hole lead a r thakbe na)
  leads = leads.filter(l => l.id !== convertedLeadId);

  // Save changes
  saveData();
  deleteLeadFromSupabase(convertedLeadId);
  syncClientToSupabase(newClient);

  // Close Alert Modal
  document.getElementById('modal-won-confirm').classList.remove('open');
  pendingWonLead = null;

  showToast(`🎉 ${convertedCompanyName} successfully converted & moved to Clients! Time: ${timestamp}`);

  // Re-render all views
  renderLeadsTable();
  renderClientsTable();
  renderDashboard();

  // Switch to Clients tab to show the new client!
  switchTab('clients');
}

function handleWonConfirmNo() {
  document.getElementById('modal-won-confirm').classList.remove('open');
  pendingWonLead = null;
  showToast("Conversion cancelled. Status kept unchanged.");
  renderLeadsTable();
}

// ==========================================
// 4. CLIENTS MANAGEMENT & PAYMENT TRACKING
// ==========================================
function renderClientsTable() {
  const tbody = document.getElementById('clients-table-body');
  const emptyState = document.getElementById('clients-empty-state');
  const searchVal = document.getElementById('clients-search').value.toLowerCase().trim();
  const filterStatus = document.getElementById('clients-filter-status').value;
  const filterTypeEl = document.getElementById('clients-filter-type');
  const filterType = filterTypeEl ? filterTypeEl.value : 'ALL';

  const filtered = clients.filter(c => {
    const fin = getClientFinancials(c);
    const matchSearch = (
      c.company.toLowerCase().includes(searchVal) ||
      c.contactName.toLowerCase().includes(searchVal) ||
      c.contactNumber.toLowerCase().includes(searchVal)
    );
    const matchStatus = filterStatus === 'ALL' || fin.status === filterStatus;
    const matchType = filterType === 'ALL' || (c.dealType || 'One-Time') === filterType;
    return matchSearch && matchStatus && matchType;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  tbody.innerHTML = filtered.map((client, idx) => {
    const fin = getClientFinancials(client);
    return `
      <tr>
        <td class="table-index">${idx + 1}</td>
        <td><strong>${escapeHtml(client.company)}</strong></td>
        <td>${escapeHtml(client.contactName)}</td>
        <td><a href="tel:${escapeHtml(client.contactNumber)}" style="color: inherit; text-decoration: none;">${escapeHtml(client.contactNumber)}</a></td>
        <td><span class="text-secondary">${escapeHtml(client.requirement)}</span></td>
        <td>
          ${(client.dealType === 'Regular')
            ? `<span class="badge-type regular" title="Regular: ${escapeHtml(client.recurringCycle || 'Quarterly')}">🔁 Regular (${escapeHtml(client.recurringCycle || 'Quarterly')})</span>`
            : `<span class="badge-type one-time">One-Time</span>`
          }
        </td>
        <td>
          <span style="display:inline-flex; align-items:center; gap:5px; font-size:0.82rem; font-weight:600; color:#1e293b; background:#f1f5f9; padding:4px 9px; border-radius:6px; border:1px solid #cbd5e1; white-space:nowrap;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${escapeHtml(client.becameClientAt || '—')}
          </span>
        </td>
        <td><strong>${formatMoney(fin.deal)}</strong></td>
        <td><span class="text-success">${formatMoney(fin.paid)}</span></td>
        <td>
          <span class="${fin.due > 0 ? 'text-danger' : 'text-success'}">
            ${formatMoney(fin.due)}
          </span>
        </td>
        <td>
          <span class="badge-pay ${fin.status.toLowerCase()}">
            ${fin.status === 'PAID' ? 'Fully Paid' : (fin.status === 'PARTIAL' ? 'Partial Due' : 'Unpaid')}
          </span>
        </td>
        <td class="text-right">
          <div class="action-btn-group">
            <button class="btn-sm-action btn-pay" onclick="openAddPaymentModal('${client.id}')" title="Add Payment">
              💰 +Pay
            </button>
            <button class="btn-sm-action" onclick="openPaymentHistoryModal('${client.id}')" title="View History">
              📜 History (${client.payments ? client.payments.length : 0})
            </button>
            <button class="btn-sm-action" onclick="openEditClientModal('${client.id}')" title="Edit Client">
              ✏️
            </button>
            <button class="btn-sm-action btn-del" onclick="deleteClient('${client.id}')" title="Delete Client">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Open Direct Client Modal
function openAddClientModal() {
  document.getElementById('modal-client-title').textContent = 'Add Direct Client';
  document.getElementById('client-id').value = '';
  document.getElementById('client-company').value = '';
  document.getElementById('client-contact-name').value = '';
  document.getElementById('client-contact-number').value = '';
  document.getElementById('client-requirement').value = '';
  document.getElementById('client-deal-type').value = 'One-Time';
  document.getElementById('client-recurring-cycle').value = 'Quarterly';
  document.getElementById('client-cycle-group').style.display = 'none';
  document.getElementById('client-deal-amount').value = '';

  document.getElementById('modal-client').classList.add('open');
}

// Open Edit Client Modal
function openEditClientModal(id) {
  const client = clients.find(c => c.id === id);
  if (!client) return;

  document.getElementById('modal-client-title').textContent = 'Edit Client';
  document.getElementById('client-id').value = client.id;
  document.getElementById('client-company').value = client.company;
  document.getElementById('client-contact-name').value = client.contactName;
  document.getElementById('client-contact-number').value = client.contactNumber;
  document.getElementById('client-requirement').value = client.requirement;

  const dType = client.dealType || 'One-Time';
  document.getElementById('client-deal-type').value = dType;
  document.getElementById('client-recurring-cycle').value = client.recurringCycle || 'Quarterly';
  document.getElementById('client-cycle-group').style.display = dType === 'Regular' ? 'block' : 'none';

  document.getElementById('client-deal-amount').value = client.dealAmount;

  document.getElementById('modal-client').classList.add('open');
}

// Close Client Modal
function closeClientModal() {
  document.getElementById('modal-client').classList.remove('open');
}

// Save Direct Client
function handleClientFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('client-id').value;
  const company = document.getElementById('client-company').value.trim();
  const contactName = document.getElementById('client-contact-name').value.trim();
  const contactNumber = document.getElementById('client-contact-number').value.trim();
  const requirement = document.getElementById('client-requirement').value;
  const dealType = document.getElementById('client-deal-type').value;
  const recurringCycle = dealType === 'Regular' ? document.getElementById('client-recurring-cycle').value : null;
  const dealAmount = parseFloat(document.getElementById('client-deal-amount').value) || 0;

  if (id) {
    const idx = clients.findIndex(c => c.id === id);
    if (idx !== -1) {
      clients[idx] = {
        ...clients[idx],
        company,
        contactName,
        contactNumber,
        requirement,
        dealType,
        recurringCycle,
        dealAmount
      };
      showToast("Client updated successfully!");
    }
  } else {
    const newClient = {
      id: "client-" + Date.now(),
      company,
      contactName,
      contactNumber,
      requirement,
      dealType,
      recurringCycle,
      dealAmount,
      becameClientAt: getCurrentFormattedDateTime(),
      payments: []
    };
    clients.unshift(newClient);
    showToast("Direct client added successfully!");
  }

  saveData();
  const targetClient = id ? clients.find(c => c.id === id) : clients[0];
  if (targetClient) syncClientToSupabase(targetClient);

  closeClientModal();
  renderClientsTable();
  renderDashboard();
}

// Delete Client
function deleteClient(id) {
  const client = clients.find(c => c.id === id);
  if (!client) return;

  if (confirm(`Are you sure you want to delete client record for "${client.company}"? All payment records will be permanently removed.`)) {
    clients = clients.filter(c => c.id !== id);
    saveData();
    deleteClientFromSupabase(id);
    showToast("Client record deleted.", "danger");
    renderClientsTable();
    renderDashboard();
  }
}

// ==========================================
// 5. PAYMENT INSTALLMENTS & AUTO MATH
// ==========================================
function openAddPaymentModal(clientId) {
  const client = clients.find(c => c.id === clientId);
  if (!client) return;

  const fin = getClientFinancials(client);

  document.getElementById('payment-client-id').value = client.id;
  document.getElementById('pay-banner-client-name').textContent = `${client.company} (${client.contactName})`;
  document.getElementById('pay-banner-deal').textContent = formatMoney(fin.deal);
  document.getElementById('pay-banner-paid').textContent = formatMoney(fin.paid);
  document.getElementById('pay-banner-due').textContent = formatMoney(fin.due);

  document.getElementById('payment-amount').value = '';
  document.getElementById('payment-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('payment-note').value = '';

  document.getElementById('modal-payment').classList.add('open');
}

function closePaymentModal() {
  document.getElementById('modal-payment').classList.remove('open');
}

function handlePaymentFormSubmit(e) {
  e.preventDefault();
  const clientId = document.getElementById('payment-client-id').value;
  const amount = parseFloat(document.getElementById('payment-amount').value);
  const date = document.getElementById('payment-date').value;
  const method = document.getElementById('payment-method').value;
  const note = document.getElementById('payment-note').value.trim();

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid payment amount.");
    return;
  }

  const client = clients.find(c => c.id === clientId);
  if (!client) return;

  if (!client.payments) client.payments = [];

  const newPayment = {
    id: "pay-" + Date.now(),
    amount: amount,
    date: date,
    method: method,
    note: note || `Installment #${client.payments.length + 1}`
  };

  client.payments.push(newPayment);
  saveData();
  syncPaymentToSupabase(newPayment, clientId);
  closePaymentModal();

  const fin = getClientFinancials(client);
  showToast(`Recorded ₹${amount.toLocaleString('en-IN')} payment! Remaining Due: ${formatMoney(fin.due)}`);

  renderClientsTable();
  renderDashboard();
}

// ==========================================
// 6. PAYMENT HISTORY BREAKDOWN
// ==========================================
function openPaymentHistoryModal(clientId) {
  const client = clients.find(c => c.id === clientId);
  if (!client) return;

  const fin = getClientFinancials(client);

  document.getElementById('history-modal-client-name').textContent = client.company;
  document.getElementById('history-modal-client-info').textContent = `Contact: ${client.contactName} (${client.contactNumber}) | Requirement: ${client.requirement}`;
  document.getElementById('h-total-deal').textContent = formatMoney(fin.deal);
  document.getElementById('h-total-paid').textContent = formatMoney(fin.paid);
  document.getElementById('h-total-due').textContent = formatMoney(fin.due);

  const tbody = document.getElementById('history-table-body');
  const payments = client.payments || [];

  if (payments.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-muted" style="text-align:center; padding: 24px;">No payments recorded yet.</td></tr>`;
  } else {
    tbody.innerHTML = payments.map((p, idx) => `
      <tr>
        <td>${escapeHtml(p.date)}</td>
        <td><strong class="text-success">${formatMoney(p.amount)}</strong></td>
        <td><span class="badge-client no">${escapeHtml(p.method || 'Cash')}</span></td>
        <td>${escapeHtml(p.note || '—')}</td>
        <td class="text-right">
          <button class="btn-sm-action btn-del" onclick="deletePayment('${client.id}', '${p.id}')" title="Delete payment entry">
            🗑️ Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  document.getElementById('modal-history').classList.add('open');
}

function closeHistoryModal() {
  document.getElementById('modal-history').classList.remove('open');
}

function deletePayment(clientId, paymentId) {
  const client = clients.find(c => c.id === clientId);
  if (!client) return;

  if (confirm("Are you sure you want to delete this payment record? Remaining due will automatically increase.")) {
    client.payments = client.payments.filter(p => p.id !== paymentId);
    saveData();
    deletePaymentFromSupabase(paymentId);
    showToast("Payment record deleted.", "danger");

    // Re-render history modal and tables
    openPaymentHistoryModal(clientId);
    renderClientsTable();
    renderDashboard();
  }
}

// ==========================================
// 7. UTILITIES & DATA BACKUP / RESET
// ==========================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function startLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;
  function update() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit'
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    clockEl.textContent = `${dateStr} ${timeStr}`;
  }
  update();
  setInterval(update, 1000);
}

function exportDataBackup() {
  const brand = getActiveBrand();
  const backup = {
    workspace: brand,
    exportDate: new Date().toISOString(),
    leads,
    clients
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${brand.toLowerCase()}-crm-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`${brand} backup file downloaded successfully!`);
}

function resetDemoData() {
  const brand = getActiveBrand();
  if (confirm(`Reset to default sample Leads & Clients for ${brand}? Your custom changes will be replaced.`)) {
    if (brand === 'Boutique') {
      leads = JSON.parse(JSON.stringify(DEFAULT_BOUTIQUE_LEADS));
      clients = JSON.parse(JSON.stringify(DEFAULT_BOUTIQUE_CLIENTS));
    } else {
      leads = JSON.parse(JSON.stringify(DEFAULT_LEADS));
      clients = JSON.parse(JSON.stringify(DEFAULT_CLIENTS));
    }
    saveData();
    showToast(`${brand} sample data reset successfully.`);
    renderDashboard();
    renderLeadsTable();
    renderClientsTable();
  }
}

// ==========================================
// 8. EVENT LISTENERS SETUP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  loadUsers();
  checkAuthState();
  populateRequirementFilters();
  startLiveClock();

  // Topbar Workspace Switch Button Listener
  const btnSwitchWs = document.getElementById('btn-switch-workspace');
  if (btnSwitchWs) btnSwitchWs.addEventListener('click', handleSwitchAccountRequest);

  // Authentication Switcher & Form Handlers
  const brandOptPixel = document.getElementById('brand-opt-pixel');
  if (brandOptPixel) brandOptPixel.addEventListener('click', () => selectAuthBrand('Pixel'));

  const brandOptBoutique = document.getElementById('brand-opt-boutique');
  if (brandOptBoutique) brandOptBoutique.addEventListener('click', () => selectAuthBrand('Boutique'));

  const tabSignin = document.getElementById('tab-btn-signin');
  if (tabSignin) tabSignin.addEventListener('click', () => switchAuthTab('signin'));

  const tabSignup = document.getElementById('tab-btn-signup');
  if (tabSignup) tabSignup.addEventListener('click', () => switchAuthTab('signup'));

  const formSignin = document.getElementById('form-signin');
  if (formSignin) formSignin.addEventListener('submit', handleSignInSubmit);

  const formSignup = document.getElementById('form-signup');
  if (formSignup) formSignup.addEventListener('submit', handleSignUpSubmit);

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) btnLogout.addEventListener('click', handleSignOut);

  // Mobile Drawer & Bottom Navigation Listeners
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebarMobile);

  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebarMobile);

  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebarMobile);

  const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
  if (mobileMenuTrigger) mobileMenuTrigger.addEventListener('click', openSidebarMobile);

  const mobileQuickAddBtn = document.getElementById('mobile-quick-add-btn');
  if (mobileQuickAddBtn) mobileQuickAddBtn.addEventListener('click', openAddLeadModal);

  document.querySelectorAll('.mobile-bottom-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Navigation tab clicks
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Topbar and Sidebar Search Listeners
  const topbarSearch = document.getElementById('topbar-search');
  if (topbarSearch) {
    topbarSearch.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      const leadsSearch = document.getElementById('leads-search');
      const clientsSearch = document.getElementById('clients-search');
      if (leadsSearch) leadsSearch.value = q;
      if (clientsSearch) clientsSearch.value = q;
      renderLeadsTable();
      renderClientsTable();
      if (q.length > 0 && document.getElementById('view-dashboard').classList.contains('active')) {
        switchTab('leads');
      }
    });
  }

  const globalSearchJump = document.getElementById('global-search-jump');
  if (globalSearchJump) {
    globalSearchJump.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      const leadsSearch = document.getElementById('leads-search');
      if (leadsSearch) leadsSearch.value = q;
      renderLeadsTable();
      if (q.length > 0 && document.getElementById('view-dashboard').classList.contains('active')) {
        switchTab('leads');
      }
    });
  }

  // Modal Buttons: Leads
  document.getElementById('btn-open-lead-modal').addEventListener('click', openAddLeadModal);
  document.getElementById('btn-close-lead-modal').addEventListener('click', closeLeadModal);
  document.getElementById('btn-cancel-lead').addEventListener('click', closeLeadModal);
  document.getElementById('form-lead').addEventListener('submit', handleLeadFormSubmit);

  // Search & Filter Listeners: Leads
  document.getElementById('leads-search').addEventListener('input', renderLeadsTable);
  document.getElementById('leads-filter-status').addEventListener('change', renderLeadsTable);
  document.getElementById('leads-filter-req').addEventListener('change', renderLeadsTable);
  const leadsFilterType = document.getElementById('leads-filter-type');
  if (leadsFilterType) leadsFilterType.addEventListener('change', renderLeadsTable);

  // Type Selector Toggle in Lead Modal
  const leadDealType = document.getElementById('lead-deal-type');
  if (leadDealType) {
    leadDealType.addEventListener('change', (e) => {
      document.getElementById('lead-cycle-group').style.display = e.target.value === 'Regular' ? 'block' : 'none';
    });
  }

  // Modal Buttons: WON Alert
  document.getElementById('btn-won-yes').addEventListener('click', handleWonConfirmYes);
  document.getElementById('btn-won-no').addEventListener('click', handleWonConfirmNo);

  // Type Selector Toggle in WON Alert Modal
  const wonDealType = document.getElementById('won-deal-type');
  if (wonDealType) {
    wonDealType.addEventListener('change', (e) => {
      document.getElementById('won-cycle-group').style.display = e.target.value === 'Regular' ? 'block' : 'none';
    });
  }

  // Modal Buttons: Direct Client
  document.getElementById('btn-open-client-modal').addEventListener('click', openAddClientModal);
  document.getElementById('btn-close-client-modal').addEventListener('click', closeClientModal);
  document.getElementById('btn-cancel-client').addEventListener('click', closeClientModal);
  document.getElementById('form-client').addEventListener('submit', handleClientFormSubmit);

  // Type Selector Toggle in Client Modal
  const clientDealType = document.getElementById('client-deal-type');
  if (clientDealType) {
    clientDealType.addEventListener('change', (e) => {
      document.getElementById('client-cycle-group').style.display = e.target.value === 'Regular' ? 'block' : 'none';
    });
  }

  // Search & Filter Listeners: Clients
  document.getElementById('clients-search').addEventListener('input', renderClientsTable);
  document.getElementById('clients-filter-status').addEventListener('change', renderClientsTable);
  const clientsFilterType = document.getElementById('clients-filter-type');
  if (clientsFilterType) clientsFilterType.addEventListener('change', renderClientsTable);

  // Modal Buttons: Payment Installment
  document.getElementById('btn-close-payment-modal').addEventListener('click', closePaymentModal);
  document.getElementById('btn-cancel-payment').addEventListener('click', closePaymentModal);
  document.getElementById('form-payment').addEventListener('submit', handlePaymentFormSubmit);

  // Modal Buttons: Payment History
  document.getElementById('btn-close-history-modal').addEventListener('click', closeHistoryModal);
  document.getElementById('btn-close-history').addEventListener('click', closeHistoryModal);

  // Modal Backdrop Click: Secret Code Modal
  const modalSecret = document.getElementById('modal-secret-code');
  if (modalSecret) {
    modalSecret.addEventListener('click', (e) => {
      if (e.target === modalSecret) closeChangeSecretModal();
    });
  }

  // Backup & Reset Buttons (safe check)
  const btnExport = document.getElementById('btn-export-data');
  if (btnExport) btnExport.addEventListener('click', exportDataBackup);
  const btnReset = document.getElementById('btn-reset-demo');
  if (btnReset) btnReset.addEventListener('click', resetDemoData);

  // Initial render: load & render data ONLY if authenticated
  if (currentUser) {
    loadData();
    renderDashboard();
    renderLeadsTable();
    renderClientsTable();
  } else {
    updateAuthUI();
  }

  // PWA Install Prompt & Service Worker Registration
  initPwaInstaller();
});

// PWA Service Worker & Install Flow
let deferredPrompt = null;

function initPwaInstaller() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('✅ PWA Service Worker Registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('⚠️ Service Worker Registration failed:', err);
        });
    });
  }

  const btnInstall = document.getElementById('btn-install-pwa');
  const btnSidebarInstall = document.getElementById('btn-sidebar-install');

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar on mobile Chrome
    e.preventDefault();
    deferredPrompt = e;

    // Show Install Buttons
    if (btnInstall) btnInstall.style.display = 'inline-flex';
    if (btnSidebarInstall) btnSidebarInstall.style.display = 'flex';
    console.log('💡 PWA install prompt captured and ready');
  });

  const triggerInstall = async () => {
    if (!deferredPrompt) {
      showToast("App install prompt is already triggered or not supported in this browser. Look for the install icon in your address bar!", "info");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    if (outcome === 'accepted') {
      showToast("Installing Pixel & Boutique CRM app! 🎉", "success");
    }
    deferredPrompt = null;
    if (btnInstall) btnInstall.style.display = 'none';
    if (btnSidebarInstall) btnSidebarInstall.style.display = 'none';
  };

  if (btnInstall) btnInstall.addEventListener('click', triggerInstall);
  if (btnSidebarInstall) btnSidebarInstall.addEventListener('click', triggerInstall);

  window.addEventListener('appinstalled', () => {
    console.log('🎉 Pixel & Boutique CRM App successfully installed!');
    showToast("Pixel CRM is installed as an app on your device! 🚀", "success");
    if (btnInstall) btnInstall.style.display = 'none';
    if (btnSidebarInstall) btnSidebarInstall.style.display = 'none';
    deferredPrompt = null;
  });
}
