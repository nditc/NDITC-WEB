"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useUserDataContext } from "../Layout/UserDataProvider";
import { useEffect, useState } from "react";
import { MdCircleNotifications } from "react-icons/md";
import { useAuthContext } from "../Layout/AuthContextProvider";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const DamianPopUp = () => {
  const userAuth = useAuthContext().userAuth;
  const userLoading = useAuthContext().loading;
  const { userData, userDataLoading, dataError, updateUserData } =
    useUserDataContext();

  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [roll, setRoll] = useState("");

  useEffect(() => {
    if (!userDataLoading && userData.ndc_roll == "") {
      onOpen();
    }
  }, [userData, userDataLoading]);

  const onSubmit = async (e: any) => {
    if (roll == "") {
      toast.error("Roll can't be empty");
      return;
    }

    setLoading(true);

    if (userAuth && !userLoading) {
      try {
        await updateDoc(doc(db, "participants", userAuth.uid), {
          ndc_roll: roll,
        });

        toast.success("NDC Roll Updated!");
        updateUserData();
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Aww Snap!");
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className="rounded-xl p-5 text-yellow-950">
                  <b className="flex items-center gap-1">
                    {" "}
                    <MdCircleNotifications className="h-7 w-7" />
                    Notification:
                  </b>
                  Hi there. Are you a Notre Damian? The NDITC Intra-College Fest
                  is set for October 14-15!. Then what are you waiting for?
                  Enter your NDC Roll, get ready and keep your eyes on the
                  Events page. (Ignore this notification if you are not a
                  Damian)
                </p>

                <label
                  className="ml-2 font-medium text-gray-500 disabled:text-gray-200"
                  htmlFor={"roll"}
                >
                  NDC Roll:
                </label>
                <input
                  className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
                  onChange={(e) => setRoll(e.currentTarget.value)}
                  value={roll}
                  name={"roll"}
                  placeholder={"#####"}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={loading}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  onPress={(e) => {
                    onSubmit(e);
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DamianPopUp;
