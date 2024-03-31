import BlockBarComponent from "./BlockBarComponent.tsx";

const BlockBar = () => {
  const items = [
    { image: require('../img/movies/blocks/1.png') }, // Oppenheimer
    { image: require('../img/movies/blocks/2.png') }, // Black Mirror
    { image: require('../img/movies/blocks/3.png') }, // Dune
  ];

  return (
  <div className="bg-white shadow-xl ml-12 hidden lg:block h-screen overflow-y-scroll scrollbar-hide">
    <div className="fixed bg-white text-2xl truncate text-center select-none pb-6 rounded-b-2xl z-10">
      <div className="flex flex-row gap-8 mx-8 my-4 justify-center">
        <div className="w-16 h-14 bg-[#DDDFE1] rounded shadow-inner" />
        <div className="w-16 h-14 bg-[#DDDFE1] rounded shadow-inner" />
        <div className="w-16 h-14 bg-[#DDDFE1] rounded shadow-inner" />
      </div>
      Новинки на сайте
    </div>
    <div className="flex flex-col gap-4 items-center h-screen mt-36">
      {/* Components */}
      {items.map((item) => (
        <BlockBarComponent image={item.image} />
      ))}
      <a href='.' className="pt-2 pb-10">
        <span className="text-2xl bg-[#DDDFE1] px-8 py-2 rounded-2xl align-top">...</span>
      </a>
    </div>
  </div>
  );
}

export default BlockBar;