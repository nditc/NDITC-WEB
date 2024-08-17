import SaveData from "./SaveData";

const NewNotification = async () => {
  let data = [];
  const res = await fetch(
    "https://nditc.pythonanywhere.com/api/v1/notifications/web?page=1&limit=1",
    { cache: "no-store" }
  );
  if (res.ok) {
    data = await res.json();
  }

  return <SaveData data={data} />;
};

export default NewNotification;
