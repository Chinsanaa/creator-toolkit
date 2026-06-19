import Foundation

enum MockData {
    static let creator = User(
        id: "demo-creator-1",
        email: "creator@demo.earnio.app",
        name: "Bold Erdene",
        username: "bold_erdene",
        userType: "creator"
    )

    static let sponsor = User(
        id: "demo-sponsor-1",
        email: "brand@demo.earnio.app",
        name: "Maybee Pop&Joy",
        username: "maybee_popjoy",
        userType: "sponsor"
    )

    static let dashboard = DashboardSummary(
        totalEarningsMnt: 3_240_000,
        earningsThisMonth: 820_000,
        monthOverMonthChange: 12.4,
        connectedPlatforms: 3,
        byPlatform: [
            PlatformEarning(platform: "tiktok", totalMnt: 1_500_000, share: 46),
            PlatformEarning(platform: "youtube", totalMnt: 980_000, share: 30),
            PlatformEarning(platform: "instagram", totalMnt: 760_000, share: 24),
        ],
        monthlyTrend: [
            MonthlyTrendPoint(month: "2026-01", label: "Jan", amountMnt: 420_000),
            MonthlyTrendPoint(month: "2026-02", label: "Feb", amountMnt: 510_000),
            MonthlyTrendPoint(month: "2026-03", label: "Mar", amountMnt: 680_000),
            MonthlyTrendPoint(month: "2026-04", label: "Apr", amountMnt: 720_000),
            MonthlyTrendPoint(month: "2026-05", label: "May", amountMnt: 820_000),
            MonthlyTrendPoint(month: "2026-06", label: "Jun", amountMnt: 820_000),
        ]
    )

    static let platforms: [PlatformAccount] = [
        PlatformAccount(
            id: "p1",
            platform: "tiktok",
            platformUsername: "@bold_erdene",
            followerCount: 48_200,
            status: "connected",
            lastSyncedAt: "2026-06-18T10:00:00Z"
        ),
        PlatformAccount(
            id: "p2",
            platform: "youtube",
            platformUsername: "@bold_erdene",
            followerCount: 12_400,
            status: "connected",
            lastSyncedAt: "2026-06-17T15:30:00Z"
        ),
        PlatformAccount(
            id: "p3",
            platform: "instagram",
            platformUsername: "@bold_erdene",
            followerCount: 9_800,
            status: "connected",
            lastSyncedAt: "2026-06-16T09:00:00Z"
        ),
    ]

    static let wallet = WalletSummary(
        availableBalanceMnt: 656_000,
        pendingPayoutMnt: 120_000,
        totalEarnedMnt: 3_240_000,
        totalFeesMnt: 648_000,
        totalPaidOutMnt: 1_816_000,
        platformFeeRate: 0.2,
        minPayoutMnt: 50_000
    )

    static let bankAccounts: [BankAccount] = [
        BankAccount(
            id: "b1",
            accountHolderName: "Bold Erdene",
            accountNumber: "•••• 4521",
            bankName: "Khan Bank",
            isDefault: true,
            verified: true
        ),
    ]

    static let transactions: [WalletTransaction] = [
        WalletTransaction(
            id: "t1",
            type: "sponsorship_earned",
            amountMnt: 400_000,
            status: "completed",
            description: "Maybee Pop&Joy summer campaign",
            createdAt: "2026-06-10T12:00:00Z"
        ),
        WalletTransaction(
            id: "t2",
            type: "platform_fee",
            amountMnt: 80_000,
            status: "completed",
            description: "Platform fee (20%)",
            createdAt: "2026-06-10T12:01:00Z"
        ),
        WalletTransaction(
            id: "t3",
            type: "payout",
            amountMnt: 120_000,
            status: "pending",
            description: "Payout to Khan Bank",
            createdAt: "2026-06-15T09:00:00Z"
        ),
    ]

    static let sponsorships: [SponsorshipListing] = [
        SponsorshipListing(
            id: "s1",
            title: "Maybee Pop&Joy — Summer Vibes",
            description: "Film a 30s TikTok showing our new sparkling drink at a Gen Z hangout spot in Ulaanbaatar.",
            paymentAmountMnt: 500_000,
            contentType: "tiktok_video",
            requiredFollowersMin: 5_000,
            requiredFollowersMax: 100_000,
            engagementRateMin: 3.0,
            deadlineApply: "2026-07-01T00:00:00Z",
            deadlineComplete: "2026-07-15T00:00:00Z",
            sponsorUserId: "demo-sponsor-1",
            applicationCount: 12,
            applicationStatus: nil
        ),
        SponsorshipListing(
            id: "s2",
            title: "Local Streetwear — Drop Day",
            description: "YouTube Short or Reels unboxing our limited drop. Must mention MNT pricing.",
            paymentAmountMnt: 350_000,
            contentType: "youtube_short",
            requiredFollowersMin: 3_000,
            requiredFollowersMax: 50_000,
            engagementRateMin: 2.5,
            deadlineApply: "2026-06-28T00:00:00Z",
            deadlineComplete: "2026-07-10T00:00:00Z",
            sponsorUserId: "demo-sponsor-2",
            applicationCount: 5,
            applicationStatus: "pending"
        ),
    ]

    static let myApplications: [SponsorshipApplication] = [
        SponsorshipApplication(
            id: "a1",
            sponsorshipId: "s2",
            status: "pending",
            responseText: "I shoot streetwear content weekly — happy to feature the drop.",
            appliedAt: "2026-06-12T08:00:00Z",
            sponsorship: sponsorships[1]
        ),
    ]

    static let sponsorDashboard = SponsorDashboardStats(
        activeCampaigns: 2,
        totalCampaigns: 3,
        pendingApplications: 4,
        totalApplications: 11,
        totalBudgetMnt: 1_200_000
    )

    static let campaigns: [Campaign] = [
        Campaign(
            id: "c1",
            title: "Maybee Pop&Joy — Summer Vibes",
            description: "30s TikTok at a Gen Z hangout.",
            paymentAmountMnt: 500_000,
            contentType: "tiktok_video",
            requiredFollowersMin: 5_000,
            requiredFollowersMax: 100_000,
            engagementRateMin: 3.0,
            status: "active",
            deadlineApply: "2026-07-01T00:00:00Z",
            deadlineComplete: "2026-07-15T00:00:00Z",
            createdAt: "2026-06-01T00:00:00Z",
            applicationCount: 12,
            pendingCount: 4
        ),
        Campaign(
            id: "c2",
            title: "Winter Teaser (Draft)",
            description: "Teaser campaign for Q4.",
            paymentAmountMnt: 300_000,
            contentType: "instagram_reel",
            requiredFollowersMin: 2_000,
            requiredFollowersMax: 40_000,
            engagementRateMin: 2.0,
            status: "closed",
            deadlineApply: "2026-05-01T00:00:00Z",
            deadlineComplete: "2026-05-20T00:00:00Z",
            createdAt: "2026-04-10T00:00:00Z",
            applicationCount: 8,
            pendingCount: 0
        ),
    ]

    static let campaignApplications: [CampaignApplication] = [
        CampaignApplication(
            id: "ca1",
            sponsorshipId: "c1",
            status: "pending",
            responseText: "I create food & drink TikToks — 48K followers.",
            sponsorNotes: nil,
            appliedAt: "2026-06-14T11:00:00Z",
            creator: CampaignApplicationCreator(id: "demo-creator-1", name: "Bold Erdene", username: "bold_erdene")
        ),
        CampaignApplication(
            id: "ca2",
            sponsorshipId: "c1",
            status: "approved",
            responseText: "UGC specialist with strong engagement.",
            sponsorNotes: "Great fit",
            appliedAt: "2026-06-13T09:00:00Z",
            creator: CampaignApplicationCreator(id: "cr2", name: "Sarnai", username: "sarnai_creates")
        ),
    ]

    static let notifications: [AppNotification] = [
        AppNotification(
            id: "n1",
            type: "application_decision",
            title: "Application approved",
            body: "Your pitch for Maybee Pop&Joy was approved.",
            readAt: nil,
            createdAt: "2026-06-15T10:00:00Z"
        ),
        AppNotification(
            id: "n2",
            type: "earnings_synced",
            title: "TikTok sync complete",
            body: "New earnings added to your dashboard.",
            readAt: "2026-06-14T08:00:00Z",
            createdAt: "2026-06-14T08:00:00Z"
        ),
    ]
}
