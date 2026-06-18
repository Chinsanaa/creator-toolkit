# Earnio iOS App

A comprehensive native iOS application for creators and sponsors to connect, collaborate, and manage sponsorship opportunities.

## Features

### 🎯 For Creators

#### Authentication & Account Management
- **Login/Signup** - Email and password authentication with user type selection (Creator/Sponsor)
- **Account Management** - View and manage profile information
- **Settings** - Theme preferences, language switching, account security
- **Account Deletion** - Securely delete account with password confirmation

#### Dashboard & Analytics
- **Dashboard Overview** - Real-time earnings summary with month-over-month growth
- **Monthly Trends** - Visualize earnings trends with interactive charts
- **Platform Breakdown** - See earnings distribution across connected platforms (TikTok, YouTube, Instagram)
- **Key Metrics** - Track total earnings, monthly earnings, and connected platforms

#### Platform Management
- **Connect Platforms** - Link TikTok, YouTube, and Instagram accounts
- **Sync Data** - Manually sync platform data to get latest follower counts
- **Sync History** - View platform sync activity and status
- **Platform Metrics** - Track follower counts and engagement per platform

#### Wallet & Payouts
- **Balance Overview** - View available balance, pending payouts, and total earnings
- **Bank Accounts** - Add and manage multiple bank accounts with verification status
- **Default Account** - Set a default bank account for payouts
- **Payout Requests** - Submit payout requests with custom amounts
- **Transaction History** - Detailed transaction tracking with status updates
- **Fee Tracking** - Monitor platform fees and payout status

#### Sponsorships
- **Browse Opportunities** - Discover available sponsorship listings
- **Advanced Filtering** - Filter by amount, followers, engagement rate, content type
- **Apply to Sponsorships** - Submit custom applications with personalized responses
- **Track Applications** - Monitor status of all submitted applications
- **Application Status** - Real-time updates on application approvals/rejections/completions
- **Requirements Display** - Clear visibility of follower and engagement requirements

#### Notifications
- **Real-time Updates** - Get notified about applications, approvals, payouts
- **Mark as Read** - Track notification status
- **Bulk Actions** - Mark all notifications as read at once
- **Notification Types** - Different icons and colors for different notification types

### 👤 For Sponsors

#### Sponsor Dashboard
- **Campaign Metrics** - Overview of active campaigns, total campaigns, pending applications
- **Budget Tracking** - Monitor active budget allocation
- **Quick Actions** - Fast access to create new campaigns

#### Campaign Management
- **Create Campaigns** - Full campaign creation with all details and requirements
- **Campaign Editor** - Edit title, description, payment, requirements, and deadlines
- **Campaign Status** - Draft, published, and closed status management
- **Publish Campaigns** - Move campaigns from draft to published status
- **Close Campaigns** - Stop accepting new applications
- **Delete Campaigns** - Remove campaigns (draft only)

#### Application Management
- **View Applications** - See all applications for each campaign
- **Approve/Reject** - Make decisions on creator applications
- **Application Notes** - Add notes when approving or rejecting
- **Creator Metrics** - View follower count and engagement rate for each applicant
- **Status Tracking** - Monitor all application statuses

#### Filters & Search
- **Status Filters** - Filter campaigns by status (all, published, draft, closed)
- **Application Count** - See number of applications per campaign at a glance

### 🔧 Shared Features

#### Settings & Preferences
- **Theme Toggle** - Light/Dark mode support
- **Language Support** - Multi-language internationalization
- **Documentation** - In-app documentation and guides
- **Legal Documents** - Terms of Service and Privacy Policy access

#### Notifications
- **Real-time Alerts** - Instant notifications for important events
- **Notification Center** - Centralized notification management
- **Read Status** - Mark notifications as read individually or in bulk

## Architecture

### Project Structure

```
ios/
├── Sources/
│   └── App/
│       ├── EarnioApp.swift              # Main app entry point
│       ├── Core/
│       │   ├── Models/
│       │   │   └── Models.swift         # All data models
│       │   ├── Services/
│       │   │   └── APIService.swift     # API client
│       │   ├── Contexts/
│       │   │   └── AuthContext.swift    # Auth state management
│       │   └── Utils/
│       └── Features/
│           ├── Auth/
│           │   └── AuthView.swift       # Login/Signup screens
│           ├── Dashboard/
│           │   └── CreatorDashboardView.swift  # Creator analytics
│           ├── Platforms/
│           │   └── PlatformsView.swift  # Platform management
│           ├── Wallet/
│           │   └── WalletView.swift     # Wallet & payouts
│           ├── Sponsorships/
│           │   └── SponsorshipsView.swift # Browse & apply
│           ├── Sponsor/
│           │   ├── SponsorDashboardView.swift
│           │   └── CampaignsView.swift  # Campaign management
│           ├── Notifications/
│           │   └── NotificationsView.swift
│           ├── Settings/
│           │   └── SettingsView.swift
│           └── MainViews/
│               ├── CreatorTabView.swift
│               └── SponsorTabView.swift
├── App/                                 # Xcode project (iOS 17+)
└── Package.swift                        # Swift Package manifest
```

### Key Technologies

- **SwiftUI** - Modern declarative UI framework
- **Async/Await** - Concurrency for networking
- **URLSession** - Network requests
- **Keychain** - Secure token storage
- **MVVM** - Model-View-ViewModel architecture
- **Codable** - JSON encoding/decoding
- **ObservableObject** - State management

## API Integration

The app integrates with the Earnio backend API with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout
- `DELETE /api/auth/account` - Delete account

### Creator Features
- `GET /api/dashboard/summary` - Dashboard metrics
- `GET/POST /api/platforms` - Platform management
- `POST /api/platforms/{id}/sync` - Sync platform data
- `GET /api/wallet/summary` - Wallet overview
- `GET /api/wallet/transactions` - Transaction history
- `GET /api/wallet/bank-accounts` - Bank account management
- `POST /api/wallet/payouts` - Request payout
- `GET /api/sponsorships` - Browse sponsorships
- `POST /api/sponsorships/{id}/apply` - Apply to sponsorship
- `GET /api/sponsorships/applications/me` - My applications

### Sponsor Features
- `GET /api/sponsor/dashboard` - Sponsor dashboard
- `GET/POST /api/sponsor/campaigns` - Campaign management
- `PATCH /api/sponsor/campaigns/{id}/status` - Update campaign status
- `PATCH /api/sponsor/applications/{id}` - Update application status

### General
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/{id}/read` - Mark as read
- `POST /api/notifications/read-all` - Mark all as read

## Security

- **Token-based Authentication** - JWT tokens with refresh mechanism
- **Keychain Storage** - Secure credential storage
- **HTTPS Only** - All API calls use HTTPS
- **Authorization Headers** - Bearer token in all authenticated requests
- **Automatic Logout** - Session invalidation on 401 responses

## Installation & Setup

### Requirements
- iOS 17.0 or later
- Xcode 15.0 or later
- Swift 5.9 or later

### Steps

1. **Clone the repository**
   ```bash
   cd ios
   ```

2. **Open in Xcode**
   ```bash
   open App/App.xcworkspace
   ```

3. **Configure API URL**
   - Edit `APIService.swift`
   - Update `baseURL` to your backend API endpoint

4. **Build and Run**
   ```bash
   ⌘B  # Build
   ⌘R  # Run
   ```

## Configuration

### Environment Setup

Edit `Sources/App/Core/Services/APIService.swift`:

```swift
private let baseURL = URL(string: "http://localhost:3001/api")!
// Change to production URL when deploying
```

## Features Checklist

### Creator Features ✓
- [x] Authentication (Login/Signup)
- [x] Dashboard with analytics
- [x] Monthly trends visualization
- [x] Platform breakdown charts
- [x] Platform management (connect, sync, disconnect)
- [x] Platform sync history
- [x] Wallet overview
- [x] Bank account management
- [x] Payout requests
- [x] Transaction history
- [x] Browse sponsorships
- [x] Apply to sponsorships
- [x] Track applications
- [x] Notifications
- [x] Settings
- [x] Account management

### Sponsor Features ✓
- [x] Sponsor dashboard
- [x] Campaign creation
- [x] Campaign editing
- [x] Campaign publishing
- [x] Campaign closing
- [x] Campaign deletion
- [x] View applications
- [x] Approve/reject applications
- [x] Filter campaigns by status
- [x] Notifications
- [x] Settings
- [x] Account management

### Shared Features ✓
- [x] User authentication
- [x] Token management (access + refresh)
- [x] Secure credential storage
- [x] Error handling
- [x] Loading states
- [x] Notifications
- [x] Settings & preferences
- [x] Dark mode support
- [x] Language support (framework)
- [x] Documentation links

## Testing

### Manual Testing Checklist

1. **Authentication Flow**
   - Create new creator account
   - Create new sponsor account
   - Login with existing credentials
   - Logout and verify session clear

2. **Creator Features**
   - View dashboard and verify metrics
   - Connect a platform
   - Manually sync platform
   - View wallet summary
   - Add bank account
   - Request payout
   - Browse sponsorships
   - Apply to sponsorship
   - Track application status

3. **Sponsor Features**
   - View sponsor dashboard
   - Create a campaign (draft)
   - Publish campaign
   - View applications
   - Approve/reject application
   - Close campaign
   - Delete campaign

4. **Notifications**
   - View notifications
   - Mark as read
   - Mark all as read

## Performance Optimization

- Lazy loading for lists
- Image caching (platform icons)
- Async/await for non-blocking operations
- Efficient data structures
- Minimal view hierarchy

## Future Enhancements

- Push notifications
- Offline mode with local caching
- Advanced analytics and charts
- In-app messaging
- Video preview support
- Analytics timeline interaction
- Campaign performance metrics
- Creator portfolio showcase
- Review and rating system
- Payment method diversification
- Multi-currency support

## Support

For issues, feature requests, or questions, please contact the development team or open an issue in the repository.

## License

This iOS application is part of the Earnio creator toolkit. All rights reserved.
