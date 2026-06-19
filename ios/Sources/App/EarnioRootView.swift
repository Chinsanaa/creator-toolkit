import SwiftUI

/// Root view for the Earnio iOS app (used by EarnioNative app target and previews).
public struct EarnioRootView: View {
    @EnvironmentObject var authContext: AuthContext

    public init() {}

    public var body: some View {
        Group {
            if authContext.isAuthenticated {
                if authContext.user?.isCreator == true {
                    CreatorTabView()
                } else {
                    SponsorTabView()
                }
            } else {
                AuthView()
            }
        }
    }
}

public struct AuthenticatedShell<Content: View>: View {
    @EnvironmentObject var authContext: AuthContext
    @ViewBuilder let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        VStack(spacing: 0) {
            if authContext.isDemoMode {
                EarnioDemoBanner()
            }
            content()
        }
    }
}

#if DEBUG
struct EarnioRootView_Previews: PreviewProvider {
    static var previews: some View {
        EarnioRootView().environmentObject(AuthContext())
    }
}
#endif
