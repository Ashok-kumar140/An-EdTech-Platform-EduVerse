import React from 'react'

const ConfirmationModal = ({ modalData }) => {
   
    return (
        <div>
            <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                    <p className="text-2xl font-semibold text-richblack-5">
                        {modalData.text1}
                    </p>
                    <p className="mt-3 mb-5 leading-6 text-richblack-200">
                        {modalData.text2}
                    </p>
                    <div className="flex items-center gap-x-4">
                        <button className='flex items-center gap-2 bg-richblack-200  p-2 px-3 rounded-md'
                            onClick={modalData.btnHandler1}>
                            {modalData.btnText1}
                        </button>
                        <button
                            className="cursor-pointer rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900"
                            onClick={modalData.btnHandler2}
                        >
                            {modalData.btnText2}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ConfirmationModal;
