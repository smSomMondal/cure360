export default function Button({ children, onClick, variant = "primary" }) {
    const base = "px-4 py-2 rounded-xl font-semibold transition-all";
    const styles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      danger: "bg-red-600 text-white hover:bg-red-700"
    };
    return (
      <button className={`${base} ${styles[variant]}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  