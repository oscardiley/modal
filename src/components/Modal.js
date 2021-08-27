import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Foto from "../img/phone.jpg";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media screen and (max-width: 420px) {
    display: grid;
    grid-template-columns: 1fr;
    margin: 20px;
    border-radius: 10px;
  }
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  object-fit: cover;

  @media screen and (max-width: 420px) {
    height: 50%;
    object-fit: cover;
    margin-bottom: 0;
    border-radius: 10px 10px 0 0;
  }
`;

const ModalContent = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.8;
  color: #141414;

  h1 {
    font-weight: 800;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    border-radius: 5px;
    background: #25183e;
    color: #fff;
    border: none;
  }

  @media screen and (max-width: 420px) {
    line-height: 1.2;
    margin-top: -15rem;

    h1 {
      margin-bottom: 8px;
    }
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  /* const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  }); */

  const closeModal = e =>{
      if(modalRef.current === e.target){
          setShowModal(false);
      }
  };

  const keyPress = useCallback(e=>{
      if(e.key==='Escape' && showModal){
          setShowModal(false)
      }
  }, [setShowModal, showModal])

  useEffect(()=>{
      document.addEventListener('keydown', keyPress);
      return ()=> document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={Foto} alt="phone" />
              <ModalContent>
                <h1>¿Cómo te ayudamos?</h1>
                <p>Cuéntanos lo que necesitas, nosotros te responderemos</p>
                <button>Cotizar</button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close Modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};
