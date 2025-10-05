
function Footer() {
  return (
    <>
    <section className='w-full border-t border-gray-300 dark:border-gray-700'></section>
    <div className='text-center pt-4 text-sm text-gray-400 dark:text-gray-500'>Made with ❤️ by <span className='font-bold'>Bilal Imran</span></div>
    <div className='text-center text-sm text-gray-400 dark:text-gray-500'>Special thanks to <span className='font-bold'>Nora</span></div>
    <div className='text-center pb-4 text-sm text-gray-400 dark:text-gray-500'>© {new Date().getFullYear()} Bilal Imran. All rights reserved.</div>
</>
  )
}

export default Footer