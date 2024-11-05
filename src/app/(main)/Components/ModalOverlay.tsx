interface props {
  state: any;
  children: React.ReactNode;
}

const ModalOverlay = ({ state, children }: props) => {
  return (
    <div
      className={
        "fixed inset-0 z-[60] h-full w-full bg-transparent transition-all " +
        (state
          ? "opacity-100 backdrop-blur-lg"
          : "pointer-events-none opacity-0")
      }
    >
      <div
        className={
          "absolute inset-0 z-[60] h-full w-full bg-black transition-transform " +
          (state ? "opacity-40" : "pointer-events-none opacity-0")
        }
      />
      <div className="relative z-[70] h-full">{children}</div>
    </div>
  );
};

export default ModalOverlay;
