# FileShare

FileShare is a modern, secure file sharing platform built with Next.js 13, featuring end-to-end encryption and real-time analytics. It provides a seamless way to upload, share, and track files with enterprise-grade security.

![FileShare Banner](public/og.png)

## Features

### 🚀 Core Features
- **Secure File Sharing**: End-to-end encryption for all file transfers
- **Real-time Analytics**: Track file uploads, downloads, and engagement
- **User Dashboard**: Manage and monitor your shared files
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 💫 Key Highlights
- **Quick Upload**: Drag & drop interface for easy file uploads
- **File Management**: Organize, track, and delete your files
- **Download Tracking**: Monitor file downloads and views
- **User Authentication**: Secure login and user management
- **Dark Mode**: Built-in theme support for light and dark modes

### 📊 Analytics Dashboard
- Upload and download trends
- File type distribution
- Popular files tracking
- User engagement metrics
- Daily and monthly statistics

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Charts**: Chart.js, React-Chartjs-2
- **Icons**: Lucide Icons
- **Authentication**: Custom auth with secure storage
- **State Management**: React Hooks
- **UI Components**: Custom components with Radix UI

## Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fileshare.git
cd fileshare
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fileshare/
├── app/                    # Next.js 13 app directory
│   ├── analytics/         # Analytics dashboard
│   ├── files/            # File management
│   ├── login/            # Authentication
│   ├── pricing/          # Pricing plans
│   ├── upload/           # File upload
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── FileList.tsx      # File listing component
│   ├── FileUpload.tsx    # Upload component
│   ├── Footer.tsx        # Footer component
│   └── Navbar.tsx        # Navigation component
├── lib/                   # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Key Components

### File Upload
- Drag & drop interface
- Progress tracking
- File type validation
- Automatic encryption

### Analytics Dashboard
- Real-time metrics
- Interactive charts
- Performance tracking
- User engagement analysis

### User Management
- Secure authentication
- Profile management
- Session handling
- Access control

## Security Features

- End-to-end encryption
- Secure file storage
- Protected routes
- Session management
- Data privacy controls

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Chart.js](https://www.chartjs.org/)
- [Radix UI](https://www.radix-ui.com/)

## Support

For support, email support@fileshare.com or join our Slack channel.
