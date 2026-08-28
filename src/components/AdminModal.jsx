import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Lock, Terminal, RefreshCw, X, Database, AlertCircle } from "lucide-react"
import { useModals } from "../context/useModals"

export default function AdminModal() {
  const { isAdminOpen, closeAdmin } = useModals()

  const [activeTab, setActiveTab] = useState("overview")
  const [token, setToken] = useState(() => localStorage.getItem("sthayu_admin_jwt") || "")
  const [user, setUser] = useState(null)
  const [loginEmail, setLoginEmail] = useState("admin@sthayuventures.com")
  const [loginPassword, setLoginPassword] = useState("Sthayu#2026!SecureRoot")
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)

  const [stats, setStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [assessments, setAssessments] = useState([])
  const [bookings, setBookings] = useState([])
  const [auditLogs, setAuditLogs] = useState([])

  const fetchAdminData = useCallback(async (authToken) => {
    if (!authToken) return
    setLoading(true)
    try {
      const headers = { Authorization: `Bearer ${authToken}` }
      const [statsRes, leadsRes, assessRes, booksRes, auditRes] = await Promise.all([
        fetch("/api/v1/admin/stats", { headers }),
        fetch("/api/v1/admin/leads", { headers }),
        fetch("/api/v1/admin/assessments", { headers }),
        fetch("/api/v1/admin/bookings", { headers }),
        fetch("/api/v1/admin/audit-logs", { headers }),
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.data)
      }
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json()
        setLeads(leadsData.data || [])
      }
      if (assessRes.ok) {
        const assessData = await assessRes.json()
        setAssessments(assessData.data || [])
      }
      if (booksRes.ok) {
        const booksData = await booksRes.json()
        setBookings(booksData.data || [])
      }
      if (auditRes.ok) {
        const auditData = await auditRes.json()
        setAuditLogs(auditData.data || [])
      }
    } catch (err) {
      console.error("Admin fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Verify stored token
  useEffect(() => {
    if (token) {
      fetch("/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user)
            fetchAdminData(token)
          } else {
            localStorage.removeItem("sthayu_admin_jwt")
            setToken("")
            setUser(null)
          }
        })
        .catch(() => {
          setToken("")
        })
    }
  }, [token, fetchAdminData])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoginError("")
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data = await res.json()
      if (res.ok && data.success && data.token) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem("sthayu_admin_jwt", data.token)
        fetchAdminData(data.token)
      } else {
        setLoginError(data.error || "Authentication failed")
      }
    } catch {
      setLoginError("Could not connect to authentication gateway")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("sthayu_admin_jwt")
    setToken("")
    setUser(null)
  }

  if (!isAdminOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAdmin}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-[2rem] border border-white/[0.12] bg-[#080808] shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-10 my-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:px-8 border-b border-white/10 bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#d4d4d8]">
                <Terminal size={16} />
              </div>
              <div>
                <h3 id="admin-modal-title" className="text-base font-bold text-white flex items-center gap-2">
                  <span>Sthayu Operations Command Console</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#86efac]/10 text-[#86efac] border border-[#86efac]/20">
                    LIVE
                  </span>
                </h3>
                <p className="text-[11px] font-mono text-slate-400">SOC2 / HIPAA Audited Administrative Pipeline</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <button
                  type="button"
                  onClick={() => fetchAdminData(token)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                  <span>Sync</span>
                </button>
              )}
              <button
                type="button"
                onClick={closeAdmin}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close admin console"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8">
            {!user ? (
              <div className="max-w-md mx-auto py-8">
                <div className="text-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] text-[#d4d4d8] mx-auto mb-3">
                    <Lock size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Authenticate Management Session</h4>
                  <p className="text-xs text-slate-400 mt-1">Enter administrative credentials to inspect live runtime data.</p>
                </div>

                {loginError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Admin Email</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="input-glass text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="input-glass text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-xs font-bold mt-2"
                  >
                    {loading ? "Authenticating..." : "Unlock Command Console"}
                  </button>
                </form>

                <div className="mt-6 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 font-mono text-center">
                  Pre-configured Demo Root: <br />
                  <span className="text-[#d4d4d8]">admin@sthayuventures.com</span>
                </div>
              </div>
            ) : (
              <div>
                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                  <div className="flex gap-2">
                    {[
                      { id: "overview", label: "Overview & Stats" },
                      { id: "leads", label: `Leads (${leads.length})` },
                      { id: "assessments", label: `Assessments (${assessments.length})` },
                      { id: "bookings", label: `Bookings (${bookings.length})` },
                      { id: "audit", label: "Audit Logs" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          activeTab === tab.id
                            ? "bg-white/10 text-white font-bold border border-white/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-400">
                      Logged in as: <strong className="text-white">{user.name}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-xs font-mono text-red-400 hover:underline cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>

                {/* Tab 1: Overview */}
                {activeTab === "overview" && stats && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono">
                        <div className="text-[10px] uppercase text-slate-400">Total Leads</div>
                        <div className="text-2xl font-black text-white mt-1">{stats.totalLeads}</div>
                        <div className="text-[10px] text-[#86efac] mt-1">High Intent Qualified</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono">
                        <div className="text-[10px] uppercase text-slate-400">Architecture Audits</div>
                        <div className="text-2xl font-black text-[#d4d4d8] mt-1">{stats.totalAssessments}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Dispatched Blueprints</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono">
                        <div className="text-[10px] uppercase text-slate-400">Strategy Sessions</div>
                        <div className="text-2xl font-black text-white mt-1">{stats.totalBookings}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Scheduled Consultations</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono">
                        <div className="text-[10px] uppercase text-slate-400">Active AI Agents</div>
                        <div className="text-2xl font-black text-[#86efac] mt-1">{stats.activeAgentsCount}</div>
                        <div className="text-[10px] text-[#86efac] mt-1">Mesh 100% Operational</div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs space-y-3">
                      <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Database size={14} className="text-[#a1a1aa]" />
                        <span>System Health & Fabric Telemetry</span>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2 text-slate-300">
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-slate-400">Runtime Engine:</span>
                          <span className="text-white">Node.js Express V5 + ESM</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-slate-400">Database Engine:</span>
                          <span className="text-white">Sthayu In-Memory / JSON File Persistence</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-slate-400">Workflow Executions:</span>
                          <span className="text-white">{stats.totalWorkflowExecutions} Completed</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-slate-400">Agent Executions:</span>
                          <span className="text-white">{stats.totalAgentExecutions} Processed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Leads */}
                {activeTab === "leads" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-slate-400 mb-2">Qualified Inbound Prospects & Deal Pipeline</div>
                    {leads.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No leads recorded yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs">
                          <thead>
                            <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                              <th className="pb-2">Lead Name</th>
                              <th className="pb-2">Company</th>
                              <th className="pb-2">Email</th>
                              <th className="pb-2">Source</th>
                              <th className="pb-2">Score</th>
                              <th className="pb-2">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-300">
                            {leads.map((lead) => (
                              <tr key={lead.id} className="hover:bg-white/[0.02]">
                                <td className="py-2.5 font-bold text-white">{lead.name}</td>
                                <td className="py-2.5">{lead.company}</td>
                                <td className="py-2.5 text-slate-400">{lead.email}</td>
                                <td className="py-2.5 uppercase text-[10px] text-slate-400">{lead.source}</td>
                                <td className="py-2.5 text-[#86efac] font-bold">{lead.score}/100</td>
                                <td className="py-2.5">
                                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] uppercase text-[#d4d4d8]">
                                    {lead.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Assessments */}
                {activeTab === "assessments" && (
                  <div className="space-y-4">
                    <div className="text-xs font-mono text-slate-400 mb-2">Diagnostic Intake Blueprints</div>
                    {assessments.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No diagnostic assessments recorded yet.</p>
                    ) : (
                      assessments.map((a) => (
                        <div key={a.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                            <span className="font-bold text-white">{a.name} ({a.company || "Direct"})</span>
                            <span className="text-[10px] text-slate-400">{new Date(a.createdAt).toLocaleString()}</span>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-3 text-slate-300 pt-1">
                            <div><span className="text-slate-400">Email: </span>{a.email}</div>
                            <div><span className="text-slate-400">Bottleneck: </span>{a.primaryFriction}</div>
                            <div><span className="text-slate-400">Severity Score: </span><strong className="text-[#86efac]">{a.bottleneckScore}/100</strong></div>
                          </div>
                          <div className="text-[11px] text-slate-400 pt-1">
                            <strong className="text-[#d4d4d8]">Blueprint Strategy: </strong>{a.blueprintSummary?.recommendedAgent} · {a.targetRoiMultiplier} projected lift.
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Tab 4: Bookings */}
                {activeTab === "bookings" && (
                  <div className="space-y-4">
                    <div className="text-xs font-mono text-slate-400 mb-2">Strategy Consultation Bookings</div>
                    {bookings.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No strategy sessions booked yet.</p>
                    ) : (
                      bookings.map((b) => (
                        <div key={b.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs space-y-2">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="font-bold text-white">{b.name} ({b.company})</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#86efac]/10 text-[#86efac] text-[10px] font-bold">
                              {b.status}
                            </span>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2 text-slate-300 pt-1">
                            <div><span className="text-slate-400">Requested Date: </span><strong className="text-white">{b.requestedDate}</strong></div>
                            <div><span className="text-slate-400">Time Slot: </span>{b.timeSlot || "Flexible"}</div>
                            <div><span className="text-slate-400">Email: </span>{b.email}</div>
                            <div><span className="text-slate-400">Notes: </span>{b.notes || "Standard Strategy Call"}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Tab 5: Audit Logs */}
                {activeTab === "audit" && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-400 mb-2">Security & Operational Audit Trail</div>
                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                      {auditLogs.slice().reverse().map((log) => (
                        <div key={log.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[11px] flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[#86efac]">[{log.action}]</span>
                            <span className="text-slate-300">{log.resource}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
