# AIESEC Exchange Analytics Platform

A comprehensive analytics platform to visualize time series trends of AIESEC Exchanges. Built with Next.js, TypeScript, and Recharts.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Recharts](https://img.shields.io/badge/Recharts-2.x-green)

## Features

### Core Visualizations

- **Time Series Charts**: Interactive line, area, and bar charts showing trends over time
- **Exchange Funnel**: Visual representation of the exchange pipeline from applications to completion
- **Distribution Chart**: Donut chart showing application status distribution
- **Comparative Analysis**: Combined chart showing volumes and conversion rates

### Advanced Analytics

- **Trend Analysis**: Automatic detection of increasing/decreasing/stable trends
- **Key Insights**: AI-generated insights including:
  - Conversion rates (Application → Realized)
  - Completion rates
  - Match rates
  - Approval to realization conversion
  - Engagement rates
- **Peak Performance Detection**: Identifies best performing periods

### Metrics Tracked

- Total Applications
- Matched Applications
- Approvals
- AN Accepted
- Realized Exchanges
- Finished Exchanges
- Completed Exchanges
- Remote Realized
- Sign-ups

## Getting Started

### Prerequisites

- Node.js 18+ installed
- AIESEC EXPA access token (get from EXPA platform)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aiesec-analytics

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Configuration

The platform allows you to configure:

- **Office ID**: Select from common offices or enter a custom ID
- **Date Range**: Set start and end dates for analysis
- **Interval**: Choose from daily, weekly, monthly, quarterly, or yearly
- **Access Token**: Your EXPA access token for API authentication

## API Integration

The platform connects to the AIESEC GIS Analytics API:

```
https://analytics.api.aiesec.org/v2/applications/analyze.json
```

### Parameters

| Parameter              | Description         | Example    |
| ---------------------- | ------------------- | ---------- |
| `histogram[office_id]` | AIESEC office ID    | 1552       |
| `start_date`           | Analysis start date | 2024-07-01 |
| `end_date`             | Analysis end date   | 2025-06-30 |
| `histogram[interval]`  | Time grouping       | month      |
| `access_token`         | Your EXPA token     | xxxxxx     |

## Project Structure

```
app/
├── api/
│   └── analytics/
│       └── route.ts          # API proxy route
├── components/
│   ├── FilterPanel.tsx       # Filter controls
│   ├── MetricCards.tsx       # Summary metric cards
│   ├── MetricSelector.tsx    # Metric toggle buttons
│   ├── TimeSeriesChart.tsx   # Main time series visualization
│   ├── FunnelChart.tsx       # Exchange funnel
│   ├── DistributionChart.tsx # Status distribution
│   ├── ComparativeChart.tsx  # Volume vs rates analysis
│   ├── TrendAnalysisTable.tsx# Trend summary table
│   └── InsightsPanel.tsx     # AI-generated insights
├── lib/
│   ├── constants.ts          # Configuration constants
│   └── analytics-utils.ts    # Data transformation utilities
├── types/
│   └── analytics.ts          # TypeScript type definitions
├── globals.css               # Global styles
├── layout.tsx                # Root layout
└── page.tsx                  # Main dashboard page
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Recharts** - Chart library
- **date-fns** - Date utilities
- **Lucide React** - Icons

## Demo Mode

The platform includes demo data that displays automatically when no access token is provided. This allows you to explore all features before connecting to the live API.

## Deployment

### Vercel (Recommended)

```bash
npm run build
```

Deploy using [Vercel Platform](https://vercel.com/new).

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## License

This project is for AIESEC internal use.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
