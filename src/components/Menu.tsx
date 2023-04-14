const Menu = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Scrambled Words Game
      </h1>
      <div className="bg-[#F4EEE0] text-center p-4 rounded">
        <h1 className="text-slate-800 text-lg mb-4 font-bold uppercase">
          Start a new room
        </h1>
        <button
          className="bg-green-600 text-white font-bold py-2 px-8 rounded mb-4 transition-all hover:bg-green-500"
          onClick={() => console.log('c')}
        >
          Play
        </button>

        <hr className="border-black" />
        <h1 className="text-start text-slate-800 text-lg my-4 font-bold uppercase">
          Join a private room
        </h1>
        <div className="flex items-center gap-2 justify-center">
          <p>Code:</p>
          <input className="p-2 border border-slate-500 rounded" />
          <button
            className="bg-blue-600 text-white transition-all font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-500"
            onClick={() => console.log('j')}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
