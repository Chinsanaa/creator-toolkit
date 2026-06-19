import SwiftUI

struct CampaignsView: View {
    @State private var campaigns: [Campaign] = []
    @State private var selectedStatus = "all"
    @State private var isLoading = false
    @State private var error: String?
    @State private var selectedCampaign: Campaign?
    private let apiService = APIService.shared

    var filteredCampaigns: [Campaign] {
        if selectedStatus == "all" {
            return campaigns
        }
        return campaigns.filter { $0.status == selectedStatus }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemBackground).ignoresSafeArea()

                VStack(spacing: 0) {
                    // Header
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Campaigns")
                            .font(.system(size: 28, weight: .bold))

                        Text("Manage your campaigns")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    .padding(.vertical, 16)

                    // Status Filter
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            FilterChip(
                                title: "All",
                                isSelected: selectedStatus == "all",
                                action: { selectedStatus = "all" }
                            )

                            FilterChip(
                                title: "Published",
                                isSelected: selectedStatus == "published",
                                action: { selectedStatus = "published" }
                            )

                            FilterChip(
                                title: "Draft",
                                isSelected: selectedStatus == "draft",
                                action: { selectedStatus = "draft" }
                            )

                            FilterChip(
                                title: "Closed",
                                isSelected: selectedStatus == "closed",
                                action: { selectedStatus = "closed" }
                            )
                        }
                        .padding(.horizontal)
                    }
                    .padding(.vertical, 12)

                    // Content
                    if isLoading {
                        ProgressView()
                    } else if filteredCampaigns.isEmpty {
                        VStack(spacing: 16) {
                            Image(systemName: "megaphone.fill")
                                .font(.system(size: 48))
                                .foregroundColor(.gray)

                            Text("No campaigns")
                                .font(.system(size: 16, weight: .semibold))

                            Text("Create your first campaign to get started")
                                .font(.system(size: 14))
                                .foregroundColor(.secondary)

                            NavigationLink(destination: CreateCampaignView()) {
                                Text("Create Campaign")
                                    .buttonStyle(.bordered)
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .padding(40)
                    } else {
                        ScrollView {
                            VStack(spacing: 12) {
                                ForEach(filteredCampaigns) { campaign in
                                    NavigationLink(destination: CampaignDetailView(campaign: campaign, onStatusChange: loadCampaigns)) {
                                        CampaignListCard(campaign: campaign)
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
            .navigationTitle("Campaigns")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    NavigationLink(destination: CreateCampaignView()) {
                        Image(systemName: "plus.circle.fill")
                            .foregroundColor(.blue)
                    }
                }
            }
        }
        .onAppear {
            loadCampaigns()
        }
    }

    private func loadCampaigns() {
        isLoading = true
        error = nil

        Task {
            do {
                let campaigns = try await apiService.getCampaigns()
                self.campaigns = campaigns
                self.isLoading = false
            } catch {
                self.error = error.localizedDescription
                self.isLoading = false
            }
        }
    }
}

struct FilterChip: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 13, weight: .medium))
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.blue : Color(.systemGray6))
                .foregroundColor(isSelected ? .white : .primary)
                .cornerRadius(20)
        }
    }
}

struct CampaignListCard: View {
    let campaign: Campaign

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(campaign.title)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.primary)

                    Text(campaign.description)
                        .font(.system(size: 13))
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 4) {
                    HStack(spacing: 4) {
                        Image(systemName: "circle.fill")
                            .font(.system(size: 6))
                            .foregroundColor(statusColor(campaign.status))

                        Text(campaign.status.capitalized)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(statusColor(campaign.status))
                    }

                    Text(EarnioFormat.mnt(Double(campaign.amountPerCreator)) + "/creator")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
            }

            Divider()

            HStack(spacing: 12) {
                Label("\(campaign.applications?.count ?? 0) applications", systemImage: "person.fill")
                    .font(.system(size: 12))

                Spacer()

                Label(campaign.contentType, systemImage: "video.fill")
                    .font(.system(size: 12))
            }
            .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private func statusColor(_ status: String) -> Color {
        switch status.lowercased() {
        case "published": return .green
        case "draft": return .gray
        case "closed": return .red
        default: return .blue
        }
    }
}

struct CreateCampaignView: View {
    @State private var title = ""
    @State private var description = ""
    @State private var amountPerCreator = ""
    @State private var contentType = ""
    @State private var minFollowers = ""
    @State private var maxFollowers = ""
    @State private var minEngagementRate = ""
    @State private var applicationDeadline = Date()
    @State private var completionDeadline = Date()
    @State private var isLoading = false
    @State private var error = ""
    @State private var success = false
    @Environment(\.dismiss) var dismiss
    private let apiService = APIService.shared

    var body: some View {
        Form {
            Section("Campaign Details") {
                TextField("Campaign Title", text: $title)
                TextEditor(text: $description)
                    .frame(height: 100)
                TextField("Content Type (e.g., TikTok Video)", text: $contentType)
            }

            Section("Payment") {
                TextField("Amount per creator (MNT)", text: $amountPerCreator)
                    .keyboardType(.decimalPad)
            }

            Section("Creator Requirements") {
                TextField("Minimum Followers", text: $minFollowers)
                    .keyboardType(.numberPad)

                TextField("Maximum Followers", text: $maxFollowers)
                    .keyboardType(.numberPad)

                TextField("Minimum Engagement Rate (%)", text: $minEngagementRate)
                    .keyboardType(.decimalPad)
            }

            Section("Deadlines") {
                DatePicker("Application Deadline", selection: $applicationDeadline, displayedComponents: [.date, .hourAndMinute])

                DatePicker("Completion Deadline", selection: $completionDeadline, displayedComponents: [.date, .hourAndMinute])
            }

            if !error.isEmpty {
                Section {
                    Text(error)
                        .foregroundColor(.red)
                        .font(.system(size: 13))
                }
            }

            Section {
                Button("Create Campaign") {
                    createCampaign()
                }
                .disabled(isLoading || title.isEmpty || description.isEmpty)
                .frame(maxWidth: .infinity, alignment: .center)
            }
        }
        .navigationTitle("Create Campaign")
        .navigationBarTitleDisplayMode(.inline)
        .disabled(isLoading)
        .alert("Success", isPresented: $success) {
            Button("OK") {
                dismiss()
            }
        } message: {
            Text("Campaign created successfully!")
        }
    }

    private func createCampaign() {
        guard let amount = Double(amountPerCreator),
              let minFollowers = Int(minFollowers),
              let maxFollowers = Int(maxFollowers),
              let minEngagement = Double(minEngagementRate) else {
            error = "Please fill all fields with valid values"
            return
        }

        isLoading = true

        Task {
            do {
                let formatter = ISO8601DateFormatter()
                _ = try await apiService.createCampaign(
                    title: title,
                    description: description,
                    amountPerCreator: amount,
                    contentType: contentType,
                    minFollowers: minFollowers,
                    maxFollowers: maxFollowers,
                    minEngagementRate: minEngagement,
                    applicationDeadline: formatter.string(from: applicationDeadline),
                    completionDeadline: formatter.string(from: completionDeadline)
                )
                self.success = true
                self.isLoading = false
            } catch {
                self.error = error.localizedDescription
                self.isLoading = false
            }
        }
    }
}

struct CampaignDetailView: View {
    let campaign: Campaign
    let onStatusChange: () -> Void
    @State private var isLoading = false
    @State private var showApplications = false
    @Environment(\.dismiss) var dismiss
    private let apiService = APIService.shared

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Title and Status
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        VStack(alignment: .leading, spacing: 8) {
                            Text(campaign.title)
                                .font(.system(size: 24, weight: .bold))

                            HStack(spacing: 6) {
                                Image(systemName: "circle.fill")
                                    .font(.system(size: 6))
                                    .foregroundColor(statusColor(campaign.status))

                                Text(campaign.status.uppercased())
                                    .font(.system(size: 12, weight: .semibold))
                                    .foregroundColor(statusColor(campaign.status))
                            }
                        }

                        Spacer()
                    }
                }

                // Description
                VStack(alignment: .leading, spacing: 8) {
                    Text("Description")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.secondary)

                    Text(campaign.description)
                        .font(.system(size: 14))
                }

                Divider()

                // Payment and Requirements
                HStack(spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Payment")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.secondary)

                        Text(EarnioFormat.mnt(campaign.amountPerCreator))
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(.green)
                    }

                    Spacer()

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Applications")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.secondary)

                        Text("\(campaign.applications?.count ?? 0)")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(.blue)
                    }
                }

                // Requirements
                VStack(alignment: .leading, spacing: 12) {
                    Text("Requirements")
                        .font(.system(size: 14, weight: .semibold))

                    RequirementItem(label: "Followers", value: "\(campaign.minFollowers) - \(campaign.maxFollowers)")
                    RequirementItem(label: "Engagement Rate", value: "\(String(format: "%.1f", campaign.minEngagementRate))%+")
                    RequirementItem(label: "Content Type", value: campaign.contentType)
                }

                // Deadlines
                VStack(alignment: .leading, spacing: 12) {
                    Text("Deadlines")
                        .font(.system(size: 14, weight: .semibold))

                    DeadlineItem(label: "Applications Close", date: campaign.applicationDeadline)
                    DeadlineItem(label: "Content Due", date: campaign.completionDeadline)
                }

                // Applications Button
                if (campaign.applicationCount ?? 0) > 0 {
                    NavigationLink(destination: CampaignApplicationsView(campaign: campaign)) {
                        HStack {
                            Image(systemName: "person.fill")
                            Text("View \(campaign.applicationCount ?? 0) Applications")
                            Spacer()
                            Image(systemName: "chevron.right")
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue.opacity(0.1))
                        .foregroundColor(.blue)
                        .cornerRadius(8)
                    }
                }

                // Action Buttons
                HStack(spacing: 12) {
                    if campaign.status == "active" {
                        Button(action: { closeCampaign() }) {
                            Label("Close", systemImage: "xmark.circle.fill")
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(EarnioTheme.dangerRed)
                                .foregroundColor(.white)
                                .cornerRadius(8)
                        }
                    }

                    Button(role: .destructive, action: {
                        deleteCampaign()
                    }) {
                        Label("Delete", systemImage: "trash.fill")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.red.opacity(0.1))
                            .foregroundColor(.red)
                            .cornerRadius(8)
                    }
                }

                Spacer()
            }
            .padding()
        }
        .navigationTitle("Campaign Details")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func publishCampaign() {
        isLoading = true
        Task {
            do {
                _ = try await apiService.updateCampaignStatus(id: campaign.id, status: "closed")
                onStatusChange()
                dismiss()
            } catch {
                isLoading = false
            }
        }
    }

    private func closeCampaign() {
        isLoading = true
        Task {
            do {
                _ = try await apiService.updateCampaignStatus(id: campaign.id, status: "closed")
                onStatusChange()
                dismiss()
            } catch {
                isLoading = false
            }
        }
    }

    private func deleteCampaign() {
        isLoading = true
        Task {
            do {
                try await apiService.deleteCampaign(id: campaign.id)
                onStatusChange()
                dismiss()
            } catch {
                isLoading = false
            }
        }
    }

    private func statusColor(_ status: String) -> Color {
        switch status.lowercased() {
        case "published": return .green
        case "draft": return .gray
        case "closed": return .red
        default: return .blue
        }
    }
}

struct RequirementItem: View {
    let label: String
    let value: String

    var body: some View {
        HStack {
            Text(label)
                .font(.system(size: 13))
                .foregroundColor(.secondary)

            Spacer()

            Text(value)
                .font(.system(size: 13, weight: .semibold))
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

struct DeadlineItem: View {
    let label: String
    let date: String

    var body: some View {
        HStack {
            Text(label)
                .font(.system(size: 13))
                .foregroundColor(.secondary)

            Spacer()

            Text(formatDate(date))
                .font(.system(size: 13, weight: .semibold))
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

struct CampaignApplicationsView: View {
    let campaign: Campaign
    @State private var applications: [CampaignApplication] = []
    @State private var isLoading = false
    @State private var error: String?
    private let apiService = APIService.shared

    var body: some View {
        ScrollView {
            VStack(spacing: 12) {
                if isLoading {
                    ProgressView()
                } else if applications.isEmpty {
                    Text("No applications yet")
                        .foregroundStyle(.secondary)
                } else {
                    ForEach(applications) { application in
                        ApplicationDetailCard(application: application) { status in
                            updateStatus(applicationId: application.id, status: status)
                        }
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Applications")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear { loadApplications() }
    }

    private func loadApplications() {
        isLoading = true
        Task {
            do {
                let detail = try await apiService.getCampaignDetail(id: campaign.id)
                applications = detail.applications
                isLoading = false
            } catch {
                error = error.localizedDescription
                isLoading = false
            }
        }
    }

    private func updateStatus(applicationId: String, status: String) {
        Task {
            do {
                _ = try await apiService.updateApplicationStatus(applicationId: applicationId, status: status, notes: nil)
                loadApplications()
            } catch {
                self.error = error.localizedDescription
            }
        }
    }
}

struct ApplicationDetailCard: View {
    let application: CampaignApplication
    var onDecision: ((String) -> Void)?

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(application.creatorName)
                        .font(.system(size: 16, weight: .semibold))

                    Text("@\(application.creatorHandle)")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }

                Spacer()

                Text(application.status.capitalized)
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(statusColor(application.status))
            }

            if !application.response.isEmpty {
                Text(application.response)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            if application.status == "pending", let onDecision {
                HStack(spacing: 12) {
                    Button("Approve") { onDecision("approved") }
                        .buttonStyle(EarnioPrimaryButtonStyle())
                    Button("Reject") { onDecision("rejected") }
                        .buttonStyle(EarnioSecondaryButtonStyle())
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
        default: return .blue
        }
    }
}

#Preview {
    CampaignsView()
}
