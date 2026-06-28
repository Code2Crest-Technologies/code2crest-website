const teamMembers = [
  { name: "Barath Rahav", email: "barath@code2crest.com", role: "Owner" },
  { name: "Demo Manager", email: "manager@code2crest.com", role: "Admin" },
  { name: "Demo Member", email: "member@code2crest.com", role: "Member" },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Team
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage mock portal users before backend access control is connected.
        </p>
      </div>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-200/70">
        <div className="hidden grid-cols-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase text-slate-500 sm:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
        </div>
        {teamMembers.map((member) => (
          <div
            key={member.email}
            className="grid grid-cols-1 gap-2 border-b border-slate-100 px-5 py-4 text-sm last:border-b-0 sm:grid-cols-3"
          >
            <span className="font-semibold text-slate-950">{member.name}</span>
            <span className="text-slate-600">{member.email}</span>
            <span className="text-slate-600">{member.role}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
