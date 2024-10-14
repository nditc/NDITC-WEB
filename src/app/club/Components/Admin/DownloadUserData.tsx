import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const DownloadUserData = ({
  adminAuth,
  onFilterQuery,
}: {
  adminAuth: boolean;
  onFilterQuery: (loadMore: boolean, limitLess: boolean) => any;
}) => {
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllDocs = async (limitless: boolean) => {
    try {
      if (adminAuth) {
        setLoading(true);
        const data: any = [];
        const x = await getDocs(onFilterQuery(false, limitless));

        x.forEach((doc) => {
          const temp: any = doc.data();
          const createdAt = new Date(
            temp?.timestamp?.seconds * 1000,
          ).toString();
          if (temp.timestamp) {
            delete temp.timestamp;
          }
          data.push({
            uid: doc.id,
            createdAt,
            ...temp,
          });
        });

        const workBook = XLSX.utils.book_new();
        const xlsx = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workBook, xlsx, "All Participants");

        XLSX.writeFile(workBook, "Participants.xlsx");

        // setUrl(URL.createObjectURL(blob));

        // setTimeout(() => downloadRef.current?.click(), 3000);
        setLoading(false);
        toast.info("Data Downloaded as XLSX");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="pr-3">
      <button
        disabled={loading}
        onClick={() => {
          getAllDocs(false);
        }}
        type={"button"}
        className="my-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary md:my-0 md:mt-7 md:w-60"
      >
        <MdOutlinePersonSearch className="h-6 w-6" /> Download Shown Data
      </button>
      <button
        disabled={loading}
        onClick={onOpen}
        type={"button"}
        className="my-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-red-700 hover:text-white focus:ring-2 focus:ring-red-600 md:my-0 md:mt-7 md:w-60"
      >
        <MdOutlinePersonSearch className="h-6 w-6" /> Download All Data
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                All USER DATA!
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you really fucking serious?!? If you've gone mental. Then
                  alright. Go ahead. Download all the User Data at once. Good
                  Luck!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    getAllDocs(true);
                  }}
                >
                  Download
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DownloadUserData;
