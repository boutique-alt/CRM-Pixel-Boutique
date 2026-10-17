-- ==============================================================
-- PIXEL CRM & BOUTIQUE CRM - SUPABASE POSTGRESQL SCHEMA
-- Project: ltemeusfcaapyhmifezg
-- Dashboard: https://supabase.com/dashboard/project/ltemeusfcaapyhmifezg
-- ==============================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    phone TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    brand TEXT NOT NULL DEFAULT 'Pixel',
    role TEXT NOT NULL DEFAULT 'Admin Workspace',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    workspace TEXT NOT NULL DEFAULT 'Pixel',
    company TEXT NOT NULL,
    contact_name TEXT,
    contact_number TEXT,
    requirement TEXT,
    deal_type TEXT DEFAULT 'One-Time',
    recurring_cycle TEXT,
    comment TEXT,
    is_client BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'WARM',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS public.clients (
    id TEXT PRIMARY KEY,
    workspace TEXT NOT NULL DEFAULT 'Pixel',
    company TEXT NOT NULL,
    contact_name TEXT,
    contact_number TEXT,
    requirement TEXT,
    deal_type TEXT DEFAULT 'One-Time',
    recurring_cycle TEXT,
    became_client_at TEXT,
    deal_amount NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL DEFAULT 0,
    payment_date DATE DEFAULT CURRENT_DATE,
    method TEXT,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INDEXES FOR HIGH-SPEED QUERYING
CREATE INDEX IF NOT EXISTS idx_leads_workspace ON public.leads(workspace);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_clients_workspace ON public.clients(workspace);
CREATE INDEX IF NOT EXISTS idx_payments_client ON public.payments(client_id);
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public users access" ON public.users;
CREATE POLICY "Public users access" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public leads access" ON public.leads;
CREATE POLICY "Public leads access" ON public.leads FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public clients access" ON public.clients;
CREATE POLICY "Public clients access" ON public.clients FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public payments access" ON public.payments;
CREATE POLICY "Public payments access" ON public.payments FOR ALL USING (true) WITH CHECK (true);

-- 7. SEED INITIAL USERS
INSERT INTO public.users (id, phone, password, name, brand, role) VALUES
('usr-admin-pixel', '9830012345', 'admin', 'Pixel Admin', 'Pixel', 'Pixel Workspace'),
('usr-admin-boutique', '9830054321', 'admin', 'Boutique Admin', 'Boutique', 'Boutique Workspace')
ON CONFLICT (phone) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role;

-- 8. SEED PIXEL CLIENTS & PAYMENTS
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('client-1', 'Pixel', 'Apex Footwear Store', 'Sultan Mahmud', '01733-445566', 'Basic Website', 'One-Time', NULL, '2026-10-10 03:30:15 PM', 50000) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.payments (id, client_id, amount, payment_date, method, note) VALUES ('p1', 'client-1', 10000, '2026-10-10', 'Bank Transfer', '1st installment (Advance)') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.payments (id, client_id, amount, payment_date, method, note) VALUES ('p2', 'client-1', 5000, '2026-10-13', 'bKash / Nagad', '2nd payment') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('client-2', 'Pixel', 'Nexus Healthcare Diagnostic', 'Dr. Arif Chowdhury', '01711-998800', 'SaaS & CRM Systems', 'Regular', 'Half-Yearly', '2026-10-08 12:15:40 PM', 35000) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.payments (id, client_id, amount, payment_date, method, note) VALUES ('p3', 'client-2', 35000, '2026-10-08', 'Bank Transfer', 'Full upfront payment') ON CONFLICT (id) DO NOTHING;

-- 9. SEED BOUTIQUE CLIENTS & PAYMENTS
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('btq-client-1', 'Boutique', 'Royal Heritage Attire', 'Anindita Roy', '9830554433', 'E-Commerce', 'One-Time', NULL, '2026-10-11 02:40:10 PM', 65000) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.payments (id, client_id, amount, payment_date, method, note) VALUES ('bp1', 'btq-client-1', 35000, '2026-10-11', 'Bank Transfer', 'Advance booking for store launch') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.payments (id, client_id, amount, payment_date, method, note) VALUES ('bp2', 'btq-client-1', 15000, '2026-10-14', 'UPI', '2nd milestone payment') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('btq-client-2', 'Boutique', 'Shree Fashion Boutique', 'Sunita Khandelwal', '9831447722', 'Social Media (Organic)', 'Regular', 'Quarterly', '2026-10-09 11:20:05 AM', 45000) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.payments (id, client_id, amount, payment_date, method, note) VALUES ('bp3', 'btq-client-2', 45000, '2026-10-09', 'UPI', 'Full payment for Festive Quarter') ON CONFLICT (id) DO NOTHING;

-- 10. SEED BOUTIQUE LEADS
INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('btq-lead-1', 'Boutique', 'Aanya Bridal Couture', 'Aanya Sen', '9830112233', 'E-Commerce', 'One-Time', NULL, 'Autumn Bridal Lehenga collection setup & boutique showcase | urgent follow-up', FALSE, 'HOTTEST'),
('btq-lead-2', 'Boutique', 'The Silk Thread Studio', 'Meera Das', '8017223344', 'Instagram Page Creation', 'Regular', 'Monthly', 'Handloom silk sarees & custom blouse styling reels promotion', FALSE, 'WARM'),
('btq-lead-3', 'Boutique', 'Velvet & Gold Boutique', 'Ritu Verma', '9831998877', 'Social Media (Organic)', 'Regular', 'Quarterly', 'Diwali & Wedding ethnic wear collection catalogue shoot', FALSE, 'HOTTEST'),
('btq-lead-4', 'Boutique', 'Urban Stitch Tailoring', 'Kabir Bose', '7003445566', 'WhatsApp Marketing', 'One-Time', NULL, 'Bespoke Men''s Kurta & Sherwani tailoring clients follow-up', FALSE, 'WARM'),
('btq-lead-5', 'Boutique', 'Chic Pret Studio', 'Tanya Roy', '9163223399', 'Meta / Google Advertisement', 'One-Time', NULL, 'Indo-Western gowns launch ad campaign for upcoming festive season', FALSE, 'HOTTEST'),
('btq-lead-6', 'Boutique', 'Zari Handloom Heritage', 'Debashish Mondal', '9874112255', 'Basic Website', 'One-Time', NULL, 'Bishnupuri & Baluchari pure silk saree catalogue website', FALSE, 'WARM'),
('btq-lead-7', 'Boutique', 'Blush & Blossom Kids', 'Pooja Ghosh', '8240556677', 'Logo Design', 'One-Time', NULL, 'Kids designer partywear brand identity & packaging tags', FALSE, 'COLD'),
('btq-lead-8', 'Boutique', 'Monochrome Minimalist Studio', 'Sneha Paul', '9836778811', 'Search Engine Optimization (SEO)', 'Regular', 'Monthly', 'Eco-friendly cotton apparel store local discovery optimization', FALSE, 'WARM')
ON CONFLICT (id) DO NOTHING;

-- 11. SEED PIXEL LEADS (199 IMPORTED LEADS)
INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-1', 'Pixel', 'Bhoomi', 'Sunil Jaiswal', 'N/A', 'Other', 'One-Time', NULL, 'DONE | For September | 25th Jul', FALSE, 'HOTTEST'),
('lead-imp-2', 'Pixel', 'Optimum', 'Rajesh Agarwal', '8013747563', 'Other', 'One-Time', NULL, 'This week', FALSE, 'WARM'),
('lead-imp-3', 'Pixel', 'Sandep Pal', 'Sandep Pal', '9835914485', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-4', 'Pixel', 'Personality Edge', 'Personality Edge', 'N/A', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-5', 'Pixel', 'Vidhi Bansal', 'Vidhi Bansal', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-6', 'Pixel', 'Alan Baptist', 'Alan Baptist', 'N/A', 'Basic Website', 'One-Time', NULL, 'DONE | DONE | He has plan for any websites. Will he start with one specially the NGO one from now ?', FALSE, 'HOTTEST'),
('lead-imp-7', 'Pixel', 'Baljeet', 'Baljeet', '7006472167', 'WhatsApp Marketing', 'One-Time', NULL, 'details send on whatsapp, need to fix an online meet 30-07/not picking on 01-08/ | 3rd Aug; 4pm', FALSE, 'COLD'),
('lead-imp-8', 'Pixel', 'Hasanuzjaman', 'Hasanuzjaman', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-9', 'Pixel', 'App', 'Kumar Fitness', 'N/A', 'Mobile App Development', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-10', 'Pixel', 'Web main', 'Kumar Fitness', 'N/A', 'Website Maintenance', 'Regular', 'Quarterly', 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-11', 'Pixel', 'Social Media', 'Kumar Fitness', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-12', 'Pixel', 'MA Pest Control', 'Saikat Roy', '9830088919', 'Other', 'One-Time', NULL, 'DONE | Plan shared. Costing is pending | 25th Jul', FALSE, 'HOTTEST'),
('lead-imp-13', 'Pixel', 'Shivam Enterprises', 'Abhishek Podder', '9874743731', 'Other', 'One-Time', NULL, 'Digital marleting, talk once, call after 3 pm / meeting fixed for 30-7, 29-07-26', FALSE, 'HOTTEST'),
('lead-imp-14', 'Pixel', 'Dropshot', 'Dropshot', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-15', 'Pixel', 'Meghna', 'Marraige Photographer', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-16', 'Pixel', 'Billing System', 'Durga Gold', 'N/A', 'SaaS & CRM Systems', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-17', 'Pixel', 'Shree Balaji Furnishing', 'Shree Balaji Furnishing', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-18', 'Pixel', 'Comfort Luxury', 'Comfort Luxury', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-19', 'Pixel', 'Amit Sharma', 'Amit Sharma', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-20', 'Pixel', 'Ripley', 'Ripley', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-21', 'Pixel', 'Siddhartha Ganguli', 'Siddhartha Ganguli', '9836966003', 'Other', 'One-Time', NULL, 'Meeting to be set / meeting fixed for friday 31st july but need to call him on the day. call after 4pm | 27th Jul', FALSE, 'HOTTEST'),
('lead-imp-22', 'Pixel', 'DBull', 'Sayak Dutta', '6291781081', 'WhatsApp Marketing', 'One-Time', NULL, 'Meta Ad, WhatsApp Marketing, Landing Page, CRM', FALSE, 'WARM'),
('lead-imp-23', 'Pixel', 'Saikat ALORA Interiors', 'Saikat ALORA Interiors', '877 782 8003 / 98362 21887', 'Other', 'One-Time', NULL, 'Talk once', FALSE, 'HOT'),
('lead-imp-24', 'Pixel', 'Magowa car rentral', 'Magowa car rentral', '97620 01053', 'WhatsApp Marketing', 'One-Time', NULL, 'Need social media promotion, whatsapp send, 30-07/', FALSE, 'WARM'),
('lead-imp-25', 'Pixel', 'Ecommerce', 'Mobyara', 'N/A', 'E-Commerce', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-26', 'Pixel', 'Digital Marketing', 'Mobyara', 'N/A', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-27', 'Pixel', 'Alina Ghosh', 'Alina Ghosh', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-28', 'Pixel', 'Interior', 'Sharmistha Dutta', '9831852572', 'Other', 'One-Time', NULL, 'she is busy she needs more time to be ready.29-07/', FALSE, 'HOT'),
('lead-imp-29', 'Pixel', 'Vinit Agarwal', 'Vinit Agarwal', '98300 18655', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-30', 'Pixel', 'Raibakat Chakraborty', 'Raibakat Chakraborty', '8282997775', 'Other', 'One-Time', NULL, 'He told me he put the planning on hold 29-07/ Hung up', FALSE, 'COLD'),
('lead-imp-31', 'Pixel', 'Shailesh LaptoFix', 'Shailesh LaptoFix', '98745 66671', 'WhatsApp Marketing', 'One-Time', NULL, 'He wants WhatsApp Marketing', FALSE, 'HOT'),
('lead-imp-32', 'Pixel', 'Kajal Banerjee', 'Kajal Banerjee', '98300 82443', 'Other', 'One-Time', NULL, 'She had some videos to be edited', FALSE, 'WARM'),
('lead-imp-33', 'Pixel', 'Neeraj Ahuja', 'Neeraj Ahuja', '9811053588', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-34', 'Pixel', 'Hrishikesh Bharti', 'Hrishikesh Bharti', '7669458369', 'E-Commerce', 'One-Time', NULL, 'Ecommerce (shoe)/ switch off', FALSE, 'COLD'),
('lead-imp-35', 'Pixel', 'Bipasha Banerjee', 'Bipasha Banerjee', '7604068430', 'Other', 'One-Time', NULL, 'Hung up, on 29-07/Hung up 03-08', FALSE, 'COLD'),
('lead-imp-36', 'Pixel', 'Fresh 5 Lead', 'Fresh 5 Lead', '9689755653', 'Other', 'One-Time', NULL, 'Pest control. Starter pack, ringing on 29-07/ not required now 03-08', FALSE, 'LOST'),
('lead-imp-37', 'Pixel', 'Rakhi Maloo', 'Rakhi Maloo', '9075758741', 'Social Media (Organic)', 'One-Time', NULL, 'Instagram, Cut the call on 29-07/ Hung up 03-08/ ringing | 25th Jul', FALSE, 'COLD'),
('lead-imp-38', 'Pixel', 'Niranjan Mudhiraj', 'Niranjan Mudhiraj', '8096017049', 'Other', 'One-Time', NULL, 'Shared details/ busy on 29-07/ | 25th Jul', FALSE, 'COLD'),
('lead-imp-39', 'Pixel', 'Raajrupa Sarkar Ganguly', 'Raajrupa Sarkar Ganguly', '72783 58593', 'Other', 'One-Time', NULL, 'Talk once / ringing 03-08/ Voicemail on 05-08 | 24th Jul', FALSE, 'HOT'),
('lead-imp-40', 'Pixel', 'Siddharth Goel', 'Goel Communication', '9874469829', 'Other', 'One-Time', NULL, 'Wanted to fix a meeting on monday, hung up on 29-07/meeting fixed on 03-08 | 3rd Aug', FALSE, 'HOTTEST'),
('lead-imp-41', 'Pixel', 'Mir Abbas', 'Mir Abbas', '7780911106', 'Corporate Brochure', 'One-Time', NULL, 'Had a talk. Shared prochure and portfilio, he will call us later 29-07/', FALSE, 'WARM'),
('lead-imp-42', 'Pixel', 'Abdur Rehman', 'Abdur Rehman', '8250732873 / 95474 96082', 'Other', 'One-Time', NULL, '95474 96082 - md tarikh/ not picking 25th jul, tarikh told me to get the information from abdur sir but he is busy 29-07/', FALSE, 'COLD'),
('lead-imp-43', 'Pixel', 'Vidya Jadhav', 'Vidya Jadhav', '9326219191', 'Other', 'One-Time', NULL, 'Starter pack. Need to know her budget, Ringing on 29-07/ | 25th Jul', FALSE, 'HOT'),
('lead-imp-44', 'Pixel', 'Jintu Kalita', 'Optius', '9678911668', 'Basic Website', 'One-Time', NULL, 'Website for Dental Clinic with appointment system', FALSE, 'WARM'),
('lead-imp-45', 'Pixel', 'Borilavali Restaurant', 'Sanjay Lead', '89549 92626', 'E-Commerce', 'One-Time', NULL, 'he wants a ecommerce website for resturants and sell it to different. he will inform us whenever he got a lead 25-07jul', FALSE, 'HOT'),
('lead-imp-46', 'Pixel', 'Vedant Maurya', 'Vedant Maurya', '7052863744', 'Search Engine Optimization (SEO)', 'Regular', 'Quarterly', 'WhatsApp Marketing, seo, social media, meta ads, hr related company(kind of placement and hiring property), not picking on 29-07', FALSE, 'COLD'),
('lead-imp-47', 'Pixel', 'Aniket Patani', 'Aniket Patani', '9610444822', 'WhatsApp Marketing', 'One-Time', NULL, 'MEta Ad, WhatsApp Marketing, Landing Page, CRM, fng global', FALSE, 'WARM'),
('lead-imp-48', 'Pixel', 'Amay Guruji', 'Amay Guruji', '9850007911', 'Other', 'One-Time', NULL, 'Talk once', FALSE, 'HOT'),
('lead-imp-49', 'Pixel', 'Dhruti Shah', 'Dhruti Shah', '97574 87201', 'Meta / Google Advertisement', 'One-Time', NULL, 'Digital Marketing, Dental clinic', FALSE, 'WARM'),
('lead-imp-50', 'Pixel', 'Sharjin Pathan', 'Sharjin Pathan', '77382 22112', 'Basic Website', 'One-Time', NULL, 'Interior designer from mumbai, wants website and social media, busy on 29-07', FALSE, 'HOT')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-51', 'Pixel', 'Interior Designer', 'Interior Designer', '7738222112', 'Basic Website', 'One-Time', NULL, 'Website requirement, ringing on 29-07', FALSE, 'COLD'),
('lead-imp-52', 'Pixel', 'Suraj Lead', 'Suraj Lead', '8976591357', 'Other', 'One-Time', NULL, 'Starter pack for financial business. When will he start ?', FALSE, 'HOT'),
('lead-imp-53', 'Pixel', 'Nalin Baranwal', 'Nalin Baranwal', '7084703654', 'Social Media (Organic)', 'One-Time', NULL, 'Wants reels and more Sir needs to call him to discuss further details, mutual fund company', FALSE, 'HOT'),
('lead-imp-54', 'Pixel', 'Ajay Kumar Agarwal', 'Ajay Kumar Agarwal', '9830443434', 'Corporate Brochure', 'One-Time', NULL, 'Brochure Sent brochure work', FALSE, 'WARM'),
('lead-imp-55', 'Pixel', 'kapiberry Beverages', 'Cijo', '7994472957', 'Social Media (Organic)', 'One-Time', NULL, 'Intrested is degital marketing and social media campaigning. Details send', FALSE, 'HOT'),
('lead-imp-56', 'Pixel', 'Abhishek Barnwal / Naveen ji', 'Abhishek Barnwal / Naveen ji', '9839116625', 'Social Media (Organic)', 'One-Time', NULL, 'Wants to see some raw reels and their edited versions, Already sent', FALSE, 'HOT'),
('lead-imp-57', 'Pixel', 'Silluka', 'Silluka', '9810927740', 'Other', 'One-Time', NULL, 'Starter pack, not picking up 25th july', FALSE, 'HOT'),
('lead-imp-58', 'Pixel', 'Lakshay Singhee', 'Lakshay Singhee', '8877018919', 'Other', 'One-Time', NULL, 'Custom Envelop 100 pcs needs, call back needed', FALSE, 'HOT'),
('lead-imp-59', 'Pixel', 'Opal clothing', 'Opal clothing', '9903971176', 'Other', 'One-Time', NULL, 'ba | Sent details and quotation, follow up on', FALSE, 'WARM'),
('lead-imp-60', 'Pixel', 'Ajay Lead', 'Ajay Lead', '7003048595', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-61', 'Pixel', 'Kuntal Saha', 'Kuntal Saha', '8637816917', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-62', 'Pixel', 'TRIO ONLINE', 'TRIO ONLINE', '7003742597', 'WhatsApp Marketing', 'One-Time', NULL, 'Whatsapp message sent', FALSE, 'WARM'),
('lead-imp-63', 'Pixel', 'Naman', 'Naman', '8443062725', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-64', 'Pixel', 'Moloy lead', 'Moloy lead', '9038068885', 'WhatsApp Marketing', 'One-Time', NULL, 'Intrested in leads and marketing, already sent all the details on whatsapp, need leads for insurance 11-08', FALSE, 'HOT'),
('lead-imp-65', 'Pixel', 'New Lead', 'New Lead', '6295699415', 'Other', 'One-Time', NULL, 'Agriculture business wants to expand', FALSE, 'HOT'),
('lead-imp-66', 'Pixel', 'Coffee & candles', 'Coffee & candles', '7780911106', 'WhatsApp Marketing', 'One-Time', NULL, 'Sent details on whatsapp', FALSE, 'WARM'),
('lead-imp-67', 'Pixel', 'Saleem Shaikh', 'Saleem Shaikh', '9049381106', 'Other', 'One-Time', NULL, 'WELTH ADVISORY/ wants to start from monday 25th may', FALSE, 'HOTTEST'),
('lead-imp-68', 'Pixel', 'SEN TAX CONSULTANCY', 'SEN TAX CONSULTANCY', '8282843433', 'Other', 'One-Time', NULL, 'Do all by himself, we need to budge him more', FALSE, 'WARM'),
('lead-imp-69', 'Pixel', 'Leena', 'Leena', '8459065848', 'Meta / Google Advertisement', 'One-Time', NULL, 'She needs help in digital marketing', FALSE, 'HOT'),
('lead-imp-70', 'Pixel', 'Abdul Matin', 'Abdul Matin', '7908182465', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-71', 'Pixel', 'Major Vikram Gupta', 'Major Vikram Gupta', '9830068302', 'Business Card Design', 'One-Time', NULL, 'Need business card, wants to see some sample ASAP', FALSE, 'HOT'),
('lead-imp-72', 'Pixel', 'ColourFit', 'ColourFit', '9123901096', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-73', 'Pixel', 'Palani Balasundaram', 'Palani Balasundaram', '8105420202', 'Other', 'One-Time', NULL, 'Intrested, confermation after 5th June', FALSE, 'HOTTEST'),
('lead-imp-74', 'Pixel', 'South Breeze School', 'South Breeze School', '7980843047', 'Meta / Google Advertisement', 'One-Time', NULL, 'Intrested in Reels and Ads', FALSE, 'HOT'),
('lead-imp-75', 'Pixel', 'Anjan Chatterjee', 'Anjan Chatterjee', '9163354015', 'WhatsApp Marketing', 'One-Time', NULL, 'Intrested in whatsapp marketing, need to speek to Dibyendu sir ASAP', FALSE, 'HOT'),
('lead-imp-76', 'Pixel', 'Kritika Kinda', 'Kritika Kinda', '9836746666', 'Social Media (Organic)', 'One-Time', NULL, 'Intersted, need a team who can handle all her social media works and add brand value', FALSE, 'HOT'),
('lead-imp-77', 'Pixel', 'Asuthosh Sharma', 'Asuthosh Sharma', '6353701548', 'Social Media (Organic)', 'One-Time', NULL, 'handle everything on social media by himself but wants to know what we can do better for him', FALSE, 'HOT'),
('lead-imp-78', 'Pixel', 'Nurul Hassan', 'Nurul Hassan', '7908129117', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-79', 'Pixel', 'RT Solution', 'Samrat', '7318737997', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-80', 'Pixel', 'Liorr Perfumes', 'Liorr Perfumes', '7605039381', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-81', 'Pixel', 'Manish Karnani', 'Manish Karnani', 'N/A', 'Other', 'One-Time', NULL, '933133322', FALSE, 'WARM'),
('lead-imp-82', 'Pixel', 'Nidhi Saraf', 'Nidhi Saraf', '9831068484', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-83', 'Pixel', 'Tripology', 'Tripology', '99866 96040', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-84', 'Pixel', 'Sudhangshu', 'Sudhangshu', '8529734993', 'Other', 'One-Time', NULL, 'he have few needs but can speak after 9pm', FALSE, 'HOT'),
('lead-imp-85', 'Pixel', 'Himanshu', 'Himanshu', '7889057163', 'Search Engine Optimization (SEO)', 'Regular', 'Quarterly', 'Intrested in SEO, already sent all the details on whatsapp', FALSE, 'HOT'),
('lead-imp-86', 'Pixel', 'Palak', 'Palak', '9740631095', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-87', 'Pixel', 'Anoop Kedia', 'Anoop Kedia', '7980093487', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-88', 'Pixel', 'Propertydikhaobhaiya & AugmentRealtors', 'Propertydikhaobhaiya & AugmentRealtors', '79806 58061', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-89', 'Pixel', 'Drishti Vision Solution', 'Drishti Vision Solution', '7015177522', 'Search Engine Optimization (SEO)', 'Regular', 'Quarterly', 'Intersted in SEO send our detaills of whatsapp ( https://drishtivision.in/ )', FALSE, 'HOT'),
('lead-imp-90', 'Pixel', 'Amruta', 'Amruta', '7977804143', 'Other', 'One-Time', NULL, 'Intrested but need a call back after 4pm', FALSE, 'HOT'),
('lead-imp-91', 'Pixel', 'Avani', 'Avani', '9830159509', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-92', 'Pixel', 'Website', 'Gopal', '9477316915', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-93', 'Pixel', 'New Lead', 'New Lead', '7418581807', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-94', 'Pixel', 'Nishantji', 'Nishantji', '98300 32434', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-95', 'Pixel', 'Nishant Taj', 'Nishant Taj', '98319 51330', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-96', 'Pixel', 'Vinit Nishant', 'Vinit Nishant', '98755 66367', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-97', 'Pixel', 'A', 'Lead', '78376 28223', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-98', 'Pixel', 'Ritikesh Kumar', 'Ritikesh Kumar', '83406 05703', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-99', 'Pixel', 'Sarah Imtiaz', 'Sarah Imtiaz', '9831242369', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-100', 'Pixel', 'Sikkim Taxi Rental', 'Sikkim Taxi Rental', '9609358582', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-101', 'Pixel', 'Parth', 'Parth', '9909002277', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-102', 'Pixel', 'Srija Agarbatti', 'Atul', '63931 18707', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-103', 'Pixel', 'BonnTonn Cafe', 'BonnTonn Cafe', 'N/A', 'Basic Website', 'One-Time', NULL, 'Website development. Connect after 23rd May', FALSE, 'WARM'),
('lead-imp-104', 'Pixel', 'Manish Shah', 'Manish Shah', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-105', 'Pixel', 'Moushumi Chatterjee', 'Moushumi Chatterjee', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-106', 'Pixel', 'Rajeev Badhani', 'Rajeev Badhani', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-107', 'Pixel', 'Smita 1 Lead', 'Smita 1 Lead', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-108', 'Pixel', 'Yash', 'Yash', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-109', 'Pixel', 'Ekta Business Card', 'Ekta Business Card', 'N/A', 'Business Card Design', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-110', 'Pixel', 'Hopping tails', 'Raj', '7208517859', 'Other', 'One-Time', NULL, 'Wants to talk to my senior', FALSE, 'HOT'),
('lead-imp-111', 'Pixel', 'Md Sharique', 'Md Sharique', 'N/A', 'Google Business Profile', 'One-Time', NULL, 'Google business profile and Business Marketing', FALSE, 'WARM'),
('lead-imp-112', 'Pixel', 'Rishi Packaging', 'Rishi Packaging', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-113', 'Pixel', 'Nishant Goyal', 'Nishant Goyal', 'N/A', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-114', 'Pixel', 'Dev Gopal Sinha', 'Dev Gopal Sinha', '9748811054', 'Other', 'One-Time', NULL, 'Next month midddle try to call | 1st Aug', FALSE, 'WARM'),
('lead-imp-115', 'Pixel', 'Vatsala Impex', 'Ankit Goyal', '9810108144', 'Other', 'One-Time', NULL, '24-06-26 Busy, call after sometime.', FALSE, 'HOT'),
('lead-imp-116', 'Pixel', 'Dhananjaya', 'Dhananjaya', '7509337596', 'Branding Guidelines', 'One-Time', NULL, 'Pickle business, needs branding and marketing, call on Monday 22nd, for more details / 26-06- switch off', FALSE, 'HOT'),
('lead-imp-117', 'Pixel', 'Wallah Habibi Perfumes', 'Wallah Habibi Perfumes', '7042341321', 'Search Engine Optimization (SEO)', 'Regular', 'Quarterly', 'need to talk after 25th May, intrested in ads on social media and Seo', FALSE, 'HOT'),
('lead-imp-118', 'Pixel', 'Abhishek Rathi', 'Abhishek Rathi', '7890008922', 'Other', 'One-Time', NULL, 'Sunday Call', FALSE, 'WARM'),
('lead-imp-119', 'Pixel', 'Dharewal Jewellers', 'Dharewal Jewellers', '9836857555', 'Other', 'One-Time', NULL, 'Need to meet next week on wednessday/ no need rn on 05-08 | call 29th jul', FALSE, 'WARM'),
('lead-imp-120', 'Pixel', 'Hyd', 'Srinivas Dry Cleaner', '7799799951', 'Other', 'One-Time', NULL, 'Need to call him around 2:30 on 05-08 | 25 Jul', FALSE, 'WARM'),
('lead-imp-121', 'Pixel', 'Ishika Lead', 'Ishika Lead', '6291475614', 'Other', 'One-Time', NULL, 'Call after 2 weeks, on 29-07', FALSE, 'HOT'),
('lead-imp-122', 'Pixel', 'Paresh Vakhharria', 'Paresh Vakhharria', '9820396131', 'Other', 'One-Time', NULL, 'busy on 29-07', FALSE, 'COLD'),
('lead-imp-123', 'Pixel', 'Balbinder Singh', 'Balbinder Singh', '8824386564', 'Other', 'One-Time', NULL, 'invalid number, 29-07', FALSE, 'COLD'),
('lead-imp-124', 'Pixel', 'Bhavna Bhanushali', 'Bhavna Bhanushali', '8850963765', 'Other', 'One-Time', NULL, 'busy on 29-07', FALSE, 'COLD'),
('lead-imp-125', 'Pixel', 'Bajrang Events', 'Sanjay', '9849229690', 'Other', 'One-Time', NULL, 'Busy on 29-07', FALSE, 'COLD'),
('lead-imp-126', 'Pixel', 'Sunny', 'Sunny', '9390504513', 'Other', 'One-Time', NULL, 'ringing 29-07', FALSE, 'COLD'),
('lead-imp-127', 'Pixel', 'Santosh Kumar', 'Santosh Kumar', '8885881555', 'Other', 'One-Time', NULL, 'ringing 29-07', FALSE, 'COLD'),
('lead-imp-128', 'Pixel', 'Dg Lead', 'Dg Lead', '9177852870', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-129', 'Pixel', 'Sam Lead', 'Sam Lead', '7017960184', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-130', 'Pixel', 'LBS Vijay Lead', 'LBS Vijay Lead', '7330663444', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-131', 'Pixel', 'New 2 Lead', 'New 2 Lead', '8108642175', 'Other', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-132', 'Pixel', 'Kiran', 'Kiran', '7666935909', 'Other', 'One-Time', NULL, '13:30 pm', FALSE, 'WARM'),
('lead-imp-133', 'Pixel', 'luxury living', 'luxury living', 'N/A', 'Other', 'One-Time', NULL, '914771443', FALSE, 'WARM'),
('lead-imp-134', 'Pixel', 'Om, Ahmedabad', 'Om, Ahmedabad', '7383478888', 'Other', 'One-Time', NULL, 'Intrested, need to call on 31st july for more details. 30-07/ busy on 05-08', FALSE, 'HOT'),
('lead-imp-135', 'Pixel', 'Wallah Habibi Perfumes', 'Wallah Habibi Perfumes', '7042341321', 'Other', 'One-Time', NULL, 'Intrested, need to call after 2:30 on 30th july for more details. 30-07/ ringing', FALSE, 'HOT'),
('lead-imp-136', 'Pixel', 'Shrikant Kejrewal', 'Shrikant Kejrewal', '7767977676', 'Other', 'One-Time', NULL, 'Intrested, candle business, need to call again today, 30-07/', FALSE, 'HOT'),
('lead-imp-137', 'Pixel', 'Sajid ali', 'Sajid ali', '93243 60986', 'Meta / Google Advertisement', 'One-Time', NULL, 'ac repair and resell business, want to promote his businsess for leads. 30-07/', FALSE, 'WARM'),
('lead-imp-138', 'Pixel', 'Ekta Business Card', 'Ekta Business Card', '7439477135', 'Business Card Design', 'One-Time', NULL, 'insurance company- need everything', FALSE, 'WARM'),
('lead-imp-139', 'Pixel', 'doctor', 'Rajib', '8584985870', 'Basic Website', 'One-Time', NULL, 'need website for his business along with all', FALSE, 'WARM'),
('lead-imp-140', 'Pixel', 'Archana kawat [Cha adda (sitola mandir)]', 'Archana kawat [Cha adda (sitola mandir)]', '8274064759', 'Other', 'One-Time', NULL, 'need everything from bigining', FALSE, 'WARM'),
('lead-imp-141', 'Pixel', 'Supratik Das', 'Protishruti', 'N/A', 'Other', 'One-Time', NULL, 'DO NOT WANT SERVICE ANYMORE', FALSE, 'LOST'),
('lead-imp-142', 'Pixel', 'Jyoh''s', 'Jyoh''s', '8332885426', 'Other', 'One-Time', NULL, 'Not intrested', FALSE, 'LOST'),
('lead-imp-143', 'Pixel', 'Ahmed', 'Ahmed', '9769325466', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-144', 'Pixel', 'Paresh Shah', 'Paresh Shah', '9920908076, 7526002730', 'Social Media (Organic)', 'One-Time', NULL, 'pickle ball manufacturer want to start social media need a proposal.29-07', FALSE, 'HOT'),
('lead-imp-145', 'Pixel', 'Tropiflakes', 'Tropiflakes', '9920987571', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-146', 'Pixel', '07', 'Full Fledged ecom, Meta, WhatsApp, SEO, He already did with some other vendor 29', 'N/A', 'Search Engine Optimization (SEO)', 'Regular', 'Quarterly', 'Contact inquiry', FALSE, 'LOST'),
('lead-imp-147', 'Pixel', 'Ganguly Bagan', 'Marriage Banerjee', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-148', 'Pixel', 'Jadadish Chodavadiya', 'Jadadish Chodavadiya', '9016520576', 'Mobile App Development', 'One-Time', NULL, 'Intrested, send him detaills on whatapp call after lunch on 29-07/ 03-08 he will by thursday | 25th Jul', FALSE, 'HOT'),
('lead-imp-149', 'Pixel', 'Millie SenGupta', 'Millie SenGupta', '9830022542', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-150', 'Pixel', 'Vivek Bhagat', 'Vivek Bhagat', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, 'Social media', FALSE, 'WARM')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-151', 'Pixel', 'Ashwini Nikam', 'Ashwini Nikam', 'N/A', 'Other', 'One-Time', NULL, 'Fresher', FALSE, 'WARM'),
('lead-imp-152', 'Pixel', 'Kamlesh Patel', 'Kamlesh Patel', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, 'Social media', FALSE, 'WARM'),
('lead-imp-153', 'Pixel', 'Sharun Kanan', 'Sharun Kanan', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-154', 'Pixel', 'Anushree Joshi', 'Anushree Joshi', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, 'Social media', FALSE, 'WARM'),
('lead-imp-155', 'Pixel', 'Pravin Kakad', 'Pravin Kakad', 'N/A', 'Basic Website', 'One-Time', NULL, 'Website', FALSE, 'WARM'),
('lead-imp-156', 'Pixel', 'Satyam Pandey', 'Satyam Pandey', 'N/A', 'Basic Website', 'One-Time', NULL, 'Website, social media', FALSE, 'WARM'),
('lead-imp-157', 'Pixel', 'Ayush Agarwal', 'Ayush Agarwal', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-158', 'Pixel', 'Amey Kathe', 'Amey Kathe', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-159', 'Pixel', 'Abhishek', 'Abhishek', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-160', 'Pixel', 'Chetna Dungarwal', 'Chetna Dungarwal', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-161', 'Pixel', 'Nitin Kotkar', 'Nitin Kotkar', 'N/A', 'Basic Website', 'One-Time', NULL, 'Website', FALSE, 'WARM'),
('lead-imp-162', 'Pixel', 'Anushree Joshi', 'Anushree Joshi', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-163', 'Pixel', 'Deepak Seth', 'Deepak Seth', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-164', 'Pixel', 'Manoj Sharma', 'Manoj Sharma', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, 'Social media', FALSE, 'WARM'),
('lead-imp-165', 'Pixel', 'Palani Balasundaram', 'Palani Balasundaram', 'N/A', 'Meta / Google Advertisement', 'One-Time', NULL, 'digital marketing', FALSE, 'WARM'),
('lead-imp-166', 'Pixel', 'Kritika', 'Kritika', 'N/A', 'Business Card Design', 'One-Time', NULL, 'beusiness card', FALSE, 'WARM'),
('lead-imp-167', 'Pixel', 'Rajkumar Ambiquest', 'Rajkumar Ambiquest', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-168', 'Pixel', 'Anjan Chatterjee', 'Anjan Chatterjee', 'N/A', 'WhatsApp Marketing', 'One-Time', NULL, 'whatsapp Marketing', FALSE, 'WARM'),
('lead-imp-169', 'Pixel', 'Rahul Ghosh', 'Rahul Ghosh', 'N/A', 'WhatsApp Marketing', 'One-Time', NULL, 'whatsapp Marketing', FALSE, 'WARM'),
('lead-imp-170', 'Pixel', '𝗡𝗜𝗥𝗔𝗡𝗝𝗔𝗡 𝗠𝗔𝗥𝗨𝗧𝗜 𝗘𝗟𝗘𝗖𝗧𝗥𝗢𝗡𝗜𝗖𝗦', '𝗡𝗜𝗥𝗔𝗡𝗝𝗔𝗡 𝗠𝗔𝗥𝗨𝗧𝗜 𝗘𝗟𝗘𝗖𝗧𝗥𝗢𝗡𝗜𝗖𝗦', 'N/A', 'Other', 'One-Time', NULL, 'All', FALSE, 'WARM'),
('lead-imp-171', 'Pixel', 'ORDER MADE GARMENTS', 'ORDER MADE GARMENTS', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-172', 'Pixel', 'Tanya Choudhary', 'Tanya Choudhary', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, 'Sm', FALSE, 'WARM'),
('lead-imp-173', 'Pixel', 'Abhishesk HoyslaNaTure Stay', 'Abhishesk HoyslaNaTure Stay', 'N/A', 'Meta / Google Advertisement', 'One-Time', NULL, 'Meta ads', FALSE, 'WARM'),
('lead-imp-174', 'Pixel', 'Saket Lumiva', 'Saket Lumiva', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-175', 'Pixel', 'Venkatgiri', 'Venkatgiri', 'N/A', 'Logo Design', 'One-Time', NULL, 'Logo and card made by us | SM Decor Lead Sanwar Ali | print related scope', FALSE, 'WARM'),
('lead-imp-176', 'Pixel', 'Aravind Naktola', 'Aravind Naktola', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-177', 'Pixel', 'Sonia Saha', 'Sonia Saha', 'N/A', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-178', 'Pixel', 'Atri Ganguly', 'Atri Ganguly', 'N/A', 'Other', 'One-Time', NULL, 'All, insurance', FALSE, 'WARM'),
('lead-imp-179', 'Pixel', 'Moloy', 'Moloy', 'N/A', 'Other', 'One-Time', NULL, 'All, insurance', FALSE, 'WARM'),
('lead-imp-180', 'Pixel', 'Hiren Patel', 'Hiren Patel', '90999 11127', 'Social Media (Organic)', 'One-Time', NULL, 'social media', FALSE, 'WARM'),
('lead-imp-181', 'Pixel', 'Nurul Hassan', 'Nurul Hassan', '79081 29117', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-182', 'Pixel', 'Ossim Fitness Rajesh', 'Ossim Fitness Rajesh', '91620147996', 'Website Maintenance', 'Regular', 'Quarterly', 'website revamp and traffic', FALSE, 'WARM'),
('lead-imp-183', 'Pixel', 'Farha', 'Farha', '84206 17103', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-184', 'Pixel', 'Avon Manoj Kumar', 'Avon Manoj Kumar', '98712 19383', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-185', 'Pixel', 'Rajesh Jain', 'Rajesh Jain', '93300 01001', 'LinkedIn Ads & B2B Marketing', 'One-Time', NULL, 'New catalouge needed for linkedin informed on 06-08', FALSE, 'WARM'),
('lead-imp-186', 'Pixel', 'Abhay Singh', 'Abhay Singh', '99788 02982', 'Social Media (Organic)', 'One-Time', NULL, 'SMM Medta dds', FALSE, 'WARM'),
('lead-imp-187', 'Pixel', 'Prakash Sil', 'Prakash Sil', '81598 98505', 'Other', 'One-Time', NULL, 'lead', FALSE, 'WARM'),
('lead-imp-188', 'Pixel', 'Priti Vashtu', 'Priti Vashtu', '93150 71052', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-189', 'Pixel', 'Sudhangshu', 'Sudhangshu', '85297 34993', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-190', 'Pixel', 'Keshav Somani', 'Keshav Somani', '79806 67441', 'Logo Design', 'One-Time', NULL, 'Logo and website', FALSE, 'WARM'),
('lead-imp-191', 'Pixel', 'Zaib Khan', 'Zaib Khan', '89570 93958', 'Social Media (Organic)', 'One-Time', NULL, 'Smm', FALSE, 'WARM'),
('lead-imp-192', 'Pixel', 'Md Shahid', 'Md Shahid', '98306 96865', 'Basic Website', 'One-Time', NULL, 'website', FALSE, 'WARM'),
('lead-imp-193', 'Pixel', 'Shahid', 'Shahid', '98755 06910', 'Other', 'One-Time', NULL, 'Contact inquiry', FALSE, 'WARM'),
('lead-imp-194', 'Pixel', 'House of Gifts', 'House of Gifts', '93304 53857', 'Other', 'One-Time', NULL, 'we', FALSE, 'WARM'),
('lead-imp-195', 'Pixel', 'Manab Sen', 'Manab Sen', '89610 58026', 'Business Card Design', 'One-Time', NULL, 'Business Card', FALSE, 'WARM'),
('lead-imp-196', 'Pixel', 'Karan Sahu', 'Karan Sahu', '90733 57499', 'Business Card Design', 'One-Time', NULL, 'Business Card', FALSE, 'WARM'),
('lead-imp-197', 'Pixel', 'Major Vikram Gupta', 'Major Vikram Gupta', '98300 68302', 'Business Card Design', 'One-Time', NULL, 'Business Card', FALSE, 'WARM'),
('lead-imp-198', 'Pixel', 'Farhan Ahmed', 'Farhan Ahmed', '73099 49495', 'Meta / Google Advertisement', 'One-Time', NULL, 'Digital Marketing', FALSE, 'WARM'),
('lead-imp-199', 'Pixel', 'The Teacher Hub', 'The Teacher Hub', '90733 12196', 'Meta / Google Advertisement', 'One-Time', NULL, 'Digital Marketing', FALSE, 'WARM')
ON CONFLICT (id) DO NOTHING;

