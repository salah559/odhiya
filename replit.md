# أضحيتي (Odhiyati) - منصة بيع الأغنام

## نظرة عامة
منصة ويب عربية متكاملة لبيع وشراء الأغنام مع نظام إشراف إداري كامل. المنصة تدعم ثلاثة أنواع من المستخدمين: المشترين والبائعين والإداريين.

## التقنيات المستخدمة
- **Frontend**: React + TypeScript + Tailwind CSS + Shadcn UI
- **Backend**: Express.js + Firebase Admin SDK
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email/Password)
- **Storage**: Firebase Storage (للصور)
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Forms**: React Hook Form + Zod

## هيكل المشروع

### المجموعات في Firestore:
1. **users**: معلومات المستخدمين مع الأدوار (buyer/seller/admin)
2. **sheep**: قوائم الأغنام مع الصور والتفاصيل وحالة الموافقة
3. **orders**: طلبات الشراء مع التتبع الكامل

### الأدوار (Roles):
- **buyer**: يمكنه تصفح الأغنام وإنشاء طلبات شراء
- **seller**: يمكنه إضافة/تعديل/حذف قوائم الأغنام الخاصة به
- **admin**: يمكنه مراجعة وقبول/رفض المنتجات وإدارة المستخدمين والطلبات

### الميزات الرئيسية:
- ✅ تسجيل دخول بالبريد الإلكتروني وكلمة المرور
- ✅ اختيار الدور عند التسجيل (مشتري/بائع)
- ✅ رفع الصور للأغنام على Firebase Storage
- ✅ تصفح الأغنام مع فلاتر متقدمة (السعر، العمر، الوزن، المدينة)
- ✅ لوحة تحكم البائع لإدارة القوائم
- ✅ لوحة تحكم الأدمن للموافقة على المنتجات
- ✅ نظام الطلبات (المشتري -> الأدمن -> البائع)
- ✅ واجهة عربية RTL كاملة
- ✅ دعم الوضع الليلي/النهاري

## API Endpoints:
- `POST /api/auth/signup` - تسجيل حساب جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/me` - الحصول على معلومات المستخدم الحالي
- `POST /api/sheep` - إضافة خروف جديد (seller only)
- `GET /api/sheep` - الحصول على جميع الأغنام (مع فلاتر)
- `GET /api/sheep/:id` - تفاصيل خروف معين
- `PUT /api/sheep/:id` - تحديث خروف (seller only)
- `DELETE /api/sheep/:id` - حذف خروف (seller only)
- `POST /api/sheep/:id/approve` - الموافقة على خروف (admin only)
- `POST /api/sheep/:id/reject` - رفض خروف (admin only)
- `POST /api/orders` - إنشاء طلب شراء (buyer only)
- `GET /api/orders` - الحصول على الطلبات (حسب الدور)
- `PUT /api/orders/:id/status` - تحديث حالة الطلب
- `GET /api/users` - الحصول على جميع المستخدمين (admin only)
- `POST /api/upload` - رفع صورة

## البيئة (Environment Variables):
- `VITE_FIREBASE_PROJECT_ID` - معرف مشروع Firebase
- `VITE_FIREBASE_APP_ID` - معرف تطبيق Firebase
- `VITE_FIREBASE_API_KEY` - مفتاح API لـ Firebase
- `SESSION_SECRET` - سر الجلسات

## تفضيلات المستخدم:
- اللغة الأساسية: العربية
- الاتجاه: RTL (من اليمين لليسار)
- التصميم: عصري، نظيف، احترافي
- الخطوط: Cairo و Tajawal
- الألوان: نظام الوان احترافي مع دعم الوضع الليلي

## آخر التحديثات:
- 2025-01-22: إنشاء المشروع وإعداد البنية الأساسية
- تم إضافة Firebase Authentication و Firestore و Storage
- تم بناء نظام الأدوار الكامل (buyer/seller/admin)
- تم إنشاء واجهات لجميع أنواع المستخدمين
