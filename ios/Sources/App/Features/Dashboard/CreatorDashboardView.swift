import SwiftUI

struct CreatorDashboardView: View {
    @State private var dashboardData: DashboardSummary?
    @State private var isLoading = false
    @State private var error: String?
    @EnvironmentObject var authContext: AuthContext
    private let apiService = APIService.shared

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemBackground).ignoresSafeArea()

                if isLoading {
                    ProgressView()
                } else if let data = dashboardData {
                    ScrollView {
                        VStack(spacing: 20) {
                            // Header
                            VStack(alignment: .leading, spacing: 8) {
                                Text("Welcome back!")
                                    .font(.system(size: 28, weight: .bold))
                                    .foregroundColor(.primary)

                                Text("Your earnings overview")
                                    .font(.system(size: 14))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal)

                            // Earnings Cards
                            VStack(spacing: 12) {
                                // Total Earnings
                                EarningsCard(
                                    title: "Total Earnings",
                                    amount: EarnioFormat.mnt(data.totalEarnings),
                                    subtitle: "All time",
                                    color: EarnioTheme.brandBlue
                                )

                                // Monthly Earnings
                                EarningsCard(
                                    title: "This Month",
                                    amount: EarnioFormat.mnt(data.monthlyEarnings),
                                    subtitle: "Month-over-month \(data.monthChange > 0 ? "+" : "")\(String(format: "%.1f", data.monthChange))%",
                                    color: EarnioTheme.successGreen
                                )

                                // Connected Platforms
                                EarningsCard(
                                    title: "Connected Platforms",
                                    amount: String(data.connectedPlatforms),
                                    subtitle: "Active platforms",
                                    color: .purple
                                )
                            }
                            .padding(.horizontal)

                            // Monthly Trend Chart
                            if !data.monthlyTrends.isEmpty {
                                VStack(alignment: .leading, spacing: 12) {
                                    Text("Monthly Trend")
                                        .font(.system(size: 18, weight: .semibold))
                                        .padding(.horizontal)

                                    SimpleLineChart(data: data.monthlyTrends)
                                        .frame(height: 200)
                                }
                            }

                            // Platform Breakdown
                            if !data.platformBreakdown.isEmpty {
                                VStack(alignment: .leading, spacing: 12) {
                                    Text("Platform Breakdown")
                                        .font(.system(size: 18, weight: .semibold))
                                        .padding(.horizontal)

                                    VStack(spacing: 12) {
                                        ForEach(data.platformBreakdown) { platform in
                                            PlatformBreakdownRow(platform: platform)
                                        }
                                    }
                                    .padding()
                                    .background(Color(.systemGray6))
                                    .cornerRadius(12)
                                    .padding(.horizontal)
                                }
                            }

                            Spacer(minLength: 30)
                        }
                        .padding(.vertical)
                    }
                } else if let error = error {
                    VStack(spacing: 12) {
                        Image(systemName: "exclamationmark.circle")
                            .font(.system(size: 44))
                            .foregroundColor(.red)

                        Text("Error loading dashboard")
                            .font(.system(size: 16, weight: .semibold))

                        Text(error)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)

                        Button("Try Again") {
                            loadDashboard()
                        }
                        .buttonStyle(.borderedProminent)
                    }
                    .padding()
                } else {
                    Text("No data")
                        .foregroundColor(.secondary)
                }
            }
            .navigationTitle("Dashboard")
            .navigationBarTitleDisplayMode(.inline)
            .refreshable {
                await loadDashboardAsync()
            }
        }
        .onAppear {
            loadDashboard()
        }
    }

    private func loadDashboard() {
        isLoading = true
        error = nil

        Task {
            await loadDashboardAsync()
        }
    }

    private func loadDashboardAsync() async {
        do {
            let data = try await apiService.getDashboardSummary()
            self.dashboardData = data
            self.isLoading = false
        } catch {
            self.error = error.localizedDescription
            self.isLoading = false
        }
    }
}

struct EarningsCard: View {
    let title: String
    let amount: String
    let subtitle: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.secondary)

                    Text(amount)
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.primary)
                }

                Spacer()

                Image(systemName: "chart.line.uptrend.xyaxis")
                    .font(.system(size: 20))
                    .foregroundColor(color)
                    .padding(8)
                    .background(color.opacity(0.1))
                    .cornerRadius(8)
            }

            Text(subtitle)
                .font(.system(size: 12))
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct PlatformBreakdownRow: View {
    let platform: PlatformEarning

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: platformIcon)
                        .font(.system(size: 16))
                        .foregroundColor(.white)
                        .frame(width: 32, height: 32)
                        .background(platformColor)
                        .cornerRadius(8)

                    VStack(alignment: .leading, spacing: 2) {
                        Text(platform.platform.capitalized)
                            .font(.system(size: 14, weight: .semibold))

                        Text(String(format: "%.1f%%", platform.percentage))
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                    }
                }

                Spacer()

                Text(EarnioFormat.mnt(platform.earnings))
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.primary)
            }

            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color(.systemGray3))

                    RoundedRectangle(cornerRadius: 4)
                        .fill(platformColor)
                        .frame(width: geometry.size.width * (platform.percentage / 100))
                }
            }
            .frame(height: 6)
        }
    }

    private var platformIcon: String {
        switch platform.platform.lowercased() {
        case "tiktok": return "music.note"
        case "youtube": return "play.rectangle.fill"
        case "instagram": return "camera.fill"
        default: return "square.fill"
        }
    }

    private var platformColor: Color {
        switch platform.platform.lowercased() {
        case "tiktok": return Color(red: 0, green: 0, blue: 0)
        case "youtube": return Color.red
        case "instagram": return Color(red: 0.9, green: 0.1, blue: 0.6)
        default: return Color.blue
        }
    }
}

struct SimpleLineChart: View {
    let data: [MonthlyTrend]

    var body: some View {
        if data.isEmpty {
            Text("No data available")
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity)
                .frame(height: 200)
        } else {
            VStack {
                let maxValue = data.map { $0.earnings }.max() ?? 1
                let minValue = data.map { $0.earnings }.min() ?? 0
                let range = maxValue - minValue
                let normalizedData = data.map { ($0.earnings - minValue) / (range > 0 ? range : 1) }

                Canvas { context in
                    let width = 300.0
                    let height = 150.0
                    let spacing = width / CGFloat(data.count - 1)

                    // Draw line
                    var path = Path()
                    for (index, normalized) in normalizedData.enumerated() {
                        let x = CGFloat(index) * spacing
                        let y = height - (normalized * height)

                        if index == 0 {
                            path.move(to: CGPoint(x: x, y: y))
                        } else {
                            path.addLine(to: CGPoint(x: x, y: y))
                        }
                    }

                    context.stroke(
                        path,
                        with: .color(.blue),
                        lineWidth: 2
                    )
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(12)
            }
        }
    }
}

#Preview {
    CreatorDashboardView()
        .environmentObject(AuthContext())
}
