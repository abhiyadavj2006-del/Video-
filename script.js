// AI Email Assistant — demo data and analysis logic.
// The original script.js was missing from this repo, so this file provides
// sample emails so the page works as a demo. Replace the EMAILS array with
// real data (or connect an email API) to use real emails.
const EMAILS = [
  { id: 1, sender: "Prof. Sharma", subject: "Assignment 3 deadline extended", preview: "The last date for Assignment 3 is now Friday.", category: "Education", priority: "High", priorityReason: "Deadline is this week and the assignment carries 20 marks.", tasks: ["Submit Assignment 3 by Friday"], deadline: "Friday, 5:00 PM", security: "Safe", securityReason: "Sender is a known college address.", summary: "Assignment 3 deadline has been extended to Friday.", replies: ["Thanks for the update, I will submit by Friday."] },
  { id: 2, sender: "Placement Cell", subject: "AccioJob test on Monday", preview: "All CSE students must appear for the placement test.", category: "Education", priority: "High", priorityReason: "Placement test is on Monday morning.", tasks: ["Revise aptitude", "Carry college ID"], deadline: "Monday, 9:00 AM", security: "Safe", securityReason: "Sender is the official placement cell.", summary: "Placement test scheduled for Monday; carry your college ID.", replies: ["Noted, I will be there on Monday."] },
  { id: 3, sender: "Hackathon Rivals", subject: "Your team registration is confirmed", preview: "Team Jjh is registered for the MedTech track.", category: "Work", priority: "High", priorityReason: "Hackathon submission window opens soon.", tasks: ["Prepare the prototype demo"], deadline: "Submission opens next week", security: "Safe", securityReason: "Sender is the official hackathon platform.", summary: "Your hackathon team registration is confirmed.", replies: ["Great, thanks for confirming!"] },
  { id: 4, sender: "Labmentix", subject: "Internship induction recording", preview: "The induction session recording is now available.", category: "Work", priority: "Medium", priorityReason: "Useful for the internship, but not urgent.", tasks: ["Watch the induction recording"], deadline: "This week", security: "Safe", securityReason: "Sender is the internship programme.", summary: "Induction recording is available to watch.", replies: ["Thanks, I will watch it today."] },
  { id: 5, sender: "Kaggle", subject: "New data science course", preview: "A free hands-on course on data cleaning is live.", category: "Education", priority: "Low", priorityReason: "Learning material, no deadline.", tasks: [], deadline: "No deadline", security: "Safe", securityReason: "Sender is a known learning platform.", summary: "A free data science course is available.", replies: ["Thanks for sharing!"] },
  { id: 6, sender: "Bank Alert", subject: "Your account statement is ready", preview: "Your monthly statement is ready to download.", category: "Finance", priority: "Medium", priorityReason: "Review your statement this month.", tasks: ["Download the statement"], deadline: "End of month", security: "Safe", securityReason: "Sender is your bank's official alerts address.", summary: "Your monthly bank statement is ready.", replies: ["Thanks, I will download it."] },
  { id: 7, sender: "Amazon", subject: "Your order has been delivered", preview: "Your order was delivered today.", category: "Personal", priority: "Low", priorityReason: "Informational only.", tasks: [], deadline: "No deadline", security: "Safe", securityReason: "Sender is a known shopping site.", summary: "Your order has been delivered.", replies: ["Thanks for the update."] },
  { id: 8, sender: "Coursera", subject: "Complete your Python course", preview: "You are 70% through the Python course.", category: "Education", priority: "Medium", priorityReason: "Course progress is pending.", tasks: ["Finish module 5"], deadline: "Sunday", security: "Safe", securityReason: "Sender is a known learning platform.", summary: "You are 70% through the Python course.", replies: ["I will finish it this weekend."] },
  { id: 9, sender: "GitHub", subject: "New pull request on your repo", preview: "A teammate opened a pull request.", category: "Work", priority: "Medium", priorityReason: "Review is pending.", tasks: ["Review the pull request"], deadline: "Tomorrow", security: "Safe", securityReason: "Sender is GitHub notifications.", summary: "A new pull request needs your review.", replies: ["I will review it today."] },
  { id: 10, sender: "Prize Winner", subject: "You won ₹50,000! Claim now", preview: "Click the link to claim your prize immediately.", category: "Personal", priority: "Low", priorityReason: "Likely spam — do not click links.", tasks: [], deadline: "No deadline", security: "Suspicious", securityReason: "Unknown sender asking you to click a link to claim money.", summary: "Suspicious prize email — likely phishing.", replies: [] },
  { id: 11, sender: "HR Team", subject: "Interview scheduled", preview: "Your interview is scheduled for Thursday.", category: "Work", priority: "Medium", priorityReason: "Interview preparation needed.", tasks: ["Prepare for the interview"], deadline: "Thursday, 11:00 AM", security: "Safe", securityReason: "Sender is the company HR team.", summary: "Your interview is scheduled for Thursday.", replies: ["Thank you, I confirm my availability."] },
  { id: 12, sender: "Free Recharge", subject: "Get free mobile recharge now", preview: "Recharge your phone free by clicking here.", category: "Personal", priority: "Low", priorityReason: "Likely spam — do not click links.", tasks: [], deadline: "No deadline", security: "Suspicious", securityReason: "Unknown sender offering free recharge via a link.", summary: "Suspicious free-recharge email — likely phishing.", replies: [] }
];

let selected = null;

function renderList(filterText) {
  const list = document.getElementById("emailList");
  if (!list) return;
  const q = (filterText || "").toLowerCase();
  list.innerHTML = "";
  EMAILS.filter(e => !q || (e.sender + " " + e.subject + " " + e.preview).toLowerCase().includes(q))
    .forEach(e => {
      const div = document.createElement("div");
      div.className = "email-item";
      div.style.cssText = "border:1px solid #ddd;border-radius:8px;padding:10px;margin:8px 0;cursor:pointer";
      div.innerHTML = "<strong>" + e.sender + "</strong> — " + e.subject + "<br><small>" + e.preview + "</small>";
      div.onclick = () => showAnalysis(e);
      list.appendChild(div);
    });
}

function showAnalysis(email) {
  selected = email;
  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set("summary", email.summary);
  set("priority", email.priority);
  set("priorityReason", email.priorityReason);
  set("category", email.category);
  set("deadline", email.deadline);
  set("security", email.security);
  set("securityReason", email.securityReason);
  const tasksEl = document.getElementById("tasks");
  if (tasksEl) tasksEl.innerHTML = email.tasks.map(t => "<li>" + t + "</li>").join("") || "<li>No tasks</li>";
  const repliesEl = document.getElementById("replies");
  if (repliesEl) repliesEl.innerHTML = email.replies.map(r => "<p>" + r + "</p>").join("") || "<p>No suggested reply.</p>";
  const empty = document.getElementById("emptyState");
  const content = document.getElementById("analysisContent");
  if (empty) empty.style.display = "none";
  if (content) content.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  renderList("");
  const search = document.getElementById("search");
  if (search) search.addEventListener("input", () => renderList(search.value));
  const btn = document.getElementById("analyzeBtn");
  if (btn) btn.addEventListener("click", () => showAnalysis(selected || EMAILS[0]));
});
