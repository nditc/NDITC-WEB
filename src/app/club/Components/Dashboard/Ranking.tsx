import { getConfig } from "@/config/config_db";
import { initAdmin } from "@/config/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import { FaCrown, FaRankingStar } from "react-icons/fa6";

const Ranking = async () => {
  await initAdmin();

  const firestore = getFirestore();

  const rank_visible = (
    await firestore.collection("config").doc("config").get()
  ).data()?.rank_visible;

  if (!rank_visible) {
    return <div />;
  }

  const rankSnapshot = await firestore
    .collection("eventparticipant")
    .orderBy("points", "desc")
    .limit(3)
    .get();

  const rankList: any[] = rankSnapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));

  return (
    <>
      {rankList.length != 0 && (
        <section className="tech-bg h-fit w-screen bg-neutral-100 bg-top object-cover pb-16 pt-16 text-center md:text-lg">
          <div className="container leading-7">
            <h1 className="mx-auto mb-5 md:mb-8">
              <FaRankingStar className="mr-3 inline h-8 w-8 align-top text-primary md:h-10 md:w-10" />
              <span className="text-center text-4xl text-primary md:text-5xl">
                TOP
              </span>

              <span className="ml-1 text-center text-4xl md:text-5xl">
                RANKERS
              </span>
            </h1>

            <div className="flex w-full flex-col items-center justify-center gap-5 px-1 py-1 md:flex-row">
              {rankList.map((e, i) => {
                return (
                  <RankHolder
                    firestore={firestore}
                    key={i}
                    id={e.id}
                    points={e.points}
                    i={i}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Ranking;

const RankHolder = async ({
  firestore,
  id,
  points,
  i,
}: {
  firestore: FirebaseFirestore.Firestore;
  id: string;
  points: number;
  i: number;
}) => {
  const infoSnapshot = await firestore.collection("participants").doc(id).get();

  const data = infoSnapshot.data();

  if (infoSnapshot.exists)
    return (
      <div className="flex flex-col items-center gap-1 rounded-lg px-3 py-1">
        <div className="flex">
          <FaCrown
            className={`h-8 w-8 md:h-10 md:w-10 ${i == 0 ? "text-yellow-500" : i == 1 ? "text-gray-500" : i == 2 ? "text-yellow-300" : ""}`}
          />
        </div>

        <img
          src={`${data?.imageUrl}`}
          alt="Ranker"
          className="h-56 w-56 rounded-full transition hover:scale-105"
        />
        <div className="mt-4">
          <p className="Bebas mt-1 line-clamp-2 w-72 text-4xl leading-none tracking-tight">
            {data?.name}
          </p>
          <p className="mt-1 line-clamp-1 w-72 font-semibold leading-none text-primary">
            {data?.institution}
          </p>
          <p className="mt-1 line-clamp-1 w-72">Points: {points}</p>
        </div>
      </div>
    );
};
