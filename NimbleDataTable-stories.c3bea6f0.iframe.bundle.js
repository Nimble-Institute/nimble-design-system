"use strict";(self.webpackChunknimble_design_system=self.webpackChunknimble_design_system||[]).push([[312],{"./stories/NimbleDataTable.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Datatable:()=>Datatable,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Nimble Design/Nimble Data Table",component:_src__WEBPACK_IMPORTED_MODULE_1__.Ll,parameters:{docs:{iframeHeight:600,previewSource:"open"}}},Datatable={args:{columnData:[{label:"Name",dataPoint:"name",sort:!0,filter:!0,width:"20%"},{label:"Email",dataPoint:"email",sort:!0,filter:!0,width:"30%"},{label:"User Roles",dataPoint:"roles",sort:!0,filter:!0,width:"20%"},{label:"Autherization",dataPoint:"autherization",sort:!0,filter:!0,width:"20%",component:item=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{display:"flex",width:"50%",flexDirection:"row",height:"20px",alignItems:"center",justifyContent:"center",backgroundColor:"#0057A2",borderRadius:"5px",color:"#fff"},children:item.autherization})}],data:[{name:"Manoj Gamachchige",email:"manoj@nimble.com",roles:"admin",autherization:"user"},{name:"Rylie Gamachchige",email:"rylie.amelia@gmail.com",roles:"admin",autherization:"user"},{name:"Anuja Ulpathakubura",email:"anuja@nimble.com",roles:"admin",autherization:"user"},{name:"Max.L",email:"max@nimble.com",roles:"super-admin",autherization:"super"}],paginationData:{totalPage:10,page:3,onPageChnage:(event,value)=>{alert(value)}},dataViewEnable:!0,dataDeleteEnable:!0,dataEditEnable:!0,onChangeSearchText:searchvalue=>{alert(searchvalue)},searchPlaceHolder:"search user data",mainActionLabel:"Add some Data",onChangeColumnFilters:(value,dataPoint)=>{alert(value+"-"+dataPoint)},onClickDeleteRow:()=>alert("open row delete dialog"),onClickEditeRow:()=>alert("open row edit dialog"),onClickVieweRow:()=>alert("openrow view dialog")}};Datatable.parameters={...Datatable.parameters,docs:{...Datatable.parameters?.docs,source:{originalSource:"{\n  args: {\n    columnData: [{\n      label: 'Name',\n      dataPoint: 'name',\n      sort: true,\n      filter: true,\n      width: '20%'\n    }, {\n      label: 'Email',\n      dataPoint: 'email',\n      sort: true,\n      filter: true,\n      width: '30%'\n    }, {\n      label: 'User Roles',\n      dataPoint: 'roles',\n      sort: true,\n      filter: true,\n      width: '20%'\n    }, {\n      label: 'Autherization',\n      dataPoint: 'autherization',\n      sort: true,\n      filter: true,\n      width: '20%',\n      component: (item: any) => <div style={{\n        display: 'flex',\n        width: '50%',\n        flexDirection: 'row',\n        height: '20px',\n        alignItems: 'center',\n        justifyContent: 'center',\n        backgroundColor: '#0057A2',\n        borderRadius: '5px',\n        color: '#fff'\n      }}>\n            {item.autherization}\n          </div>\n    }],\n    data: [{\n      name: 'Manoj Gamachchige',\n      email: 'manoj@nimble.com',\n      roles: 'admin',\n      autherization: 'user'\n    }, {\n      name: 'Rylie Gamachchige',\n      email: 'rylie.amelia@gmail.com',\n      roles: 'admin',\n      autherization: 'user'\n    }, {\n      name: 'Anuja Ulpathakubura',\n      email: 'anuja@nimble.com',\n      roles: 'admin',\n      autherization: 'user'\n    }, {\n      name: 'Max.L',\n      email: 'max@nimble.com',\n      roles: 'super-admin',\n      autherization: 'super'\n    }],\n    paginationData: {\n      totalPage: 10,\n      page: 3,\n      onPageChnage: (event: any, value: number) => {\n        alert(value);\n      }\n    },\n    dataViewEnable: true,\n    dataDeleteEnable: true,\n    dataEditEnable: true,\n    onChangeSearchText: searchvalue => {\n      alert(searchvalue);\n    },\n    searchPlaceHolder: 'search user data',\n    mainActionLabel: 'Add some Data',\n    onChangeColumnFilters: (value, dataPoint) => {\n      alert(value + '-' + dataPoint);\n    },\n    onClickDeleteRow: () => alert('open row delete dialog'),\n    onClickEditeRow: () => alert('open row edit dialog'),\n    onClickVieweRow: () => alert('openrow view dialog')\n  }\n}",...Datatable.parameters?.docs?.source}}};const __namedExportsOrder=["Datatable"]}}]);