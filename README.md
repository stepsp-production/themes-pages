# VIP Frontend Builder – Next.js Starter (Free Stack)

- Next.js (App Router) + Prisma + NextAuth (Credentials/JWT) + Tailwind.
- أدوار: USER / VIP / ADMIN / OWNER / POWER_ADMIN.
- صفحات: `/`, `/sign-in`, `/sign-up`, `/dashboard`, `/dashboard/customize`, `/dashboard/admin`, `/dashboard/owner`, `/dashboard/power`.
- APIs: auth, register, layout, content, approvals, permissions, settings (ticker), live (HLS).

## تشغيل محلي
```
npm i
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

حسابات جاهزة (seed):
- POWER_ADMIN: power@example.com / password123
- OWNER: owner1@example.com / password123
- ADMIN: admin1@example.com / password123

## نشر على Vercel
- اربط المستودع من GitHub.
- أضف متغيرات البيئة من `.env.example`.
- Deploy.
