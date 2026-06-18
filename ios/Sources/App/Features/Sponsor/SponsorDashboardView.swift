import SwiftUI

struct SponsorDashboardView: View {
    @State private var dashboardData: SponsorDashboard?
    @State private var isLoading = false
    @State private var error: String?
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

                                Text("Your campaigns overview")
                                    .font(.system(size: 14))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal)

                            // Stats Cards
                            VStack(spacing: 12) {
                                StatsCard(
                                    title: "Active Campaigns",
                                    value: String(data.activeCampaigns),
                                    color: .blue,
                                    icon: "megaphone.fill"
                                )

                                StatsCard(
                                    title: "Total Campaigns",
                                    value: String(data.totalCampaigns),
                                    color: .green,
                                    icon: "list.bullet.clipboard.fill"
                                )

                                StatsCard(
                                    title: "Pending Applications",
                                    value: String(data.pendingApplications),
                                    color: .orange,
                                    icon: "person.badge.plus.fill"
                                )

                                StatsCard(
                                    title: "Active Budget",
                                    value: String(format: "$%.0f", data.activeBudget),
                                    color: .purple,
                                    icon: "dollarsign.circle.fill"
                                )
                            }
                            .padding(.horizontal)

                            // Quick Actions
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Quick Actions")
                                    .font(.system(size: 18, weight: .semibold))
                                    .padding(.horizontal)

                                NavigationLink(destination: CreateCampaignView()) {
                                    HStack(spacing: 12) {
                                        Image(systemName: "plus.circle.fill")
                                            .font(.system(size: 20))
                                            .foregroundColor(.white)

                                        Text("Create New Campaign")
                                            .font(.system(size: 16, weight: .semibold))

                                        Spacer()

                                        Image(systemName: "chevron.right")
                                            .foregroundColor(.white)
                                    }
                                    .padding()
                                    .background(Color.blue)
                                    .foregroundColor(.white)
                                    .cornerRadius(12)
                                }
                                .padding(.horizontal)
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
                }
            }
            .navigationTitle("Dashboard")
            .navigationBarTitleDisplayMode(.inline)
        }
        .onAppear {
            loadDashboard()
        }
    }

    private func loadDashboard() {
        isLoading = true
        error = nil

        Task {
            do {
                let data = try await apiService.getSponsorDashboard()
                self.dashboardData = data
                self.isLoading = false
            } catch {
                self.error = error.localizedDescription
                self.isLoading = false
            }
        }
    }
}

struct StatsCard: View {
    let title: String
    let value: String
    let color: Color
    let icon: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.secondary)

                    Text(value)
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.primary)
                }

                Spacer()

                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(color)
                    .padding(8)
                    .background(color.opacity(0.1))
                    .cornerRadius(8)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

#Preview {
    SponsorDashboardView()
}
