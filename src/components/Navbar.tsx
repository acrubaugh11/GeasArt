import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import '../index.css'

const navigation = [
  { name: 'Shop', to: '/shop' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
]

function classNames(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation()

  return (
    <Disclosure as="nav" className="w-full fixed top-0 z-50 left-0 font-gilda letter-colors "
    style={{ backgroundColor: 'rgb(209, 200, 244)' }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-10 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 justify-between sm:items-stretch sm:justify-between">
            <Link
              to="/"
              className="flex shrink-0 items-center font-gilda text-[25px] letter-colors"
            >
              Geas Art
            </Link>

          <div className="hidden sm:ml-6 sm:flex space-x-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.to
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    'px-3 py-2 rounded-md text-[20px] font-gilda letter-colors',
                    isActive ? '!underline font-bold' : ''  // no underline for inactive
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden px-2 pt-2 pb-3 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.to}
              className={classNames(
                        'block rounded-md px-3 py-2 text-base font-2xl letter-colors font-gilda',
                        isActive ? 'bg-violet-300 text-white underline' : ''
                      )}
            >
              {item.name}
            </DisclosureButton>
          )
        })}
      </DisclosurePanel>
    </Disclosure>
  )
}
