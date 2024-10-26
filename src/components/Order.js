import { RiBox3Line } from "react-icons/ri";

function Order() {
    return (
        <div>
            <div className="flex items-center gap-4 p-6 bg-white text-gray-800">
                <RiBox3Line className="text-4xl" />
                <h2 className="text-2xl font-semibold">MY ORDERS</h2>
            </div>
            <p className="py-4 px-6 text-[15px]">Displaying 0 order</p>
            <div className="p-6 bg-white">
                {/* <p className="font-semibold text-gray-800">ORDER STATUS: WE'VE SENT IT!</p> */}
                {/* <p className="text-green-600 mb-2">Estimated delivery Tuesday, March 14th, 2023</p> */}
                {/* <div className="flex items-center gap-2 mb-4">
                                display orders from backend
                            </div> */}
                {/* <p className="mb-1 text-gray-600">ORDER NO.: 818376840</p>
                <p className="mb-4 text-gray-600">Shipped date: Mar 07, 2023</p> */}
                <div className="flex space-x-4">
                    <button className="border bg-black text-white py-2 px-4">View Order</button>
                </div>
            </div>
        </div>
    )
}

export default Order