import SaveData from './SaveData';

const NewNotification = async () => {
  try {
    let data = [];

    const res = await fetch(
      'https://nditc.sspythonanywhere.com/api/v1/notifications/web?page=1&limit=1',
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return <div />;
    }
    data = await res.json();

    return <SaveData data={data} />;
  } catch (err) {
    return <div />;
  }
};

export default NewNotification;
