import SwiftUI

struct WalletView: View {
    @State private var walletData: WalletSummary?
    @State private var bankAccounts: [BankAccount] = []
    @State private var transactions: [Transaction] = []
    @State private var isLoading = false
    @State private var error: String?
    @State private var showPayoutSheet = false
    @State private var showAddBankAccount = false
    private let apiService = APIService.shared

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemBackground).ignoresSafeArea()

                if isLoading && walletData == nil {
                    ProgressView()
                } else if let wallet = walletData {
                    ScrollView {
                        VStack(spacing: 20) {
                            // Header
                            VStack(alignment: .leading, spacing: 8) {
                                Text("Wallet")
                                    .font(.system(size: 28, weight: .bold))

                                Text("Manage your earnings")
                                    .font(.system(size: 14))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal)

                            // Balance Cards
                            VStack(spacing: 12) {
                                WalletBalanceCard(
                                    title: "Available Balance",
                                    amount: EarnioFormat.mnt(wallet.availableBalance),
                                    color: EarnioTheme.successGreen,
                                    icon: "banknote.fill"
                                )

                                WalletBalanceCard(
                                    title: "Pending Payouts",
                                    amount: EarnioFormat.mnt(wallet.pendingPayouts),
                                    color: EarnioTheme.warningOrange,
                                    icon: "clock.fill"
                                )

                                WalletBalanceCard(
                                    title: "Total Earned",
                                    amount: EarnioFormat.mnt(wallet.totalEarned),
                                    color: EarnioTheme.brandBlue,
                                    icon: "chart.line.uptrend.xyaxis"
                                )
                            }
                            .padding(.horizontal)

                            // Request Payout Button
                            if !bankAccounts.isEmpty {
                                Button(action: {
                                    showPayoutSheet = true
                                }) {
                                    Label("Request Payout", systemImage: "arrow.up.right")
                                        .font(.system(size: 16, weight: .semibold))
                                }
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(Color.blue)
                                .foregroundColor(.white)
                                .cornerRadius(8)
                                .padding(.horizontal)
                            }

                            // Bank Accounts Section
                            VStack(alignment: .leading, spacing: 12) {
                                HStack {
                                    Text("Bank Accounts")
                                        .font(.system(size: 18, weight: .semibold))

                                    Spacer()

                                    Button(action: {
                                        showAddBankAccount = true
                                    }) {
                                        Image(systemName: "plus.circle.fill")
                                            .foregroundColor(.blue)
                                    }
                                }
                                .padding(.horizontal)

                                if bankAccounts.isEmpty {
                                    VStack(spacing: 12) {
                                        Image(systemName: "banknote.fill")
                                            .font(.system(size: 32))
                                            .foregroundColor(.gray)

                                        Text("No bank accounts")
                                            .font(.system(size: 14, weight: .semibold))

                                        Text("Add a bank account to request payouts")
                                            .font(.system(size: 12))
                                            .foregroundColor(.secondary)

                                        Button("Add Bank Account") {
                                            showAddBankAccount = true
                                        }
                                        .buttonStyle(.bordered)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding(20)
                                } else {
                                    VStack(spacing: 12) {
                                        ForEach(bankAccounts) { account in
                                            BankAccountCard(account: account)
                                        }
                                    }
                                    .padding(.horizontal)
                                }
                            }

                            // Transactions Section
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Recent Transactions")
                                    .font(.system(size: 18, weight: .semibold))
                                    .padding(.horizontal)

                                if transactions.isEmpty {
                                    Text("No transactions yet")
                                        .font(.system(size: 14))
                                        .foregroundColor(.secondary)
                                        .frame(maxWidth: .infinity, alignment: .center)
                                        .padding(20)
                                } else {
                                    VStack(spacing: 8) {
                                        ForEach(transactions.prefix(10)) { transaction in
                                            TransactionRow(transaction: transaction)
                                        }
                                    }
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

                        Text("Error loading wallet")
                            .font(.system(size: 16, weight: .semibold))

                        Text(error)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)

                        Button("Try Again") {
                            loadWallet()
                        }
                        .buttonStyle(.borderedProminent)
                    }
                    .padding()
                }
            }
            .navigationTitle("Wallet")
            .navigationBarTitleDisplayMode(.inline)
            .refreshable {
                await loadWalletAsync()
            }
            .sheet(isPresented: $showPayoutSheet) {
                PayoutRequestSheet(isPresented: $showPayoutSheet, bankAccounts: bankAccounts, onSubmit: requestPayout)
            }
            .sheet(isPresented: $showAddBankAccount) {
                AddBankAccountSheet(isPresented: $showAddBankAccount, onAdd: addBankAccount)
            }
        }
        .onAppear {
            loadWallet()
        }
    }

    private func loadWallet() {
        isLoading = true
        error = nil

        Task {
            await loadWalletAsync()
        }
    }

    private func loadWalletAsync() async {
        do {
            async let walletTask = apiService.getWalletSummary()
            async let accountsTask = apiService.getBankAccounts()
            async let transactionsTask = apiService.getTransactions()

            let (wallet, accounts, txns) = try await (walletTask, accountsTask, transactionsTask)

            self.walletData = wallet
            self.bankAccounts = accounts
            self.transactions = txns
            self.isLoading = false
        } catch {
            self.error = error.localizedDescription
            self.isLoading = false
        }
    }

    private func addBankAccount(name: String, accountNumber: String, bankName: String) {
        Task {
            do {
                let account = try await apiService.addBankAccount(
                    accountHolderName: name,
                    accountNumber: accountNumber,
                    bankName: bankName
                )
                self.bankAccounts.append(account)
                self.error = "Bank account added successfully"
            } catch {
                self.error = error.localizedDescription
            }
        }
    }

    private func requestPayout(bankAccountId: String, amount: Double) {
        Task {
            do {
                _ = try await apiService.requestPayout(bankAccountId: bankAccountId, amountMnt: Int(amount))
                await loadWalletAsync()
                self.error = "Payout request submitted"
            } catch {
                self.error = error.localizedDescription
            }
        }
    }
}

struct WalletBalanceCard: View {
    let title: String
    let amount: String
    let color: Color
    let icon: String

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(.secondary)

                Text(amount)
                    .font(.system(size: 22, weight: .bold))
            }

            Spacer()

            Image(systemName: icon)
                .font(.system(size: 24))
                .foregroundColor(color)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct BankAccountCard: View {
    let account: BankAccount

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(account.accountHolderName)
                        .font(.system(size: 16, weight: .semibold))

                    Text(account.bankName)
                        .font(.system(size: 13))
                        .foregroundColor(.secondary)
                }

                Spacer()

                if account.isDefault {
                    Label("Default", systemImage: "checkmark.circle.fill")
                        .font(.system(size: 12))
                        .foregroundColor(.green)
                }
            }

            HStack {
                Text("•••• •••• •••• \(account.accountNumber.suffix(4))")
                    .font(.system(size: 13, weight: .monospaced))
                    .foregroundColor(.secondary)

                Spacer()

                Text(account.verificationStatus.capitalized)
                    .font(.system(size: 11))
                    .foregroundColor(account.verificationStatus == "verified" ? .green : .orange)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct TransactionRow: View {
    let transaction: Transaction

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(transaction.type.replacingOccurrences(of: "_", with: " ").capitalized)
                    .font(.system(size: 14, weight: .semibold))

                Text(transaction.description)
                    .font(.system(size: 12))
                    .foregroundColor(.secondary)
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 4) {
                Text(EarnioFormat.mnt(transaction.amount))
                    .font(.system(size: 14, weight: .semibold))

                Text(transaction.status.capitalized)
                    .font(.system(size: 11))
                    .foregroundColor(statusColor(transaction.status))
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private func statusColor(_ status: String) -> Color {
        switch status.lowercased() {
        case "completed": return .green
        case "pending": return .orange
        case "failed": return .red
        default: return .secondary
        }
    }
}

struct PayoutRequestSheet: View {
    @Binding var isPresented: Bool
    let bankAccounts: [BankAccount]
    let onSubmit: (String, Double) -> Void

    @State private var selectedAccountId: String = ""
    @State private var amount: String = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Bank Account") {
                    Picker("Account", selection: $selectedAccountId) {
                        ForEach(bankAccounts) { account in
                            Text("\(account.accountHolderName) - \(account.bankName)").tag(account.id)
                        }
                    }
                }

                Section("Amount") {
                    TextField("Amount in MNT (min ₮50,000)", text: $amount)
                        .keyboardType(.decimalPad)
                }

                Section {
                    Button("Request Payout") {
                        if let amountValue = Double(amount), !selectedAccountId.isEmpty {
                            onSubmit(selectedAccountId, amountValue)
                            isPresented = false
                        }
                    }
                    .disabled(amount.isEmpty || selectedAccountId.isEmpty)
                    .frame(maxWidth: .infinity, alignment: .center)
                }
            }
            .navigationTitle("Request Payout")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        isPresented = false
                    }
                }
            }
        }
    }
}

struct AddBankAccountSheet: View {
    @Binding var isPresented: Bool
    let onAdd: (String, String, String) -> Void

    @State private var accountHolderName = ""
    @State private var accountNumber = ""
    @State private var bankName = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Account Holder Name") {
                    TextField("Full name", text: $accountHolderName)
                }

                Section("Bank Name") {
                    TextField("Bank name", text: $bankName)
                }

                Section("Account Number") {
                    TextField("Account number", text: $accountNumber)
                        .keyboardType(.numberPad)
                }

                Section {
                    Button("Add Account") {
                        onAdd(accountHolderName, accountNumber, bankName)
                        isPresented = false
                    }
                    .disabled(accountHolderName.isEmpty || accountNumber.isEmpty || bankName.isEmpty)
                    .frame(maxWidth: .infinity, alignment: .center)
                }
            }
            .navigationTitle("Add Bank Account")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        isPresented = false
                    }
                }
            }
        }
    }
}

#Preview {
    WalletView()
}
