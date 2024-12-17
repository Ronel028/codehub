// import './bootstrap';
import { createInertiaApp, router } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// router.on('start', () => {
//   console.log('running')
// })

// router.on('finish', () => {
//   console.log('stop running')
// })

createInertiaApp({
  progress: {
    delay: 250,
    color: '#E0E1DD',
    includeCSS: true,
    showSpinner: false,
  },
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <App {...props} />
      </>
    )
  },
})