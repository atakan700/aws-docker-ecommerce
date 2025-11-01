import { useAlert } from "../../context/AlertContext";

export default function Alert() {
  const { alert } = useAlert();

  if (!alert.type) return null; // alert yoksa render etme

  return (
    <div style={{ color: alert.type === "success" ? "green" : "red" }}>
      {alert.message}
    </div>
  );
}