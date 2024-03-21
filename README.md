# E-Hippo ✨
E commerce website with Store and custom Admin dashboard.

### Deploy links: 🎡
- Store: https://e-hippo-store.vercel.app
- Admin: https://e-hippo.vercel.app

### Technologies used 👨‍💻
- [Nextjs](https://nextjs.org) - Frontend and backend.
- [Supabase postgres](https://supabse.com) - Databse.
- [Drizzle](https://orm.drizzle.team/) - ORM.
- [Tailwind Css](https://tailwindcss.com) - Styling.
- [Shadcn UI](https://ui.shadcn.com) - Component library.
- [Zod](https://zod.dev) - Schema/Data Validation.
- [React Hook form](https://react-hook-form.com/) - Form handling.
- [Clerk](https://clerk.com) - Authentication.
- [Stripe](https://stripe.com) - Payments.
- [Cloudinary](https://cloudinary.com) - Image storage.

### Run project locally.
- Clone the repo
    ```bash
    git clone https://github.com/Sudhanva-Nadiger/E-hippo.git
    ```
    ```bash
    cd e-hippo
    ```
<br />

- Install Packages
    ```bash
    npm run install
    # or
    yarn install
    ```
<br />

- Run admin
    - Setup `.env` in `admin/` directory.
    ```bash
    # CLERK AUTH DETAILS
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Your publishable key from clerk>

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    # Daatabase 
    POSTGRES_URL=<Databse URL> # Feel free to use any sql databses.

    # Cludinary
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Cloudinary Cloud name>

    # Stripe
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<Your public key from stripe>
    STRIPE_WEBHOOK_SECRET=<Your stripe webhook secrete>

    FRONTEND_STORE_URL=http://localhost:3001
    ```
    - Push yor schema to databse.
    ```bash
    npm run drizzle
    # or
    yarn drizzle
    ```
    ```bash
    npm run admin
    # or
    yarn admin
    ```

    You can access Admin dashboard now in: http://localhost:3000
<br />

- Run Store
    - Setup `.env` file in `store/` directory
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:3000/api/{storeId}
    ```
    Then tun the following command.
    ```bash
    npm run store
    # or
    yarn store
    ```

    You can access store now in: https://localhost:3001

### Thank you 🎊

