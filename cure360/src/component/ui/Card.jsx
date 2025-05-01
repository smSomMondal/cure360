export default function Card({ title, value, icon, bgColor = "bg-white", textColor = "text-gray-800" }) {
    return (
      <div className={`rounded-2xl shadow-md p-4 ${bgColor} ${textColor}`}>
        <div className="flex items-center gap-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <h2 className="text-xl font-bold">{value}</h2>
          </div>
        </div>
      </div>
    );
  }
  