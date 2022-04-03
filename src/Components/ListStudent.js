import React, { Component } from 'react'
import { connect } from 'react-redux';

class ListStudent extends Component {
  renderListStu = () => {
    let listStudent = this.props.isSearching ? this.props.listSearch: this.props.listStu
    return listStudent.map((stu, index) => {
      return <tr key={index}>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{stu.maSV}</td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{stu.ten}</td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{stu.soDT}</td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{stu.mail}</td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => {
            let action = {
              type: 'DELETE_STUDENT',
              info: stu.maSV
            }
            this.props.dispatch(action)
          }}>Xóa</button>
          <button type="button" className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" onClick={() => {
            let action = {
              type: 'WATCH_STUDENT',
              info: stu
            }
            this.props.dispatch(action)
          }}>Xem</button>
        </td>

      </tr>
    })
  }
  render() {
    return (
      <div className='mx-40 my-7 shadow '>
        <div className="p-5  bg-slate-400 flex justify-between items-center	">
          <h3 className="text-lg font-medium leading-6 text-gray-900">DANH SÁCH SINH VIÊN</h3>
          <div className="flex justify-center">
            <div className=" xl:w-96">
              <div className="input-group relative flex items-stretch w-full ">
                <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Nhập vào mã sinh viên" aria-label="Search" aria-describedby="button-addon3" onChange={(e) => {
                  let action = {
                    type: 'SEARCH_STUDENT',
                    info: e.target.value
                  }
                  this.props.dispatch(action)
                }} />
                <button className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Search</button>
              </div>
            </div>
          </div>
        </div>
        <table className="border-collapse table-auto w-full text-sm ">
          <thead className='bg-slate-900 '>
            <tr className='pt-5'>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left">Mã SV</th>
              <th className="border-b dark:border-slate-600 font-medium p-4 py-3 text-slate-400 dark:text-slate-200 text-left">Họ tên</th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 py-3 text-slate-400 dark:text-slate-200 text-left">Số điện thoại</th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 py-3 text-slate-400 dark:text-slate-200 text-left">Email</th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 py-3 text-slate-400 dark:text-slate-200 text-left">Action</th>

            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">

            {this.renderListStu()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    listStu: rootReducer.manageStuReducer.listStu,
    isSearching: rootReducer.manageStuReducer.isSearching,
    listSearch: rootReducer.manageStuReducer.listSearch,
  }
}

const componentListStudent = connect(mapStateToProps)(ListStudent);
export default componentListStudent;
