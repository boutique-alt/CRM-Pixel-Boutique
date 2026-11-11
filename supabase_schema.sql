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

-- 8. SEED PIXEL CLIENTS
DELETE FROM public.clients WHERE workspace = 'Pixel';
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-1', 'Pixel', 'S Light', 'S Light', 'N/A', 'Basic Website', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-2', 'Pixel', 'Anmoar', 'Anmoar', 'N/A', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-3', 'Pixel', 'Gentian', 'Gentian', 'N/A', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-4', 'Pixel', 'Gaofal', 'Gaofal', 'N/A', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-5', 'Pixel', 'Tribal Trim', 'Tribal Trim', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-6', 'Pixel', 'Durga Gold', 'Durga Gold', 'N/A', 'SaaS & CRM Systems', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-7', 'Pixel', 'Healthy Buddy', 'Healthy Buddy', 'N/A', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-8', 'Pixel', 'EDLCare', 'EDLCare', 'N/A', 'Basic Website', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-9', 'Pixel', 'Educus', 'Educus', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-10', 'Pixel', 'Ananya Wellness', 'Ananya Wellness', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-11', 'Pixel', 'Avon', 'Avon Manoj Kumar', '98712 19383', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-12', 'Pixel', 'Alan Baptist', 'Alan Baptist', 'N/A', 'Basic Website', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-13', 'Pixel', 'NVS', 'NVS', 'N/A', 'Corporate Brochure', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-14', 'Pixel', 'Pakka Pic Spot', 'Pakka Pic Spot', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-15', 'Pixel', 'CaochedBySouvik', 'Souvik', 'N/A', 'Basic Website', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-16', 'Pixel', 'Presales', 'Presales', 'N/A', 'Corporate Brochure', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-17', 'Pixel', 'P Edge', 'Personality Edge', 'N/A', 'Basic Website', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-18', 'Pixel', 'Optimum', 'Rajesh Agarwal', '8013747563', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-19', 'Pixel', 'Arohi', 'Arohi', 'N/A', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-20', 'Pixel', 'BFSL', 'BFSL', 'N/A', 'Other', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-21', 'Pixel', 'Debesh Bagchi', 'Debesh Bagchi', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;
INSERT INTO public.clients (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, became_client_at, deal_amount) VALUES ('pixel-client-22', 'Pixel', 'UVC', 'UVC', 'N/A', 'Social Media (Organic)', 'One-Time', NULL, '2026-11-01 10:00:00 AM', 0) ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, requirement = EXCLUDED.requirement;

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

-- 11. SEED PIXEL LEADS (213 LEADS FROM GOOGLE SHEET)
DELETE FROM public.leads WHERE workspace = 'Pixel';

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-1', 'Pixel', 'Abacus', 'Abacus', '9831580200', 'Other', 'One-Time', NULL, 'Need to visit them for the requirment | Callback: 27th Oct (call) | Calling Date: 23-Oct', FALSE, 'HOT'),
('lead-imp-2', 'Pixel', 'Smriti Podder', 'Smriti Podder', '9830597133', 'E-Commerce', 'One-Time', NULL, 'Boutique business- need more push | Callback: 28th oct (call) | Calling Date: 24-Oct', FALSE, 'HOT'),
('lead-imp-3', 'Pixel', 'Sourav (From Captain Sehgal)', 'Sourav (From Captain Sehgal)', '8017988775', 'Other', 'One-Time', NULL, 'he is hot. but need more time | Calling Date: 24-Oct', FALSE, 'HOT'),
('lead-imp-4', 'Pixel', 'Pawan Agarwal', 'Pawan Agarwal', '8100379372', 'Other', 'One-Time', NULL, 'Intrested | Calling Date: 25-Oct', FALSE, 'HOT'),
('lead-imp-5', 'Pixel', 'Alka Ma''am', 'Alka Ma''am', '9650466843', 'Basic Website', 'One-Time', NULL, 'Owner of a School: Need to send message | Callback: 27th Oct (call) | Calling Date: 23-Oct', FALSE, 'WARM'),
('lead-imp-6', 'Pixel', 'Sonu Goenka', 'Sonu Goenka', '9831364674', 'Other', 'One-Time', NULL, 'Ringing | Callback: 24th Oct (call) | Calling Date: 23-Oct', FALSE, 'COLD'),
('lead-imp-7', 'Pixel', 'Pawan Agarwal', 'Pawan Agarwal', '8100379372', 'Other', 'One-Time', NULL, 'call later | Callback: 24th Oct (call) | Calling Date: 23-Oct', FALSE, 'COLD'),
('lead-imp-8', 'Pixel', 'Archana kawat, Cha ghor', 'Archana kawat, Cha ghor', '8274064759', 'Basic Website', 'One-Time', NULL, 'Busy right now | Callback: 24th Oct (call) | Calling Date: 23-Oct', FALSE, 'COLD'),
('lead-imp-9', 'Pixel', 'Rajesh Jain', 'Rajesh Jain', '9330001001', 'Other', 'One-Time', NULL, 'He told me he is with S light | Calling Date: 24-Oct', FALSE, 'WARM'),
('lead-imp-10', 'Pixel', 'Baljeet', 'Baljeet', '7006472167', 'Other', 'One-Time', NULL, 'Ringing | Calling Date: 24-Oct', FALSE, 'COLD'),
('lead-imp-11', 'Pixel', 'TeachersHub', 'TeachersHub', '6290389820', 'Basic Website', 'One-Time', NULL, 'Ringing | Calling Date: 24-Oct', FALSE, 'COLD'),
('lead-imp-12', 'Pixel', 'Dhananjay', 'Dhananjay', '7509337596', 'Other', 'One-Time', NULL, 'call back after 2 week | Callback: 11th Nov (call) | Calling Date: 24-Oct', FALSE, 'WARM'),
('lead-imp-13', 'Pixel', 'Walla Habibi', 'Walla Habibi', '7042341321', 'Other', 'One-Time', NULL, 'Ringing | Calling Date: 24-Oct', FALSE, 'COLD'),
('lead-imp-14', 'Pixel', 'Moloy', 'Moloy', '9038068885', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-15', 'Pixel', 'Mecky Cafe & Bistro - Mr. Sumit', 'Mecky Cafe & Bistro - Mr. Sumit', '9330294363', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-16', 'Pixel', 'Mecky Cafe & Bistro - Priyanka', 'Mecky Cafe & Bistro - Priyanka', '8100258824', 'Basic Website', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-17', 'Pixel', 'Biswajit - Café owner (Bankura)', 'Biswajit - Café owner (Bankura)', '8390454153', 'Basic Website', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-18', 'Pixel', 'Celestial Café', 'Celestial Café', '9836860209', 'Basic Website', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-19', 'Pixel', 'Ambica Mishra', 'Ambica Mishra', '9836099920', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-20', 'Pixel', 'Central Surgicals- Sourabh', 'Central Surgicals- Sourabh', '9776432195', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-21', 'Pixel', 'Tail & Furry', 'Tail & Furry', '9903870552', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-22', 'Pixel', 'Subhangi Modi', 'Subhangi Modi', '8017353919', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-23', 'Pixel', 'Dbull - Saikat Dutta', 'Dbull - Saikat Dutta', '6291781081', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'LOST'),
('lead-imp-24', 'Pixel', 'Bishnu Surekha', 'Bishnu Surekha', '9830029733', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-25', 'Pixel', 'Deep', 'Deep', '7980649152', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-26', 'Pixel', 'Chhutir Thikana', 'Chhutir Thikana', '8420252273', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-27', 'Pixel', 'Virangana Sarees Manufacturer', 'Virangana Sarees Manufacturer', '9830085900', 'E-Commerce', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-28', 'Pixel', 'Sunitta Daas', 'Sunitta Daas', '9073105511', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-29', 'Pixel', 'Saanvis', 'Saanvis', '8697262189', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-30', 'Pixel', 'PickleBall 61', 'PickleBall 61', '9163824444', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-31', 'Pixel', 'Gift Seller', 'Gift Seller', '8100379372', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-32', 'Pixel', 'Magowa car rentral', 'Magowa car rentral', '9762001053', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-33', 'Pixel', 'Hrishikesh Bharti', 'Hrishikesh Bharti', '7669458369', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-34', 'Pixel', 'Bipasha Banerjee', 'Bipasha Banerjee', '7604068430', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-35', 'Pixel', 'Fresh 5 Lead', 'Fresh 5 Lead', '9689755653', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-36', 'Pixel', 'Rakhi Maloo', 'Rakhi Maloo', '9075758741', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-37', 'Pixel', 'Niranjan Mudhiraj', 'Niranjan Mudhiraj', '8096017049', 'Mobile App Development', 'One-Time', NULL, 'Whatsapp send | Calling Date: 27-Oct', FALSE, 'WARM'),
('lead-imp-38', 'Pixel', 'Raajrupa Sarkar Ganguly', 'Raajrupa Sarkar Ganguly', '7278358593', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-39', 'Pixel', 'Mir Abbas', 'Mir Abbas', '7780911106', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-40', 'Pixel', 'Vidya Jadhav', 'Vidya Jadhav', '9326219191', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-41', 'Pixel', 'Optius (Jintu Kalita)', 'Optius (Jintu Kalita)', '9678911668', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-42', 'Pixel', 'Sanjay Lead ( Borilavali Restaurant)', 'Sanjay Lead ( Borilavali Restaurant)', '8954992626', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-43', 'Pixel', 'Vedant Maurya', 'Vedant Maurya', '7052863744', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-44', 'Pixel', 'Aniket Patani', 'Aniket Patani', '9610444822', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-45', 'Pixel', 'Amay Guruji', 'Amay Guruji', '9850007911', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-46', 'Pixel', 'Dhruti Shah', 'Dhruti Shah', '9757487201', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-47', 'Pixel', 'Sharjin Pathan', 'Sharjin Pathan', '7738222112', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-48', 'Pixel', 'Interior Designer (Website requirement)', 'Interior Designer (Website requirement)', '7738222112', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-49', 'Pixel', 'Suraj Lead', 'Suraj Lead', '8976591357', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-50', 'Pixel', 'Nalin Baranwal', 'Nalin Baranwal', '7084703654', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM')
ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, comment = EXCLUDED.comment, status = EXCLUDED.status;

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-51', 'Pixel', 'Ajay Kumar Agarwal', 'Ajay Kumar Agarwal', '9830443434', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-52', 'Pixel', 'Cijo (kapiberry Beverages)', 'Cijo (kapiberry Beverages)', '7994472957', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-53', 'Pixel', 'Abhishek Barnwal / Naveen ji', 'Abhishek Barnwal / Naveen ji', '9839116625', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-54', 'Pixel', 'Silluka', 'Silluka', '9810927740', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-55', 'Pixel', 'Lakshay Singhee', 'Lakshay Singhee', '8877018919', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-56', 'Pixel', 'Opal clothing', 'Opal clothing', '9903971176', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-57', 'Pixel', 'Ajay Lead', 'Ajay Lead', '7003048595', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-58', 'Pixel', 'Kuntal Saha', 'Kuntal Saha', '8637816917', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-59', 'Pixel', 'TRIO ONLINE', 'TRIO ONLINE', '7003742597', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-60', 'Pixel', 'Naman', 'Naman', '8443062725', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-61', 'Pixel', 'New Lead', 'New Lead', '6295699415', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-62', 'Pixel', 'Coffee & candles', 'Coffee & candles', '7780911106', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-63', 'Pixel', 'Saleem Shaikh', 'Saleem Shaikh', '9049381106', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-64', 'Pixel', 'Sen Tax Consultancy', 'Sen Tax Consultancy', '8282843433', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-65', 'Pixel', 'Leena', 'Leena', '8459065848', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-66', 'Pixel', 'Abdul Matin', 'Abdul Matin', '7908182465', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-67', 'Pixel', 'Major Vikram Gupta', 'Major Vikram Gupta', '9830068302', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-68', 'Pixel', 'ColourFit', 'ColourFit', '9123901096', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-69', 'Pixel', 'Palani Balasundaram', 'Palani Balasundaram', '8105420202', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-70', 'Pixel', 'South Breeze School', 'South Breeze School', '7980843047', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-71', 'Pixel', 'Anjan Chatterjee', 'Anjan Chatterjee', '9163354015', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-72', 'Pixel', 'Kritika Kinda', 'Kritika Kinda', '9836746666', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-73', 'Pixel', 'Asuthosh Sharma', 'Asuthosh Sharma', '6353701548', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-74', 'Pixel', 'Nurul Hassan', 'Nurul Hassan', '7908129117', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-75', 'Pixel', 'Liorr Perfumes', 'Liorr Perfumes', '7605039381', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-76', 'Pixel', 'Manish Karnani', 'Manish Karnani', '933133322', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-77', 'Pixel', 'Nidhi Saraf', 'Nidhi Saraf', '9831068484', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-78', 'Pixel', 'Tripology', 'Tripology', '9986696040', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-79', 'Pixel', 'Sudhangshu', 'Sudhangshu', '8529734993', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-80', 'Pixel', 'Himanshu', 'Himanshu', '7889057163', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-81', 'Pixel', 'Palak', 'Palak', '9740631095', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-82', 'Pixel', 'Anoop Kedia', 'Anoop Kedia', '7980093487', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-83', 'Pixel', 'Propertydikhaobhaiya & AugmentRealtors', 'Propertydikhaobhaiya & AugmentRealtors', '7980658061', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-84', 'Pixel', 'Drishti Vision Solution', 'Drishti Vision Solution', '7015177522', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-85', 'Pixel', 'Amruta', 'Amruta', '7977804143', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-86', 'Pixel', 'Avani', 'Avani', '9830159509', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-87', 'Pixel', 'Gopal - Website', 'Gopal - Website', '9477316915', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-88', 'Pixel', 'New Lead', 'New Lead', '7418581807', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-89', 'Pixel', 'Nishantji', 'Nishantji', '9830032434', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-90', 'Pixel', 'Nishant Taj', 'Nishant Taj', '9831951330', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-91', 'Pixel', 'Vinit Nishant', 'Vinit Nishant', '9875566367', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-92', 'Pixel', 'Lead-A', 'Lead-A', '7837628223', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-93', 'Pixel', 'Ritikesh Kumar', 'Ritikesh Kumar', '8340605703', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-94', 'Pixel', 'Sarah Imtiaz', 'Sarah Imtiaz', '9831242369', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-95', 'Pixel', 'Sikkim Taxi Rental', 'Sikkim Taxi Rental', '9609358582', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-96', 'Pixel', 'Parth', 'Parth', '9909002277', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-97', 'Pixel', 'Atul (Srija Agarbatti)', 'Atul (Srija Agarbatti)', '6393118707', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-98', 'Pixel', 'Rajeev Badhani', 'Rajeev Badhani', '9836115000', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-99', 'Pixel', 'Raj (Hopping tails)', 'Raj (Hopping tails)', '7208517859', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-100', 'Pixel', 'Dev Gopal Sinha', 'Dev Gopal Sinha', '9748811054', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM')
ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, comment = EXCLUDED.comment, status = EXCLUDED.status;

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-101', 'Pixel', 'Ankit Goyal - Vatsala Impex', 'Ankit Goyal - Vatsala Impex', '9810108144', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-102', 'Pixel', 'Dhananjaya', 'Dhananjaya', '7509337596', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-103', 'Pixel', 'Wallah Habibi Perfumes', 'Wallah Habibi Perfumes', '7042341321', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-104', 'Pixel', 'Abhishek Rathi', 'Abhishek Rathi', '7890008922', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-105', 'Pixel', 'Dharewal Jewellers', 'Dharewal Jewellers', '9836857555', 'E-Commerce', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-106', 'Pixel', 'Srinivas Dry Cleaner (Hyd)', 'Srinivas Dry Cleaner (Hyd)', '7799799951', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-107', 'Pixel', 'Ishika Lead', 'Ishika Lead', '6291475614', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-108', 'Pixel', 'Paresh Vakhharria', 'Paresh Vakhharria', '9820396131', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-109', 'Pixel', 'Balbinder Singh', 'Balbinder Singh', '8824386564', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-110', 'Pixel', 'Bhavna Bhanushali', 'Bhavna Bhanushali', '8850963765', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-111', 'Pixel', 'Sanjay (Bajrang Events)', 'Sanjay (Bajrang Events)', '9849229690', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-112', 'Pixel', 'Sunny', 'Sunny', '9390504513', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-113', 'Pixel', 'Santosh Kumar', 'Santosh Kumar', '8885881555', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-114', 'Pixel', 'Dg Lead', 'Dg Lead', '9177852870', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-115', 'Pixel', 'Sam Lead', 'Sam Lead', '7017960184', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-116', 'Pixel', 'LBS Vijay Lead', 'LBS Vijay Lead', '7330663444', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-117', 'Pixel', 'New 2 Lead', 'New 2 Lead', '8108642175', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-118', 'Pixel', 'Kiran', 'Kiran', '7666935909', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-119', 'Pixel', 'luxury living', 'luxury living', '914771443', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-120', 'Pixel', 'Om, Ahmedabad', 'Om, Ahmedabad', '7383478888', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-121', 'Pixel', 'Wallah Habibi Perfumes', 'Wallah Habibi Perfumes', '7042341321', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-122', 'Pixel', 'Shrikant Kejrewal', 'Shrikant Kejrewal', '7767977676', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-123', 'Pixel', 'Sajid ali', 'Sajid ali', '9324360986', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-124', 'Pixel', 'Rishi Packaging - Rajiv', 'Rishi Packaging - Rajiv', '7011127345', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-125', 'Pixel', 'Ossim Fitness Rajesh', 'Ossim Fitness Rajesh', '6201479961', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-126', 'Pixel', 'Farha', 'Farha', '8420617103', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-127', 'Pixel', 'Avon Manoj Kumar', 'Avon Manoj Kumar', '9871219383', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-128', 'Pixel', 'Rajesh Jain', 'Rajesh Jain', '9330001001', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-129', 'Pixel', 'Abhay Singh', 'Abhay Singh', '9978802982', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-130', 'Pixel', 'Prakash Sil', 'Prakash Sil', '8159898505', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-131', 'Pixel', 'Priti Vashtu', 'Priti Vashtu', '9315071052', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-132', 'Pixel', 'Sudhangshu', 'Sudhangshu', '8529734993', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-133', 'Pixel', 'Keshav Somani', 'Keshav Somani', '7980667441', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-134', 'Pixel', 'Zaib Khan', 'Zaib Khan', '8957093958', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-135', 'Pixel', 'Md Shahid', 'Md Shahid', '9830696865', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-136', 'Pixel', 'Shahid', 'Shahid', '9875506910', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-137', 'Pixel', 'House of Gifts', 'House of Gifts', '9330453857', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-138', 'Pixel', 'Manab Sen', 'Manab Sen', '8961058026', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-139', 'Pixel', 'Karan Sahu', 'Karan Sahu', '9073357499', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-140', 'Pixel', 'Major Vikram Gupta', 'Major Vikram Gupta', '9830068302', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-141', 'Pixel', 'Farhan Ahmed', 'Farhan Ahmed', '7309949495', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-142', 'Pixel', 'Ankit Goyal - Vatsala Impex', 'Ankit Goyal - Vatsala Impex', '9810108144', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-143', 'Pixel', 'Ajay Kumar Agarwal', 'Ajay Kumar Agarwal', '9830443434', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-144', 'Pixel', 'Palani Balasundaram', 'Palani Balasundaram', '8105420202', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-145', 'Pixel', 'Kritika', 'Kritika', '9836746666', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-146', 'Pixel', 'Rajkumar Ambiquest', 'Rajkumar Ambiquest', '9003929616', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-147', 'Pixel', 'Future Sure', 'Future Sure', '9903868205', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-148', 'Pixel', 'Rahul Ghosh', 'Rahul Ghosh', '8100945482', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-149', 'Pixel', 'Janjirala Kiran Kumar', 'Janjirala Kiran Kumar', '9391086195', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-150', 'Pixel', 'Shameema', 'Shameema', '8777536003', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM')
ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, comment = EXCLUDED.comment, status = EXCLUDED.status;

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-151', 'Pixel', 'Niranjan Maruti', 'Niranjan Maruti', '8249310337', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-152', 'Pixel', 'Order Made Garments', 'Order Made Garments', '8697690705', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-153', 'Pixel', 'Tanya Choudhary', 'Tanya Choudhary', '9830445825', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-154', 'Pixel', 'Abhishesk HoyslaNaTure Stay', 'Abhishesk HoyslaNaTure Stay', '9480738987', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-155', 'Pixel', 'Saket Lumiva', 'Saket Lumiva', '9674303636', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-156', 'Pixel', 'Venkatgiri', 'Venkatgiri', '9741971010', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-157', 'Pixel', 'SM Decor Lead Sanwar Ali', 'SM Decor Lead Sanwar Ali', '8013660240', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-158', 'Pixel', 'Aravind Naktola', 'Aravind Naktola', '9674213412', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-159', 'Pixel', 'Sonia Saha', 'Sonia Saha', '8777731934', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-160', 'Pixel', 'Atri Ganguly', 'Atri Ganguly', '7003210521', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-161', 'Pixel', 'Ashish Akrut Enterprise', 'Ashish Akrut Enterprise', '9320622653', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-162', 'Pixel', 'Ashwini Nikam', 'Ashwini Nikam', '9922371384', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-163', 'Pixel', 'Kamlesh Patel', 'Kamlesh Patel', '9892445881', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-164', 'Pixel', 'Sharun Kanan', 'Sharun Kanan', '7877552272', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-165', 'Pixel', 'Anushree Joshi', 'Anushree Joshi', '8097125833', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-166', 'Pixel', 'Pravin Kakad', 'Pravin Kakad', '9960099688', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-167', 'Pixel', 'Satyam Pandey', 'Satyam Pandey', '9175902679', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-168', 'Pixel', 'Ayush Agarwal', 'Ayush Agarwal', '9821569014', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-169', 'Pixel', 'Amey Kathe', 'Amey Kathe', '9850007911', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-170', 'Pixel', 'Abhishek', 'Abhishek', '9246344447', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-171', 'Pixel', 'Chetna Dungarwal', 'Chetna Dungarwal', '7020803637', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-172', 'Pixel', 'Nitin Kotkar', 'Nitin Kotkar', '9850029423', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-173', 'Pixel', 'Anushree Joshi', 'Anushree Joshi', '8097125833', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-174', 'Pixel', 'Jyoh''s', 'Jyoh''s', '8332885426', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-175', 'Pixel', 'Ahmed', 'Ahmed', '9769325466', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-176', 'Pixel', 'Tropiflakes', 'Tropiflakes', '9920987571', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-177', 'Pixel', 'Jadadish Chodavadiya', 'Jadadish Chodavadiya', '9016520576', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-178', 'Pixel', 'Millie SenGupta', 'Millie SenGupta', '9830022542', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-179', 'Pixel', 'Ayush Agarwal Lead Bareilly', 'Ayush Agarwal Lead Bareilly', '9897511110', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-180', 'Pixel', 'Deepak Seth', 'Deepak Seth', '8795399240', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-181', 'Pixel', 'Manoj Sharma', 'Manoj Sharma', '9810120514', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-182', 'Pixel', 'Kalamkari Makers Studio', 'Kalamkari Makers Studio', '9885777661', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-183', 'Pixel', 'Sharun Kanan', 'Sharun Kanan', '7877552272', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-184', 'Pixel', 'Mukunda T', 'Mukunda T', '7760677151', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-185', 'Pixel', 'Siddhartha Chakraborty', 'Siddhartha Chakraborty', '8637040247', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-186', 'Pixel', 'Pravin Kakad', 'Pravin Kakad', '9960099688', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-187', 'Pixel', 'Rajesh R. Salway', 'Rajesh R. Salway', '9822065355', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-188', 'Pixel', 'Akash Acharya (dentist in Bangalore)', 'Akash Acharya (dentist in Bangalore)', '9886959900', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-189', 'Pixel', 'Kamlesh Patel', 'Kamlesh Patel', '9892445881', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-190', 'Pixel', 'Mukunda T', 'Mukunda T', '7760677151', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-191', 'Pixel', 'Sushil Bagad(REAL STATE)', 'Sushil Bagad(REAL STATE)', '9823106341', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-192', 'Pixel', 'Anuj', 'Anuj', '8287531726', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-193', 'Pixel', 'Pradeep Noida', 'Pradeep Noida', '8130934485', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-194', 'Pixel', 'Saleem Shaikh', 'Saleem Shaikh', '9049381106', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-195', 'Pixel', 'Sumit Lakhotia', 'Sumit Lakhotia', '9711236888', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-196', 'Pixel', 'Giri', 'Giri', '9968557797', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-197', 'Pixel', 'Abdur Rehman', 'Abdur Rehman', '8250732873', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-198', 'Pixel', 'Abdur Rehman', 'Abdur Rehman', '9547496082', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-199', 'Pixel', 'Ekta Business Card', 'Ekta Business Card', '9830456764', 'Business Card Design', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-200', 'Pixel', 'Ekta Business Card', 'Ekta Business Card', '7439477135', 'Business Card Design', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM')
ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, comment = EXCLUDED.comment, status = EXCLUDED.status;

INSERT INTO public.leads (id, workspace, company, contact_name, contact_number, requirement, deal_type, recurring_cycle, comment, is_client, status) VALUES
('lead-imp-201', 'Pixel', 'Paresh Shah', 'Paresh Shah', '9920908076', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-202', 'Pixel', 'Paresh Shah', 'Paresh Shah', '7526002730', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-203', 'Pixel', 'Alora', 'Alora', '8777828003', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-204', 'Pixel', 'Alora', 'Alora', '9836221887', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-205', 'Pixel', 'SJK Shipping', 'SJK Shipping', '9681977766', 'Basic Website', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-206', 'Pixel', 'Ankit Kayal (JJUltra)', 'Ankit Kayal (JJUltra)', '9831682355', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-207', 'Pixel', 'Prakash Sil', 'Prakash Sil', '8159898505', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-208', 'Pixel', 'Ravi Jha', 'Ravi Jha', '7980168693', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-209', 'Pixel', 'Dharewal Jewellers', 'Dharewal Jewellers', '9102912108', 'E-Commerce', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-210', 'Pixel', 'Stanley', 'Stanley', '9994113117', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-211', 'Pixel', 'Hia Hochzeitsplaner', 'Hia Hochzeitsplaner', '7908268399', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-212', 'Pixel', 'Suman Biswas Murshidabad', 'Suman Biswas Murshidabad', '7718133771', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM'),
('lead-imp-213', 'Pixel', 'Lalit Kothari', 'Lalit Kothari', '9830410918', 'Meta / Google Advertisement', 'One-Time', NULL, 'Prospective lead from sales campaign', FALSE, 'WARM')
ON CONFLICT (id) DO UPDATE SET company = EXCLUDED.company, comment = EXCLUDED.comment, status = EXCLUDED.status;



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

