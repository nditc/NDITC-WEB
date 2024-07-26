import SaveData from "./SaveData";

async function getData() {
  const res = await fetch(
    "https://nditc.pythonanywhere.com/api/v1/notifications/web?page=1&limit=1",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return [];
  } else {
    return res.json();
  }
}

const NewNotification = async () => {
  let data: any[] = [];

  data = await getData();

  if (data.length != 0) {
    <SaveData data={data} />;
  } else {
    return <div></div>;
  }
};

export default NewNotification;
