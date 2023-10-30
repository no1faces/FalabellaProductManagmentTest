interface ModalProps {
    modalOpen: boolean;
    handleCloseModal: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, handleCloseModal, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>handleCloseModal()}>
                ✕
            </button>
            {children}
        </div>
    </div>
  )
}

export default Modal