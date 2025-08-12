import React from 'react';

interface props {
  state: any;
  children: React.ReactNode;
}

const Modal = ({ state, children }: props) => {
  return (
    <div
      className={
        'fixed inset-0 w-full h-full bg-transparent z-[60] transition-all ' +
        (state ? 'opacity-100 backdrop-blur-lg' : 'opacity-0 pointer-events-none')
      }
    >
      <div
        className={
          'absolute inset-0 w-full h-full bg-black   z-[60] transition-transform ' +
          (state ? 'opacity-40 ' : 'opacity-0 pointer-events-none')
        }
      />
      <div className="z-[70] relative h-full">{children}</div>
    </div>
  );
};

export default Modal;
