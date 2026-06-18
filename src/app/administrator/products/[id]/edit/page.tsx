import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'
import { ImageUploader } from '@/components/admin/image-uploader'
import Image from 'next/image'
import { DeleteImageButton } from '@/components/admin/delete-image-button'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: product }, { data: categories }] = (await Promise.all([
    supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('id', id)
      .single(),
    supabase.from('categories').select('*').order('sort_order'),
  ])) as any[]


  if (!product) notFound()

  const sortedImages = [...(product.product_images || [])].sort(
    (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)
  )

  return (
    <div className="lg:pt-0 pt-14 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">
          แก้ไขสินค้า
        </h1>
        <p className="text-[#888] text-sm font-[family-name:var(--font-sarabun)] mt-1">{product.name}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E5E5] p-6">
          <ProductForm product={product} categories={categories || []} />
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-6">
          <h2 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-base mb-4">
            รูปภาพสินค้า
          </h2>

          {/* Existing images */}
          {sortedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {sortedImages.map((img) => (
                <div key={img.id} className="relative group">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-[#F8F8F8]">
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                    {img.is_primary && (
                      <div className="absolute top-1 left-1">
                        <span className="text-xs bg-[#121212] text-white px-1.5 py-0.5 rounded font-[family-name:var(--font-prompt)]">
                          หลัก
                        </span>
                      </div>
                    )}
                  </div>
                  <DeleteImageButton imageId={img.id} productId={product.id} />
                </div>
              ))}
            </div>
          )}

          {/* Upload */}
          <ImageUploader productId={product.id} />
        </div>
      </div>
    </div>
  )
}
