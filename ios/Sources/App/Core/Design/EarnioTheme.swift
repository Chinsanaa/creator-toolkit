import SwiftUI

/// Earnio brand + iOS-native styling. See ios/DESIGN_SYSTEM.md.
enum EarnioTheme {
    static let brandBlue = Color(red: 46 / 255, green: 91 / 255, blue: 255 / 255) // #2E5BFF
    static let sparkCyan = Color(red: 18 / 255, green: 194 / 255, blue: 243 / 255)
    static let successGreen = Color(red: 52 / 255, green: 199 / 255, blue: 89 / 255)
    static let warningOrange = Color(red: 255 / 255, green: 149 / 255, blue: 0 / 255)
    static let dangerRed = Color(red: 255 / 255, green: 59 / 255, blue: 48 / 255)

    static let cardRadius: CGFloat = 12
    static let buttonRadius: CGFloat = 10
    static let minTouchTarget: CGFloat = 44

    static var authGradient: LinearGradient {
        LinearGradient(
            colors: [
                Color(red: 11 / 255, green: 18 / 255, blue: 32 / 255),
                Color(red: 23 / 255, green: 54 / 255, blue: 184 / 255).opacity(0.85),
            ],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}

enum EarnioFormat {
    static func mnt(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.groupingSeparator = ","
        let num = formatter.string(from: NSNumber(value: value)) ?? "\(Int(value))"
        return "₮\(num)"
    }

    static func shortDate(_ iso: String?) -> String {
        guard let iso, !iso.isEmpty else { return "—" }
        let parser = ISO8601DateFormatter()
        parser.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        var date = parser.date(from: iso)
        if date == nil {
            parser.formatOptions = [.withInternetDateTime]
            date = parser.date(from: iso)
        }
        guard let date else { return iso.prefix(10).description }
        let out = DateFormatter()
        out.dateStyle = .medium
        out.timeStyle = .none
        return out.string(from: date)
    }
}

struct EarnioPrimaryButtonStyle: ButtonStyle {
    var isDisabled: Bool = false

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 16, weight: .semibold))
            .frame(maxWidth: .infinity, minHeight: EarnioTheme.minTouchTarget)
            .background(isDisabled ? Color.gray.opacity(0.4) : EarnioTheme.brandBlue)
            .foregroundColor(.white)
            .cornerRadius(EarnioTheme.buttonRadius)
            .opacity(configuration.isPressed ? 0.88 : 1)
    }
}

struct EarnioSecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 15, weight: .semibold))
            .frame(maxWidth: .infinity, minHeight: EarnioTheme.minTouchTarget)
            .background(Color(.secondarySystemBackground))
            .foregroundColor(EarnioTheme.brandBlue)
            .cornerRadius(EarnioTheme.buttonRadius)
            .opacity(configuration.isPressed ? 0.88 : 1)
    }
}

struct EarnioStatCard: View {
    let title: String
    let value: String
    let subtitle: String?
    let tint: Color

    init(title: String, value: String, subtitle: String? = nil, tint: Color = EarnioTheme.brandBlue) {
        self.title = title
        self.value = value
        self.subtitle = subtitle
        self.tint = tint
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.footnote)
                .foregroundStyle(.secondary)
            Text(value)
                .font(.title2.bold())
                .foregroundStyle(tint)
            if let subtitle {
                Text(subtitle)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(EarnioTheme.cardRadius)
    }
}

struct EarnioDemoBanner: View {
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "play.circle.fill")
            Text("Demo mode — sample data, no server required")
                .font(.caption.weight(.semibold))
        }
        .foregroundStyle(.white)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 8)
        .background(EarnioTheme.warningOrange)
    }
}
