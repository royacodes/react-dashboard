import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../assets/defaultimage.jpg';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function PlainNavBar() {
  return (
    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
          <div className="w-full px-2 sm:px-6 lg:px-8 shadow">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <h1
              className="block h-8 w-auto lg:hidden text-center text-xl font-bold tracking-tight text-violet-700 font-skranji">PaymentIsland</h1>
              <h1
              className="hidden ml-24 h-8 w-auto lg:block text-center text-xl font-bold tracking-tight text-violet-700 font-skranji">PaymentIsland</h1>
                </div>
              </div>
              
            </div>
          </div>

     
        </>
      )}
    </Disclosure>   
    
  )
}