import React from 'react'
import Footer from '../components/layout/Footer'
import {apiURL} from '../api/index'

const MyPlans = () => {

    const monthlyPriceId = 'price_1RQ4oBR3bhrygzVZlL5423zI';
    const yearlyPriceId = 'price_1RQ4p9R3bhrygzVZeE2p1W4W';
    
    const handleSubscribe = async(priceId) => {
        try {
            const response = await fetch(`${apiURL}/create-checkout-session`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({priceId})
            })

            const session = await response.json()
            window.location.href = session.url
        } catch (error) {
            console.log("Error:", error)
        }
    }
  return (

    <div>
        <div className='text-center text-4xl font-bold p-10'>
            <h2>Choose A Plan</h2>
        </div>
    
    <div className='flex content-center justify-center gap-6 p-5'>
        {/* plan-1 */}
      <div className="card w-96 bg-base-100 shadow-sm">
        <div className="card-body">
            <span className="badge badge-xs badge-warning bg-white border-none"></span>
            <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Free</h2>
            <span className="text-xl">$0</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>High-resolution image generation</span>
            </li>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Customizable style templates</span>
            </li>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Batch processing capabilities</span>
            </li>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>AI-driven image enhancements</span>
            </li>
            <li className="opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span className="line-through">Seamless cloud integration</span>
            </li>
            <li className="opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span className="line-through">Real-time collaboration tools</span>
            </li>
            </ul>
            <div className="mt-6">
            <button className="btn bg-gray-400 text-gray-300 btn-block cursor-not-allowed">Subscribed</button>
            </div>
        </div>
        </div>

        {/* plan-2 */}
        <div className="card w-96 bg-base-100 shadow-sm">
            <div className="card-body">
                <span className="badge badge-xs badge-warning">Most Popular</span>
                <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Monthly</h2>
                <span className="text-xl">$29/mo</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>High-resolution image generation</span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Customizable style templates</span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Batch processing capabilities</span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>AI-driven image enhancements</span>
                </li>
                <li className="opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="line-through">Seamless cloud integration</span>
                </li>
                <li className="opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="line-through">Real-time collaboration tools</span>
                </li>
                </ul>
                <div className="mt-6">
                <button onClick={() => handleSubscribe(monthlyPriceId)}
                 className="btn bg-black text-[#FFD700] btn-block animate-bounce rounded-md hover:animate-none hover:shadow-lg hover:shadow-yellow-400/40">Subscribe</button>
                </div>
            </div>
        </div>

        {/* plan-3 */}
        <div className="card w-96 bg-base-100 shadow-sm">
            <div className="card-body">
                <span className="badge badge-xs badge-warning bg-white border-none"></span>
                <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Yearly</h2>
                <span className="text-xl">$29/mo</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>High-resolution image generation</span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Customizable style templates</span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Batch processing capabilities</span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>AI-driven image enhancements</span>
                </li>
                <li className="opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="line-through">Seamless cloud integration</span>
                </li>
                <li className="opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="line-through">Real-time collaboration tools</span>
                </li>
                </ul>
                <div className="mt-6">
                <button onClick={() => handleSubscribe(yearlyPriceId)}
                 className="btn bg-black text-[#FFD700] btn-block rounded-md hover:shadow-lg hover:shadow-yellow-400/40">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default MyPlans
