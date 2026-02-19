import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Download,
  ChevronDown,
  ChevronUp,
  Clock,
  Check,
  X,
  Eye,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";
type PaymentStatus = "pending" | "completed" | "failed";

interface Installment {
  id: string;
  name: string;
  amount: number;
  paid: number;
  dueDate: string;
  isPaid: boolean;
}

interface Transaction {
  id: string;
  date: string;
  transactionId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
}

interface FeeState {
  totalPayable: number;
  totalPaid: number;
  scholarship: number;
  lateFee: number;
  dueDate: "2026-02-28";
}

const initialInstallments: Installment[] = [
  {
    id: "inst-1",
    name: "Semester 1 Tuition",
    amount: 75000,
    paid: 75000,
    dueDate: "2026-01-31",
    isPaid: true,
  },
  {
    id: "inst-2",
    name: "Hostel Fee",
    amount: 35000,
    paid: 35000,
    dueDate: "2026-01-31",
    isPaid: true,
  },
  {
    id: "inst-3",
    name: "Mess Fee",
    amount: 12000,
    paid: 0,
    dueDate: "2026-02-28",
    isPaid: false,
  },
  {
    id: "inst-4",
    name: "Security Deposit",
    amount: 5000,
    paid: 0,
    dueDate: "2026-02-28",
    isPaid: false,
  },
];

const initialTransactions: Transaction[] = [
  {
    id: "txn-1",
    date: "2026-02-15",
    transactionId: "TXN20260215001",
    amount: 75000,
    method: "Net Banking",
    status: "completed",
  },
  {
    id: "txn-2",
    date: "2026-02-10",
    transactionId: "TXN20260210001",
    amount: 35000,
    method: "Credit Card",
    status: "completed",
  },
];

const FeePaymentDashboard = () => {
  const today = new Date("2026-02-20");
  const [installments, setInstallments] = useState<Installment[]>(initialInstallments);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [expandedInstallment, setExpandedInstallment] = useState<string | null>(null);
  const [feeState, setFeeState] = useState<FeeState>({
    totalPayable: 127000,
    totalPaid: 110000,
    scholarship: 0,
    lateFee: 0,
    dueDate: "2026-02-28",
  });

  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
  const [successTxnId, setSuccessTxnId] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterStatus, setFilterStatus] = useState<"all" | PaymentStatus>("all");
  const [previewReceipt, setPreviewReceipt] = useState<Transaction | null>(null);

  // Check if due date passed for late fee
  const dueDate = new Date("2026-02-28");
  const isDueDate = today > dueDate;
  const daysLeft = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Calculate remaining balance
  const remainingBalance = feeState.totalPayable - feeState.totalPaid + feeState.lateFee;
  const isFullyPaid = remainingBalance <= 0;
  const progressPercentage = Math.min(100, (feeState.totalPaid / feeState.totalPayable) * 100);

  // Add late fee if overdue
  const checkAndApplyLateFee = () => {
    if (isDueDate && feeState.lateFee === 0) {
      setFeeState((prev) => ({ ...prev, lateFee: 500 }));
    }
  };

  checkAndApplyLateFee();

  // Handle payment
  const handlePayNow = (installment: Installment) => {
    setSelectedInstallment(installment);
    setPaymentModal(true);
    setSelectedMethod(null);
    setPaymentSuccess(false);
  };

  // Process payment
  const processPayment = async () => {
    if (!selectedMethod || !selectedInstallment) return;

    setProcessingPayment(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const txnId = `TXN${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

    // Update installment
    setInstallments((prev) =>
      prev.map((inst) =>
        inst.id === selectedInstallment.id
          ? { ...inst, paid: inst.amount, isPaid: true }
          : inst
      )
    );

    // Add transaction
    const newTransaction: Transaction = {
      id: `txn-${Date.now()}`,
      date: today.toISOString().split("T")[0],
      transactionId: txnId,
      amount: selectedInstallment.amount - selectedInstallment.paid,
      method: getPaymentMethodLabel(selectedMethod),
      status: "completed",
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    // Update fee state
    const paidAmount = selectedInstallment.amount - selectedInstallment.paid;
    setFeeState((prev) => ({
      ...prev,
      totalPaid: prev.totalPaid + paidAmount,
    }));

    setSuccessTxnId(txnId);
    setProcessingPayment(false);
    setPaymentSuccess(true);
  };

  // Get payment method label
  const getPaymentMethodLabel = (method: PaymentMethod): string => {
    const labels = {
      upi: "UPI",
      card: "Credit Card",
      netbanking: "Net Banking",
      wallet: "Digital Wallet",
    };
    return labels[method];
  };

  // Sorted and filtered transactions
  const filteredTransactions = transactions
    .filter((txn) => filterStatus === "all" || txn.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.amount - a.amount;
    });

  return (
    <div className="space-y-6">
      {/* Financial Overview Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-campus-teal/10 to-campus-violet/10 border border-campus-teal/20 rounded-2xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Payable */}
          <div className="bg-white/50 backdrop-blur rounded-xl p-4 border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Total Payable</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-foreground"
            >
              ₹{feeState.totalPayable.toLocaleString()}
            </motion.p>
          </div>

          {/* Amount Paid */}
          <div className="bg-campus-emerald/10 backdrop-blur rounded-xl p-4 border border-campus-emerald/20">
            <p className="text-xs font-medium text-muted-foreground mb-1">Amount Paid</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-campus-emerald"
            >
              ₹{feeState.totalPaid.toLocaleString()}
            </motion.p>
          </div>

          {/* Remaining Balance */}
          <div
            className={cn(
              "backdrop-blur rounded-xl p-4 border",
              remainingBalance > 0
                ? "bg-campus-rose/10 border-campus-rose/20"
                : "bg-campus-emerald/10 border-campus-emerald/20"
            )}
          >
            <p className="text-xs font-medium text-muted-foreground mb-1">Remaining Balance</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "text-2xl font-bold",
                remainingBalance > 0 ? "text-campus-rose" : "text-campus-emerald"
              )}
            >
              ₹{Math.max(0, remainingBalance).toLocaleString()}
            </motion.p>
          </div>

          {/* Due Date */}
          <div
            className={cn(
              "backdrop-blur rounded-xl p-4 border",
              daysLeft <= 7 ? "bg-campus-rose/10 border-campus-rose/20" : "bg-campus-amber/10 border-campus-amber/20"
            )}
          >
            <p className="text-xs font-medium text-muted-foreground mb-1">Due Date</p>
            <p className={cn("text-sm font-bold mb-1", daysLeft <= 7 ? "text-campus-rose" : "text-campus-amber")}>
              {new Date("2026-02-28").toLocaleDateString()}
            </p>
            <p className={cn("text-xs font-medium", daysLeft <= 7 ? "text-campus-rose" : "text-campus-amber")}>
              {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Progress Bar */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Payment Progress</span>
              <span className="text-sm font-bold text-campus-teal">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full gradient-primary rounded-full"
              />
            </div>
          </div>

          {/* Circular Progress */}
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-muted"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-campus-teal"
                  initial={{ strokeDasharray: "0 251" }}
                  animate={{ strokeDasharray: `${(progressPercentage / 100) * 251} 251` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{Math.round(progressPercentage)}%</p>
                  <p className="text-[10px] text-muted-foreground">Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Banner */}
      <AnimatePresence>
        {isFullyPaid && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-campus-emerald/10 border border-campus-emerald/30 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-campus-emerald/20">
              <CheckCircle2 className="w-5 h-5 text-campus-emerald" />
            </div>
            <div>
              <p className="text-sm font-semibold text-campus-emerald">🎉 All fees cleared successfully!</p>
              <p className="text-xs text-campus-emerald/80">You're ready to proceed with course registration.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Late Fee Warning */}
      <AnimatePresence>
        {isDueDate && feeState.lateFee > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-campus-rose/10 border border-campus-rose/30 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-campus-rose/20">
              <AlertTriangle className="w-5 h-5 text-campus-rose" />
            </div>
            <div>
              <p className="text-sm font-semibold text-campus-rose">⚠ Late fee of ₹{feeState.lateFee} applied.</p>
              <p className="text-xs text-campus-rose/80">Please pay your outstanding balance immediately.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Installment Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Installment Breakdown</h3>
        <div className="space-y-2">
          {installments.map((inst, idx) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                onClick={() => setExpandedInstallment(expandedInstallment === inst.id ? null : inst.id)}
                className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-all border border-border"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className="p-2 rounded-lg bg-campus-teal/10">
                    <CreditCard className="w-4 h-4 text-campus-teal" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{inst.name}</p>
                    <p className="text-xs text-muted-foreground">₹{inst.amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span
                      className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        inst.isPaid
                          ? "bg-campus-emerald text-primary-foreground"
                          : "bg-campus-amber text-primary-foreground"
                      )}
                    >
                      {inst.isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                  {expandedInstallment === inst.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedInstallment === inst.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-muted/30 border-x border-b border-border rounded-b-xl space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                          <p className="text-lg font-bold text-foreground">₹{inst.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Amount Paid</p>
                          <p className="text-lg font-bold text-campus-emerald">₹{inst.paid.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Pending</p>
                          <p className="text-lg font-bold text-campus-rose">
                            ₹{(inst.amount - inst.paid).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                          <p className="text-sm font-medium text-foreground">{inst.dueDate}</p>
                        </div>
                      </div>

                      {!inst.isPaid && (
                        <button
                          onClick={() => handlePayNow(inst)}
                          className="w-full px-4 py-2 bg-campus-teal text-primary-foreground font-medium rounded-lg hover:bg-campus-teal/90 transition-all flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Payment Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Payment Timeline</h3>
        <div className="space-y-4">
          {[
            { status: "Invoice Generated", date: "2026-01-15", completed: true },
            { status: "Payment Initiated", date: "2026-02-10", completed: feeState.totalPaid > 0 },
            { status: "Payment Completed", date: isFullyPaid ? "2026-02-20" : "Pending", completed: isFullyPaid },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                  item.completed
                    ? "bg-campus-emerald border-campus-emerald"
                    : "bg-muted border-border"
                )}
              >
                {item.completed ? (
                  <Check className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Clock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className={cn("text-sm font-medium", item.completed ? "text-foreground" : "text-muted-foreground")}>
                  {item.status}
                </p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
              className="text-xs px-2 py-1 rounded-lg bg-muted border border-border text-foreground focus:outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | PaymentStatus)}
              className="text-xs px-2 py-1 rounded-lg bg-muted border border-border text-foreground focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Transaction ID</th>
                <th className="text-right py-3 px-3 font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Method</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground">Status</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn, idx) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-3 text-muted-foreground">{txn.date}</td>
                  <td className="py-3 px-3 font-mono text-xs text-foreground">{txn.transactionId}</td>
                  <td className="py-3 px-3 text-right font-semibold text-foreground">₹{txn.amount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-muted-foreground">{txn.method}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        txn.status === "completed"
                          ? "bg-campus-emerald text-primary-foreground"
                          : txn.status === "pending"
                          ? "bg-campus-amber text-primary-foreground"
                          : "bg-campus-rose text-primary-foreground"
                      )}
                    >
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => setPreviewReceipt(txn)}
                      className="inline-flex items-center gap-1 text-campus-teal hover:text-campus-teal/70 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-xs">Receipt</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No transactions found</p>
          </div>
        )}
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModal && !paymentSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPaymentModal(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl max-w-md w-full border border-border overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Select Payment Method</h2>
                  <button
                    onClick={() => setPaymentModal(false)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {selectedInstallment && (
                  <div className="mb-6 p-4 bg-muted rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Amount to Pay</p>
                    <p className="text-2xl font-bold text-foreground">
                      ₹{(selectedInstallment.amount - selectedInstallment.paid).toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  {[
                    { id: "upi", label: "UPI", icon: "📱", desc: "Google Pay, PhonePe, BHIM" },
                    { id: "card", label: "Credit/Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
                    { id: "netbanking", label: "Net Banking", icon: "🏦", desc: "All Major Banks" },
                    { id: "wallet", label: "Digital Wallet", icon: "👛", desc: "Paytm, Amazon Pay" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                      className={cn(
                        "w-full p-3 rounded-lg border-2 transition-all text-left",
                        selectedMethod === method.id
                          ? "border-campus-teal bg-campus-teal/10"
                          : "border-border hover:border-campus-teal/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{method.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{method.label}</p>
                          <p className="text-xs text-muted-foreground">{method.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={processPayment}
                  disabled={!selectedMethod || processingPayment}
                  className={cn(
                    "w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                    selectedMethod && !processingPayment
                      ? "bg-campus-teal text-primary-foreground hover:bg-campus-teal/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {processingPayment ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Success Modal */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card rounded-2xl max-w-md w-full border border-border overflow-hidden"
            >
              <div className="p-6 text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-12 h-12 bg-campus-emerald/20 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-6 h-6 text-campus-emerald" />
                </motion.div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">Payment Successful!</h2>
                  <p className="text-sm text-muted-foreground mt-1">Your payment has been processed successfully.</p>
                </div>

                <div className="bg-muted rounded-lg p-4 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Transaction ID</span>
                    <span className="font-mono text-xs font-medium text-foreground">{successTxnId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Amount</span>
                    <span className="font-medium text-foreground">
                      ₹{selectedInstallment ? (selectedInstallment.amount - selectedInstallment.paid).toLocaleString() : "0"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Method</span>
                    <span className="font-medium text-foreground">
                      {selectedMethod ? getPaymentMethodLabel(selectedMethod) : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Timestamp</span>
                    <span className="font-mono text-xs font-medium text-foreground">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPaymentSuccess(false);
                    setPaymentModal(false);
                    setSelectedMethod(null);
                    setSelectedInstallment(null);
                  }}
                  className="w-full py-2.5 bg-campus-teal text-primary-foreground font-medium rounded-lg hover:bg-campus-teal/90 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Receipt Preview Modal */}
      <AnimatePresence>
        {previewReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewReceipt(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full border border-border overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Payment Receipt</h2>
                  <button
                    onClick={() => setPreviewReceipt(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="border-t border-b border-gray-200 py-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receipt No.</span>
                    <span className="font-medium text-gray-900">{previewReceipt.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium text-gray-900">{previewReceipt.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-bold text-gray-900">₹{previewReceipt.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium text-gray-900">{previewReceipt.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium text-green-600">
                      {previewReceipt.status.charAt(0).toUpperCase() + previewReceipt.status.slice(1)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  This is a digital receipt. Download and keep it for your records.
                </p>

                <button
                  onClick={() => setPreviewReceipt(null)}
                  className="w-full py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeePaymentDashboard;
