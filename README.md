# ATS Pro - AI-Powered Resume Analyzer

<div align="center">
  <img src="public/og-image.png" alt="ATS Pro Banner" width="600px" />
</div>

## Overview

ATS Pro is an AI-powered resume analyzer application that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). The application provides real-time feedback on resume structure, content, keywords, and offers suggestions for improvements.

## Features

- **Resume Upload & Analysis**: Upload your resume in PDF or DOCX format for AI-powered analysis
- **Keyword Optimization**: Get feedback on missing keywords and phrases relevant to your target job role
- **Content Suggestions**: Receive AI-generated suggestions to improve weak sections of your resume
- **Structure Analysis**: Identify structural issues and formatting problems that might affect ATS readability
- **Dark Mode Support**: Comfortable viewing experience in any lighting condition
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: NextJS, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **State Management**: React Context API
- **Animations**: Framer Motion
- **File Handling**: react-dropzone
- **Theme Handling**: next-themes
- **Notifications**: sonner, Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SaleemLawal/ATS-Pro.git
cd ATS-Pro
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
ATS-PRO/
├── app/                 # Application directory (Next.js App Router)
│   ├── favicon.ico      # Favicon for the application
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Main page component
├── components/          # Reusable UI components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and type definitions
├── node_modules/        # Installed dependencies (ignored in Git)
├── public/              # Static assets
├── .gitignore           # Git ignore file
├── components.json      # Component definitions
├── eslint.config.mjs    # ESLint configuration
├── next-env.d.ts        # Next.js environment type definitions
├── next.config.ts       # Next.js configuration
├── package-lock.json    # Lock file for installed dependencies
├── package.json         # Project dependencies and scripts
├── postcss.config.mjs   # PostCSS configuration
├── README.md            # Project documentation
├── tsconfig.json        # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run preview` - Preview the production build locally

## Authentication

The application includes a full authentication system with:

- Email/password login and registration
- Social authentication options (Google, GitHub)
- Password reset functionality
- Protected routes for authenticated users

## Roadmap

- **Enhanced Analysis**: Deeper resume parsing and more detailed feedback
- **Job Description Matching**: Compare resume against specific job descriptions
- **Cover Letter Generator**: AI-powered cover letter creation based on resume and job description
- **Job Application Tracker**: Track job applications and their statuses
- **LinkedIn Integration**: Import profile data from LinkedIn
- **Resume Templates**: Pre-designed templates for creating ATS-friendly resumes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or feedback, please reach out to us at support@atspro.com.

---

<div align="center">
  <p>Built with ❤️ by ATS Pro Team</p>
</div>
