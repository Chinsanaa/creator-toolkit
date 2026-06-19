import SwiftUI

struct SponsorshipsView: View {
    @State private var sponsorships: [Sponsorship] = []
    @State private var myApplications: [SponsorshipApplication] = []
    @State private var selectedTab = 0
    @State private var isLoading = false
    @State private var error: String?
    @State private var selectedSponsorship: Sponsorship?
    private let apiService = APIService.shared

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemBackground).ignoresSafeArea()

                VStack(spacing: 0) {
                    // Header
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Sponsorships")
                            .font(.system(size: 28, weight: .bold))

                        Text("Find and apply to opportunities")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    .padding(.vertical, 16)

                    // Tab Picker
                    Picker("View", selection: $selectedTab) {
                        Text("Available").tag(0)
                        Text("My Applications").tag(1)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)
                    .padding(.vertical, 12)

                    // Content
                    if isLoading {
                        ProgressView()
                    } else if selectedTab == 0 {
                        ScrollView {
                            VStack(spacing: 12) {
                                if sponsorships.isEmpty {
                                    VStack(spacing: 16) {
                                        Image(systemName: "star.circle.fill")
                                            .font(.system(size: 48))
                                            .foregroundColor(.yellow)

                                        Text("No opportunities available")
                                            .font(.system(size: 16, weight: .semibold))

                                        Text("Check back soon for new sponsorship opportunities")
                                            .font(.system(size: 14))
                                            .foregroundColor(.secondary)
                                            .multilineTextAlignment(.center)

                                        Button("Refresh") {
                                            loadSponsorships()
                                        }
                                        .buttonStyle(.bordered)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding(40)
                                } else {
                                    ForEach(sponsorships) { sponsorship in
                                        NavigationLink(destination: SponsorshipDetailView(sponsorship: sponsorship, onApply: applySponsorshipApplication)) {
                                            SponsorshipCard(sponsorship: sponsorship)
                                        }
                                    }
                                }
                            }
                            .padding()
                        }
                    } else {
                        ScrollView {
                            VStack(spacing: 12) {
                                if myApplications.isEmpty {
                                    VStack(spacing: 16) {
                                        Image(systemName: "checkmark.circle.fill")
                                            .font(.system(size: 48))
                                            .foregroundColor(.green)

                                        Text("No applications yet")
                                            .font(.system(size: 16, weight: .semibold))

                                        Text("Apply to sponsorships to see them here")
                                            .font(.system(size: 14))
                                            .foregroundColor(.secondary)
                                            .multilineTextAlignment(.center)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding(40)
                                } else {
                                    ForEach(myApplications) { application in
                                        ApplicationCard(application: application)
                                    }
                                }
                            }
                            .padding()
                        }
                    }
                }

                if let error = error {
                    VStack {
                        Spacer()
                        HStack {
                            Image(systemName: "exclamationmark.circle")
                            Text(error)
                            Button("Dismiss") {
                                self.error = nil
                            }
                        }
                        .padding()
                        .background(Color.red.opacity(0.1))
                        .cornerRadius(8)
                        .padding()
                    }
                }
            }
            .navigationTitle("Sponsorships")
            .navigationBarTitleDisplayMode(.inline)
        }
        .onAppear {
            loadSponsorships()
            loadMyApplications()
        }
    }

    private func loadSponsorships() {
        isLoading = true
        error = nil

        Task {
            do {
                let sponsorships = try await apiService.getSponsorships()
                self.sponsorships = sponsorships
                self.isLoading = false
            } catch {
                self.error = error.localizedDescription
                self.isLoading = false
            }
        }
    }

    private func loadMyApplications() {
        Task {
            do {
                let applications = try await apiService.getMyApplications()
                self.myApplications = applications
            } catch {
                self.error = error.localizedDescription
            }
        }
    }

    private func applySponsorshipApplication(sponsorshipId: String, response: String) {
        Task {
            do {
                let application = try await apiService.applySponsorshipApplication(
                    sponsorshipId: sponsorshipId,
                    response: response
                )
                self.myApplications.append(application)
                self.error = "Application submitted successfully!"
                loadSponsorships()
            } catch {
                self.error = error.localizedDescription
            }
        }
    }
}

struct SponsorshipCard: View {
    let sponsorship: Sponsorship

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(sponsorship.title)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.primary)

                    Text(sponsorship.description)
                        .font(.system(size: 13))
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 4) {
                    Text(EarnioFormat.mnt(sponsorship.amount))
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.green)

                    Text("per creator")
                        .font(.system(size: 11))
                        .foregroundColor(.secondary)
                }
            }

            Divider()

            VStack(spacing: 8) {
                HStack(spacing: 12) {
                    Label("\(formatNumber(sponsorship.minFollowers)) - \(formatNumber(sponsorship.maxFollowers)) followers", systemImage: "person.fill")
                        .font(.system(size: 12))

                    Spacer()
                }

                HStack(spacing: 12) {
                    Label("\(String(format: "%.1f", sponsorship.minEngagementRate))% engagement", systemImage: "chart.bar.fill")
                        .font(.system(size: 12))

                    Spacer()
                }

                HStack(spacing: 12) {
                    Label(sponsorship.contentType, systemImage: "video.fill")
                        .font(.system(size: 12))

                    Spacer()
                }
            }
            .foregroundColor(.secondary)

            HStack {
                if let status = sponsorship.applicationStatus {
                    Label(status.capitalized, systemImage: "checkmark.circle")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(statusColor(status))
                } else {
                    Text("Click to apply")
                        .font(.system(size: 12))
                        .foregroundColor(.blue)
                }
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private func statusColor(_ status: String) -> Color {
        switch status.lowercased() {
        case "approved": return .green
        case "rejected": return .red
        case "pending": return .orange
        case "completed": return .blue
        case "paid": return .green
        default: return .secondary
        }
    }
}

struct SponsorshipDetailView: View {
    let sponsorship: Sponsorship
    let onApply: (String, String) -> Void

    @State private var response = ""
    @State private var hasApplied = false
    @Environment(\.dismiss) var dismiss

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 12) {
                    Text(sponsorship.title)
                        .font(.system(size: 24, weight: .bold))

                    Text(sponsorship.description)
                        .font(.system(size: 16))
                        .foregroundColor(.secondary)
                }

                Divider()

                // Amount
                VStack(alignment: .leading, spacing: 8) {
                    Text("Payment")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.secondary)

                    Text(EarnioFormat.mnt(sponsorship.amount))
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(.green)
                }

                // Requirements
                VStack(alignment: .leading, spacing: 12) {
                    Text("Requirements")
                        .font(.system(size: 16, weight: .semibold))

                    RequirementRow(icon: "person.fill", text: "Followers: \(formatNumber(sponsorship.minFollowers)) - \(formatNumber(sponsorship.maxFollowers))")
                    RequirementRow(icon: "chart.bar.fill", text: "Engagement: \(String(format: "%.1f", sponsorship.minEngagementRate))% or higher")
                    RequirementRow(icon: "video.fill", text: "Content: \(sponsorship.contentType)")
                }

                // Deadlines
                VStack(alignment: .leading, spacing: 12) {
                    Text("Deadlines")
                        .font(.system(size: 16, weight: .semibold))

                    DeadlineRow(label: "Application Deadline", date: sponsorship.applicationDeadline)
                    DeadlineRow(label: "Completion Deadline", date: sponsorship.completionDeadline)
                }

                Spacer(minLength: 30)

                // Response Text Area
                if sponsorship.applicationStatus == nil {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Your Response")
                            .font(.system(size: 14, weight: .semibold))

                        TextEditor(text: $response)
                            .frame(height: 120)
                            .padding(8)
                            .background(Color(.systemGray6))
                            .cornerRadius(8)
                            .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color.gray.opacity(0.3)))
                    }

                    Button(action: {
                        onApply(sponsorship.id, response)
                        hasApplied = true
                    }) {
                        Text("Apply Now")
                            .font(.system(size: 16, weight: .semibold))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }
                } else {
                    VStack(spacing: 12) {
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)

                            Text("You have already applied to this sponsorship")
                                .font(.system(size: 14))
                        }
                        .padding()
                        .background(Color.green.opacity(0.1))
                        .cornerRadius(8)
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Sponsorship Details")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct RequirementRow: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 14))
                .foregroundColor(.blue)
                .frame(width: 24)

            Text(text)
                .font(.system(size: 14))

            Spacer()
        }
    }
}

struct DeadlineRow: View {
    let label: String
    let date: String

    var body: some View {
        HStack {
            Text(label)
                .font(.system(size: 14))
                .foregroundColor(.secondary)

            Spacer()

            Text(formatDate(date))
                .font(.system(size: 14, weight: .semibold))
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

struct ApplicationCard: View {
    let application: SponsorshipApplication

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(application.sponsorship?.title ?? "Sponsorship")
                        .font(.system(size: 16, weight: .semibold))

                    Text("Applied: \(formatDate(application.appliedAt))")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }

                Spacer()

                HStack(spacing: 6) {
                    Image(systemName: statusIcon(application.status))
                    Text(application.status.capitalized)
                }
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(statusColor(application.status))
            }

            if !application.response.isEmpty {
                Divider()

                Text("Your Response")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(.secondary)

                Text(application.response)
                    .font(.system(size: 13))
                    .foregroundColor(.primary)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private func statusColor(_ status: String) -> Color {
        switch status.lowercased() {
        case "approved": return .green
        case "rejected": return .red
        case "pending": return .orange
        case "completed": return .blue
        case "paid": return .green
        default: return .secondary
        }
    }

    private func statusIcon(_ status: String) -> String {
        switch status.lowercased() {
        case "approved": return "checkmark.circle.fill"
        case "rejected": return "xmark.circle.fill"
        case "pending": return "clock.fill"
        case "completed": return "checkmark.circle.fill"
        case "paid": return "checkmark.circle.fill"
        default: return "circle"
        }
    }
}

#Preview {
    SponsorshipsView()
}
