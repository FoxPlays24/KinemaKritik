import BlockBarComponent from "./BlockBarComponent.tsx";

const BlockBar = () => {
  const items = [
    { image: require('../img/movies/Oppenheimer/Oppenheimer-block.png') },
    { image: require('../img/movies/Black Mirror/Black Mirror-block.png') },
    { image: require('../img/movies/Dune/Dune-block.png') },
  ];

  return (
  <div className="bg-white shadow-xl ml-12 hidden lg:block h-screen overflow-y-scroll">
    <div className="fixed bg-white text-2xl truncate text-center select-none pb-6 rounded-2xl z-10">
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
    </div>
  </div>
  );
}

export default BlockBar;