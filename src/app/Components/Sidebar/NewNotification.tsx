import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";
import SaveData from "./SaveData";

const NewNotification = async () => {
  const res = await fetch(
    "https://nditc.pythonanywhere.com/web_notifications?page=1&limit=1",
    { cache: "no-store" }
  );
  const data = await res.json();

  return <SaveData data={data} />;
};

export default NewNotification;
