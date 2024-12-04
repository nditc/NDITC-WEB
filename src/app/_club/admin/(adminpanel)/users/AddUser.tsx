import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { IoPersonAdd } from "react-icons/io5";

//Currently This Component Is NOT Being Used

const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addUser = () => {};

  return (
    <div>
      <button
        onClick={onOpen}
        type={"button"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary_light px-5 py-2 text-sm leading-[1.15] text-primary_dark shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
      >
        <IoPersonAdd className="h-6 w-6" />
        Add User
      </button>

      <Modal
        scrollBehavior={"inside"}
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary">
                Add an User
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button
                  onClick={addUser}
                  color="primary"
                  variant="light"
                  onPress={onClose}
                >
                  Add User
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddUser;
