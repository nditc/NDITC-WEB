export const getEventData = async (type: string) => {
  let modifiedType;
  if (type == "projects" || type == "publications") {
    modifiedType = type;
  } else {
    modifiedType = "activities/" + type;
  }
  const res = await fetch(
    "https://nditc.pythonanywhere.com/api/v1/" + modifiedType,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("Problem Occurred");
    return [];
  }
  return res.json();
};
