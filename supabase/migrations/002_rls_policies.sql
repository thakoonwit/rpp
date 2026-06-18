-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Categories: public read
CREATE POLICY "categories_public_read" ON categories
  FOR SELECT TO anon, authenticated USING (true);

-- Categories: admin write
CREATE POLICY "categories_admin_write" ON categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Products: public read active products
CREATE POLICY "products_public_read" ON products
  FOR SELECT TO anon USING (status != 'draft');

-- Products: authenticated full access
CREATE POLICY "products_auth_all" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Product images: public read
CREATE POLICY "product_images_public_read" ON product_images
  FOR SELECT TO anon, authenticated USING (true);

-- Product images: admin write
CREATE POLICY "product_images_admin_write" ON product_images
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Orders: public insert (to place orders)
CREATE POLICY "orders_public_insert" ON orders
  FOR INSERT TO anon WITH CHECK (true);

-- Orders: authenticated full access
CREATE POLICY "orders_auth_all" ON orders
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Site settings: public read
CREATE POLICY "settings_public_read" ON site_settings
  FOR SELECT TO anon, authenticated USING (true);

-- Site settings: admin write
CREATE POLICY "settings_admin_write" ON site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: public read
CREATE POLICY "product_images_public_storage_read" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'products');

-- Storage policy: authenticated upload
CREATE POLICY "product_images_authenticated_upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'products');

-- Storage policy: authenticated delete
CREATE POLICY "product_images_authenticated_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'products');
