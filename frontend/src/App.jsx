import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterMerchant from './pages/RegisterMerchant'
import RegisterCustomer from './pages/RegisterCustomer'
import MerchantMenus from './pages/MerchantMenus'
import MerchantOrders from './pages/MerchantOrders'
import MerchantProfile from './pages/MerchantProfile'
import CustomerSearch from './pages/CustomerSearch'
import CustomerOrder from './pages/CustomerOrder'
import CustomerOrders from './pages/CustomerOrders'
import InvoiceView from './pages/InvoiceView'

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/')
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const path = route.split('?')[0]

  return (
    <Layout route={path}>
      {path === '#/' && <Home />}
      {path === '#/login' && <Login />}
      {path === '#/register-merchant' && <RegisterMerchant />}
      {path === '#/register-customer' && <RegisterCustomer />}
      {path === '#/merchant/profile' && <MerchantProfile />}
      {path === '#/merchant/menus' && <MerchantMenus />}
      {path === '#/merchant/orders' && <MerchantOrders />}
      {path === '#/customer/search' && <CustomerSearch />}
      {path === '#/customer/order' && <CustomerOrder />}
      {path === '#/customer/orders' && <CustomerOrders />}
      {path === '#/invoice' && <InvoiceView />}
    </Layout>
  )
}

export default App
