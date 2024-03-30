
import SideBar from "./components/SideBar";
import BlockBar from "./components/BlockBar";

function App() {
  return (
  <div className="bg-[#DDDFE1] h-screen">
    <div className="container h-full mx-auto">
      <div className="grid grid-cols-4 h-full">
        <SideBar />
        <div className="bg-white shadow-xl col-span-3 lg:col-span-2">
          Hello, Mr. World
        </div>
        <BlockBar />
      </div>
    </div>
  </div>
  );
}

export default App;
