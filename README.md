# EjaRate - A non-profit web application

## Description
EjaRate is a web application designed to facilitate informed decision-making for individuals
seeking to rent apartments in Dubai, UAE.

The platform addresses the issue of transparency in apartment rentals, where renters often rely on
incomplete or biased information to make critical decisions about their living arrangements.

CM3070 Final Project at the University of London, BSc Computer Science.

## Live Demo
[ejarate.org](https://ejarate.org)

## Tech Stack

- Frontend: React.js with Next.js
- Backend: Next.js API routes
- Authentication: Supabase Auth with Google OAuth and Magic Link
- Database: Supabase Postgres

## Local Development

1. Clone the repository
2. Install dependencies
    ```bash
    npm install
    ```
3. Run the development server
    ```bash
    npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```bash
GOOGLE_API_KEY= # Google Maps API Key for the Places Autocomplete API
SUPABASE_DB_PASS= # Supabase Postgres Database Password
NEXT_PUBLIC_SUPABASE_URL= # Supabase Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase Project Public API Key
```

## Authors
[Maksym Dmukhovskyy](https://github.com/maxdyy)
<br />
Project developed as part of CM3070 Final Project at the University of London, BSc Computer Science.
