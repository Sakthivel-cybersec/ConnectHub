import { UserRound, Mail, ShieldCheck, Briefcase } from "lucide-react";
import "./Profile.css";

export default function Profile() {
  return (
    <main className="profile-page">
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>View and manage your account information.</p>
        </div>
      </div>

      <section className="profile-card">
        <div className="profile-card-header">
          <div className="profile-large-avatar">AM</div>
          <div>
            <h2>Admin User</h2>
            <p>Administrator</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail-item">
            <UserRound size={20} />
            <div>
              <span>Full Name</span>
              <strong>Admin User</strong>
            </div>
          </div>

          <div className="profile-detail-item">
            <Mail size={20} />
            <div>
              <span>Email Address</span>
              <strong>admin@connecthub.com</strong>
            </div>
          </div>

          <div className="profile-detail-item">
            <ShieldCheck size={20} />
            <div>
              <span>Account Role</span>
              <strong>Administrator</strong>
            </div>
          </div>

          <div className="profile-detail-item">
            <Briefcase size={20} />
            <div>
              <span>Department</span>
              <strong>Administration</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
