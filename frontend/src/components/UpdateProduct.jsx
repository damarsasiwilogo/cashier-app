import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

function MyComponent({ isOpen, onClose }) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Data</ModalHeader>
          <ModalBody>{/* Tempatkan konten modal di sini */}</ModalBody>
          <ModalFooter>
            {/* Tombol atau aksi yang diperlukan pada modal */}
            <Button colorScheme="blue" onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MyComponent;
