import React from 'react'
import SettingOption from '../components/Settings/SettingOption'
import {Link} from "react-router-dom";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";


export default function Settings() {
  return (
    <div className="pl-4 pr-4 pt-8 pb-4 bg-white sticky top-0 z-50">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Einstellungen</h1>
        <Link to="/login">
          <ArrowRightOnRectangleIcon className="flex h-8 w-8 text-indigo-600" />
        </Link>
      </div>
    </div>
  )
}

