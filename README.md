# Market Trends Analyzer

A comprehensive AI-powered market intelligence platform that analyzes trends, predicts market movements, and provides actionable insights across multiple data sources.

![Market Trends Analyzer](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

- **Intelligent Trend Analysis**: Advanced algorithms detect trend patterns and classify market movements
- **Multi-Source Data Integration**: Combines Google Trends, social media sentiment, and historical performance
- **Predictive Modeling**: AI-powered predictions with confidence levels for 7-30 day forecasts
- **Interactive Visualizations**: Real-time charts and graphs using Chart.js
- **Market Sector Analysis**: Identifies affected industries and investment opportunities
- **CSV Data Upload**: Import custom historical data for enhanced analysis
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + React Chart.js 2
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## 📊 Analysis Capabilities

### Trend Classification
- **Increasing**: Upward trend with positive growth rate
- **Decreasing**: Downward trend with negative growth rate
- **Volatile**: High variability with significant fluctuations
- **Stable**: Consistent performance with minimal changes

### Predictive Insights
- **Direction Prediction**: Up, Down, or Sideways movement
- **Confidence Levels**: High (85-95%), Medium (65-85%), Low (45-65%)
- **Growth Estimation**: Percentage change over specified timeframe
- **Market Sector Impact**: Industry correlation analysis

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/market-trends-analyzer.git
cd market-trends-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📈 Usage

1. **Enter a Keyword**: Input any market term, company name, or trend topic
2. **Select Time Range**: Choose from 7 days to 1 year analysis periods
3. **Upload CSV (Optional)**: Add historical data for enhanced analysis
4. **Analyze**: Click to generate comprehensive trend analysis
5. **Review Insights**: Examine predictions, sector impacts, and recommendations

### Example Keywords
- Technology: "artificial intelligence", "blockchain", "electric vehicles"
- Finance: "cryptocurrency", "stock market", "inflation"
- Business: "remote work", "e-commerce", "sustainability"
- Consumer: "streaming services", "food delivery", "fitness apps"

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── AnalysisForm.tsx    # Input form for analysis
│   ├── TrendChart.tsx      # Chart visualizations
│   ├── TrendSummary.tsx    # Trend overview
│   ├── SignalBreakdown.tsx # Multi-source signals
│   ├── PredictiveInsight.tsx # AI predictions
│   └── MarketSectors.tsx   # Sector analysis
├── types/              # TypeScript definitions
├── utils/              # Analysis algorithms
│   └── trendAnalyzer.ts   # Core analysis logic
└── App.tsx            # Main application
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Color-Coded Insights**: Visual indicators for trends and confidence levels
- **Interactive Charts**: Smooth animations and hover effects
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: WCAG compliant with proper contrast ratios

## 📊 Analysis Methodology

The analyzer uses sophisticated algorithms including:

- **Linear Regression**: For trend prediction and growth rate calculation
- **Volatility Analysis**: Standard deviation and variance calculations
- **Sentiment Correlation**: Social media sentiment impact modeling
- **Sector Mapping**: Industry correlation and impact assessment
- **Confidence Scoring**: Multi-factor reliability assessment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Chart.js for excellent charting capabilities
- Tailwind CSS for utility-first styling
- Lucide React for beautiful icons
- Pexels for stock photography

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Built with ❤️ for market intelligence and trend analysis**