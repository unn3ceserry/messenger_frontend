"use client";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="w-10 h-10 border-4 border-t-accent border-icons-color/30 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
