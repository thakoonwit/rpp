const features = [
  {
    icon: '✅',
    title: 'ตรวจสอบก่อนขาย',
    desc: 'สินค้าทุกชิ้นผ่านการตรวจสอบโดยทีมงาน RPSZZ อย่างละเอียด ไม่มีปกปิด',
  },
  {
    icon: '🔧',
    title: 'ซ่อมและทำความสะอาด',
    desc: 'แก้ไขและทำความสะอาดให้พร้อมใช้งาน เหมือนใหม่ในราคาที่เข้าถึงได้',
  },
  {
    icon: '📊',
    title: 'แจ้งสภาพจริงเป็น %',
    desc: 'ประเมินสภาพสินค้าเป็นเปอร์เซ็นต์อย่างตรงไปตรงมา ไม่โอเวอร์เรท',
  },
  {
    icon: '💰',
    title: 'ราคาคุ้มค่า',
    desc: 'คุณภาพที่คุ้มกับทุกบาทที่จ่ายไป ไม่ต้องจ่ายแพงเพื่อของดี',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-[#121212]" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="why-heading"
            className="font-[family-name:var(--font-prompt)] font-bold text-white text-wrap-balance"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            ทำไมต้อง RPSZZ ?
          </h2>
          <p className="text-[#888] text-sm font-[family-name:var(--font-sarabun)] mt-2 max-w-lg mx-auto">
            เราเชื่อว่าของมือสองดี ยังมีคุณค่า และสามารถซื้อขายได้อย่างสบายใจ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-6 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors duration-300"
            >
              <div className="text-4xl" role="img" aria-hidden="true">{icon}</div>
              <h3 className="font-[family-name:var(--font-prompt)] font-bold text-white text-base">
                {title}
              </h3>
              <p className="font-[family-name:var(--font-sarabun)] text-sm text-[#888] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
