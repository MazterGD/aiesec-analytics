# AIESEC Exchange Analytics Platform

A comprehensive analytics platform to visualize time series trends of AIESEC Exchanges. Built with Next.js, TypeScript, and Recharts.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Recharts](https://img.shields.io/badge/Recharts-2.x-green)

## Features

### Dashboard Components

- **Metric Cards**: Summary cards displaying key totals for each exchange stage with period-over-period change indicators
- **Key Insights Panel**: Auto-generated insights with equations including conversion rates, completion rates, match rates, and trend analysis
- **Metric Selector**: Interactive toggle buttons to select which metrics to display on the time series chart
- **Time Series Chart**: Multi-line/area chart showing trends over time with custom legend featuring colored dots
- **Exchange Funnel**: Horizontal bar chart visualizing the exchange pipeline stages
- **Stage Conversion Rates**: Dedicated section showing conversion percentages between consecutive stages with hover tooltips displaying formulas
- **Application Status Distribution**: Donut/pie chart showing status breakdown with consistent colored-dot legend
- **Comparative Analysis Chart**: Combined bar and line chart showing application volumes alongside conversion rates (Match Rate, Acceptance Rate, Realization Rate)
- **Trend Analysis Summary Table**: Tabular view of all metrics with trend indicators, percent change, average, peak, and low values - each column header has tooltip equations

### Analytics Features

- **Trend Detection**: Automatic classification of trends as increasing, decreasing, or stable
- **Conversion Rate Calculations**: Stage-to-stage conversion percentages with formula tooltips
- **Peak Performance Tracking**: Identifies highest and lowest performing periods for each metric
- **Period Comparison**: Compares recent vs previous period averages to calculate percent changes

### Metrics Tracked (in funnel order)

1. **Sign-ups** - Total number of new sign-ups
2. **Matched** - Applications that have been matched with opportunities
3. **Applications** - Total number of applications submitted
4. **Accepted by Host** - Applications accepted by host organization
5. **Approvals** - Applications that have been approved
6. **Realized** - Exchanges that have started
7. **Finished** - Exchanges that have been finished
8. **Completed** - Exchanges completed successfully

_Remote Realized is also tracked separately_

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
│       └── route.ts           # API proxy route
├── components/
│   ├── FilterPanel.tsx        # Filter controls (date range, interval, office)
│   ├── MetricCards.tsx        # Summary metric cards with change indicators
│   ├── MetricSelector.tsx     # Metric toggle buttons for chart selection
│   ├── TimeSeriesChart.tsx    # Main time series visualization
│   ├── FunnelChart.tsx        # Exchange funnel bar chart
│   ├── ConversionRates.tsx    # Stage-to-stage conversion rates section
│   ├── DistributionChart.tsx  # Status distribution pie chart
│   ├── ComparativeChart.tsx   # Volume vs rates combined analysis
│   ├── TrendAnalysisTable.tsx # Trend summary table with tooltips
│   ├── InsightsPanel.tsx      # Auto-generated key insights
│   └── index.ts               # Component exports
├── lib/
│   ├── constants.ts           # Metric configs & demo data
│   └── analytics-utils.ts     # Data transformation & calculations
├── types/
│   └── analytics.ts           # TypeScript type definitions
├── icon.svg                   # Custom favicon (blue chart icon)
├── globals.css                # Global styles
├── layout.tsx                 # Root layout
└── page.tsx                   # Main dashboard page
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Recharts** - Chart library (LineChart, AreaChart, BarChart, PieChart, ComposedChart)
- **date-fns** - Date utilities
- **Lucide React** - Icon library

## UI Design

- **Light theme** with cream background (#f8f5f1)
- **Primary color**: AIESEC Blue (#037EF3)
- **White cards** with subtle shadows and rounded corners (3xl)
- **Consistent legends** with colored dots across all charts
- **Hover tooltips** showing calculation formulas throughout
- **Responsive layout** with two-column grid for charts

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
