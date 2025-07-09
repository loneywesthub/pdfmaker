# Document Editor Application

## Overview

This is a full-stack document editor application built with React, TypeScript, and Express. The application provides a rich text editing interface with formatting capabilities, document preview, and PDF export functionality. It uses a clean, modern architecture with shadcn/ui components for the frontend and a PostgreSQL database with Drizzle ORM for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple
- **Development**: Hot reloading with Vite middleware in development

## Key Components

### Document Editor Features
- **Rich Text Editor**: Textarea-based editor with formatting toolbar
- **Text Formatting**: Support for bold, italic, underline, headers, lists
- **Auto-formatting**: Automatic text cleanup and formatting
- **Real-time Preview**: Live preview of formatted document
- **Character/Word Count**: Real-time statistics
- **Zoom Controls**: Adjustable preview zoom levels
- **PDF Export**: Client-side PDF generation using jsPDF

### UI Components
- **Modular Design**: Reusable shadcn/ui components
- **Responsive Layout**: Mobile-first responsive design
- **Dark Mode Support**: CSS variables for theme switching
- **Accessibility**: ARIA-compliant components from Radix UI

### Data Layer
- **Schema**: User management with Drizzle ORM
- **Migrations**: Database schema versioning
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Session Management**: PostgreSQL-backed user sessions

## Data Flow

1. **Document Creation**: User creates/edits documents in the textarea editor
2. **Real-time Preview**: Text is processed through formatting functions and displayed in preview
3. **Auto-save**: Document changes trigger auto-save functionality (to be implemented)
4. **Export**: Users can export documents as PDF files
5. **File Operations**: Import/export of document files (partially implemented)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@tanstack/react-query**: Server state management
- **jspdf**: Client-side PDF generation
- **wouter**: Lightweight React routing

### UI Dependencies
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API
- **lucide-react**: Modern icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development
- **Hot Reloading**: Vite middleware integrated with Express
- **Error Handling**: Runtime error overlay in development
- **Environment**: NODE_ENV=development with tsx for TypeScript execution

### Production
- **Build Process**: Vite builds frontend to dist/public, esbuild bundles server
- **Server Bundle**: ESM format with external packages
- **Static Serving**: Express serves built frontend assets
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Database Setup
- **Migrations**: Drizzle Kit manages schema migrations
- **Push Command**: `npm run db:push` applies schema changes
- **Configuration**: drizzle.config.ts defines database connection and migration settings

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```