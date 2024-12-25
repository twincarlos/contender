"use client";
import "./Modal.css";
import { useModal } from "../../context/ModalContext";
import Card from "../Card/Card";

export default function Modal() {
    const { content, setContent } = useModal();
    if (!content) return null;
    return (
        <div className="modal-overlay flex justify-content--center align-items--center">
            <div className="modal-content">
                <Card>
                    <div className="modal-header flex justify-content--space-between">
                        <h3>{content.title}</h3>
                        <button
                            className="quartenary"
                            onClick={() => setContent(null)}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                    {content.content}
                </Card>
            </div>
        </div>
    );
}
