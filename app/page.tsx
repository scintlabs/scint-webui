import React from "react";
import Messages from "./components/messages";
import InputBar from "./components/input";
import Image from "next/image";

export function ContextIcon() {
  return (
    <Image
      src="/images/context.svg"
      alt="Info"
      width={20}
      height={20}
      unoptimized
      className="opacity-80"
    />
  );
}

export function InterfaceIcon() {
  return (
    <Image
      src="/images/interface.svg"
      alt="Info"
      width={24}
      height={24}
      unoptimized
      className="opacity-80"
    />
  );
}

const RootPage = () => {
  return (
    <>
      <section className="flex justify-between flex-row">
        <div className="w-80 justify-start hidden xl:flex">
          {/* <InterfaceIcon /> */}
        </div>
        <div className="flex flex-col max-w-screen-md w-full h-full">
          <Messages />
        </div>
        <div className="w-80 justify-end hidden xl:flex">
          {/* <ContextIcon /> */}
        </div>
      </section>
      <InputBar />
    </>
  );
};

export default RootPage;
