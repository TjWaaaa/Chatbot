import React from "react";

export default function LoginView() {
  return (
    <div className="grid grid-cols-1 h-screen w-full">
      <div className="flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg">
          <h2 className="text-4xl dark:text-white font-bold text-center py-6">
            <div className="flex justify-center">
              <img className="w-20 py-4" src="chatbotLogo.png" alt=""/>
            </div>
            <span className="text-slate-900">
              CHAT
            </span>
            <span className="text-indigo-600">
              BOT
            </span>
          </h2>
          
          <div className="flex flex-col text-gray-800 py-2">
            <label>E-Mail</label>
            <input className="rounded-lg mt-2 p-2 border border-gray-500 focus:border-indigo-600" type="email" required></input>
          </div>
          <div className="flex flex-col text-gray-800 py-2">
            <label>Passwort</label>
            <input className="rounded-lg mt-2 p-2 border border-gray-500 focus:border-indigo-600"  type="password" required ></input>
          </div>
          <div className="flex justify-center text-gray-800 py-2">
            <a href="#">Passwort vergessen?</a>
          </div>
          <button className="w-full my-5 py-2 bg-indigo-600 shadow-lg shadow-indigo-600/50 hover:shadow-indigo-600/40 text-white font-semibold rounded-lg">Login</button>
          <div className="flex justify-center ">
            <p>Noch keinen Account? <a href="" className="text-indigo-600">Hier registrieren</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
