# Doci's Health Platform

## Overview
A comprehensive health platform connecting patients with verified doctors, featuring AI-powered health insights, fitness tracking, nutrition planning, and community support.

## Recent Changes (Migration from Lovable to Replit)
- **Migration Date**: August 10, 2025
- **Replit Agent Migration**: August 15, 2025 - Successfully migrated from Replit Agent to standard Replit environment
- **Key Changes**:
  - Converted from React Router to wouter for routing
  - Migrated from Supabase to Neon PostgreSQL with Drizzle ORM
  - Replaced Supabase Auth with custom JWT-based authentication
  - Created server-side API routes for authentication and data management
  - Removed all Supabase dependencies and code
  - Fixed component import issues and deployment configuration

## Project Architecture

### Frontend (React + TypeScript)
- **Routing**: wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context (AuthContext, ThemeContext)
- **Data Fetching**: TanStack Query with custom API client
- **Key Pages**: Landing, Login, Signup, Patient Dashboard, Doctor Dashboard

### Backend (Express + TypeScript)
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **API Routes**: RESTful endpoints for auth, doctors, communities
- **Storage Layer**: DatabaseStorage class implementing IStorage interface

### Database Schema
- **users**: User accounts with email/password auth
- **doctors**: Doctor profiles with specialization and verification
- **communities**: Health communities for patient support
- **community_members**: Community membership relationships
- **community_posts**: Posts within communities

## User Preferences
- Focus on functionality and AI integration
- Prioritize working preview and authentication flow
- Keep UI clean and accessible

## Tech Stack
- **Frontend**: React, TypeScript, Vite, wouter, TanStack Query, Tailwind CSS
- **Backend**: Express, TypeScript, Drizzle ORM
- **Database**: Neon PostgreSQL
- **Authentication**: JWT tokens
- **Deployment**: Replit (port 5000)

## Development Notes
- Server runs on port 5000 with both API and frontend
- Database schema auto-synced with `npm run db:push`
- JWT tokens stored in localStorage for session management
- All Supabase code successfully removed and replaced with custom backend

## Deployment
- **Vercel Support**: Frontend can be deployed as static site with demo authentication
- **Build Command**: `vite build` creates optimized production build
- **Authentication**: Uses mock authentication for static deployment demo
- **API**: Backend API available for full-stack Replit deployment