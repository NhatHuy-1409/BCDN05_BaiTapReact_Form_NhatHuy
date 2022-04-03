import React, { Component } from 'react'
import { connect } from 'react-redux';

class InfoStudent extends Component {

    handleInfoStu = (e) => {
        /**
         * bị lỗi nếu thay đổi trực tiếp this.props.infoStu[nameInfo] = info
         * => 2 vấn đề:
         * + component này ko được render lại 
         * + Do địa chỉ ô nhớ ko bị thay đổi => giá trị lưu sau sẽ gán vào giá trị trước đó => render List sẽ vị trùng giá trị (cùng lấy giá trị từ 1 địa chỉ)
         */
        let { value: info, name: nameInfo } = e.target
        let newInfoStu = { ...this.props.infoStu }
        newInfoStu[nameInfo] = info
        let newErrors = { ...this.props.inputErrors }
        let message = ''
        if (info.trim() === '') {
            message = nameInfo + 'không được để trống'
        }
        let attrValue = e.target.getAttribute('type')
        let reg = ''
        if (attrValue === 'email') {
            reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!reg.test(info)) {
                message = nameInfo + 'không đúng định dạng'
            }
        }
        //check tài khoản trùng
        if (nameInfo === 'maSV') {
            let isMaSV = this.props.listStu.some(stu => stu.maSV === info.trim())
            if (isMaSV) {
                message = nameInfo + ' đã tồn tại'
            }
        }
        newErrors[nameInfo] = message
        let action = {
            type: 'HANDLE_INFOSTU',
            info: newInfoStu,
            errors: newErrors
        }
        this.props.dispatch(action)
    }
    addInfoStu = () => {
        let isValid = true
        //check errors
        for (let key in this.props.inputErrors) {
            if (this.props.inputErrors[key] !== '') {
                isValid = false
                break
            }
        }
        //check input ban đầu chưa nhập
        for (let key in this.props.infoStu) {
            if (this.props.infoStu[key] === '') {
                isValid = false
                break
            }
        }
        //check tài khoản trùng

            let isMaSV = this.props.listStu.some(stu => stu.maSV === this.props.infoStu.maSV.trim())
            if (isMaSV) {
                isValid = false
                
            }
        
        if (!isValid) {
            alert('Bạn đã nhập sai')
            return
        }

        let action = {
            type: 'ADD_STUDENT',
            info: this.props.infoStu
        }
        this.props.dispatch(action)
    }
    render() {
        let { maSV, ten, soDT, mail } = this.props.inputErrors
        let infoStu = this.props.infoStu
        let isDisable = this.props.isDisable
        return (
            <div className=''>
                <div>
                    <div className="mx-40 my-7">
                        <div className="grid grid-cols-2 gap-6">
                            <div className=" shadow mt-5 md:mt-0 md:col-span-2 bg-slate-400 rounded-b-lg">
                                <div className="md:col-span-1">
                                    <div className="py-5 pl-5">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">THÔNG TIN SINH VIÊN</h3>
                                    </div>
                                </div>
                                <form action="#" >
                                    <div className=" overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Mã SV</label>
                                                    <input disabled={isDisable} value={infoStu.maSV} type="text" name="maSV" id="last-name" autoComplete="family-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={this.handleInfoStu} />
                                                    <p className='text-red-600'>{maSV}</p>
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Họ tên</label>
                                                    <input value={infoStu.ten} type="text" name="ten" id="last-name" autoComplete="family-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={this.handleInfoStu} />
                                                    <p className='text-red-600'>{ten}</p>
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                                    <input value={infoStu.soDT} type="text" name="soDT" id="last-name" autoComplete="family-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={this.handleInfoStu} />
                                                    <p className='text-red-600'>{soDT}</p>
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Email</label>
                                                    <input value={infoStu.mail} type="email" name="mail" id="last-name" autoComplete="family-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={this.handleInfoStu} />
                                                    <p className='text-red-600'>{mail}</p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">

                                            {isDisable ?
                                                <span></span> :
                                                <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={this.addInfoStu}>Thêm sinh viên</button>
                                            }
                                            {isDisable ?
                                                <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={
                                                    () => {
                                                        let action = {
                                                            type: 'UPDATE_STUDENT',
                                                            infoUpdate: this.props.infoStu
                                                        }
                                                        this.props.dispatch(action)
                                                    }
                                                }>Cập nhật</button>
                                                : <span></span>}
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
const mapStateToProps = (rootReducer) => {
    return {
        infoStu: rootReducer.manageStuReducer.infoStu,
        inputErrors: rootReducer.manageStuReducer.inputErrors,
        listStu: rootReducer.manageStuReducer.listStu,
        isDisable: rootReducer.manageStuReducer.isDisable,

    }
}

const ComponentInfoStuRedux = connect(mapStateToProps)(InfoStudent)
export default ComponentInfoStuRedux