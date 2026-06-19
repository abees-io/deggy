# Supabase Integration and Setup Guide

This guide describes how to configure your Supabase backend for the Premium Dental Appointment Booking platform.

---

## 1. Create a Supabase Project

1. Go to [Supabase Console](https://supabase.com) and sign in.
2. Click **New Project** and select your organization.
3. Enter a Project Name (e.g., `DentalCare Pro`) and set a secure database password.
4. Choose a region closest to your users and click **Create Project**.

---

## 2. Set Up the Database Schema

1. Once your project is ready, navigate to the **SQL Editor** in the left-hand navigation bar.
2. Click **New Query** to create a new editor tab.
3. Copy the contents of the database schema file [schema.sql](file:///c:/projects/deggy/supabase/schema.sql) and paste them into the SQL editor.
4. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).
5. Verify that the `appointments` table has been created successfully.

---

## 3. Row Level Security (RLS) Policies

The SQL script automatically enables Row Level Security (RLS) and configures the following rules:
- **Public Insert**: Anyone (anonymous users) can submit a new appointment booking. This is essential for new patient booking flows.
- **Admin Select/Update/Delete**: Only authenticated users (the admin) can read appointments, change their booking status, or delete records.

---

## 4. Obtain API Credentials

1. Go to **Project Settings** (cog icon at the bottom of the left sidebar).
2. Select **API** under settings.
3. Copy your:
   - **Project URL** (`anon` key endpoint)
   - **API Key** (`anon` public key)
4. Create or edit a `.env.local` file in the root of your Next.js project and populate it:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

---

## 5. Enable Email Auth (For Admin Login)

1. Navigate to **Authentication** -> **Providers** -> **Email**.
2. Verify that **Enable Email Signup** and **Enable Email Login** are enabled.
3. Go to **Authentication** -> **Users** and click **Add User** -> **Create User**.
4. Enter the email and password you wish to use to log into the Admin Dashboard.
5. Once created, you can use these credentials to log in at the `/admin/login` page of this website!
