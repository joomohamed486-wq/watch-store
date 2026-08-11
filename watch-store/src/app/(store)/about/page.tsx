export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">من نحن</h1>
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed mb-4">
          وقت الذهب هو وجهتك الأولى للساعات الفاخرة في المملكة العربية السعودية. نقدم تشكيلة واسعة من الساعات السويسرية الأصلية من أشهر الماركات العالمية.
        </p>
        <p className="leading-relaxed mb-4">
          تأسست شركة وقت الذهب بهدف تقديم تجربة تسوق فاخرة وموثوقة لعشاق الساعات. نحن نؤمن بأن الساعة ليست مجرد أداة لمعرفة الوقت، بل هي قطعة فنية تعكس شخصية صاحبها وأناقته.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-4">قيمنا</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>الأصالة: جميع ساعاتنا أصلية 100% مع ضمان من الشركة المصنعة</li>
          <li>الجودة: نختار فقط أفضل الماركات والموديلات</li>
          <li>الخدمة: فريق متخصص لمساعدتك في اختيار الساعة المثالية</li>
          <li>الشفافية: أسعار واضحة بدون رسوم خفية</li>
        </ul>
      </div>
    </div>
  );
}
