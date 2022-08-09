import React, { useState, useRef, useEffect } from 'react';
import { Button, Tag, Space, message, Select, Popconfirm, Descriptions,Image,Upload,TimePicker } from 'antd';
import { PlusOutlined,  } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormSelect,
	DrawerForm,
    ProFormTextArea,
	ProFormTimePicker,
} from '@ant-design/pro-form';
import styles from './index.less';
import request from 'umi-request';
import axios from 'axios';
import moment from 'moment';
import Field from '@ant-design/pro-field';
import dayjs from 'dayjs'
import {findCourt,createCourt,updateCourt} from '@/services/ant-design-pro/api'

function SdUser() {

	// 营业开始时间
	const [startTime,setStartTime]  = useState('')
	const [kaiShi,setKaiShi]  = useState('')

	// 营业结束时间
	const [endTime,setEndTime]  = useState('')
	useEffect(()=>{
		setKaiShi(startTime)
	},[startTime])

	// 弹窗刷新页面
	const actionRef = useRef();
	// 创建一个表单指向 目的是为了得到一个 表单实例
	const editFrom = useRef(null);

	// 编辑 弹出状态，默认隐藏窗口false
	const [showEditModal, setShowEditModal] = useState(false)

	// 添加场馆平面图，接收url
	const [uploadImg,setUploadImg]  = useState([])

	// 获取场馆平面图
	const [plan,setPlan]  = useState([])

	// 显示场馆平面图
	const [edFileList,setEdFileList] = useState([])
	useEffect(()=>{
		// console.log('useEffect里的plan',plan)
		setEdFileList( [{url:plan}] )
		// console.log('useEffect里的edFileList',edFileList)
	},[plan])

	// 修改场馆平面图，接收url
	const [edList,setEdList] = useState([])

	// 添加场馆封面，接收url
	const [coverPhoto,setCoverPhoto] = useState([])

	// 获取场馆封面
	const [getCover,setGetCover]  = useState([])

	// 显示场馆封面图
	const [showCover,setShowCover] = useState([])
	useEffect(()=>{
		setShowCover( [{url:getCover}] )
	},[getCover])

/* 	查找场馆所有类型
	const [venueType, setVenueType] = useState();
	useEffect(() => {
		(async () => {
			const _res = await findCourt();
			const { success, res } = _res;
			if (success) {
				const { rows } = res;
				const _temarr = [];
				for (const item of rows) {
					_temarr.push({
						value: item.mid,
						label: item.type,
					});
				}

				setVenueType(_temarr);
			}
		})();
	  }, []); */

	const columns = [
		{
			title: '场馆编号',
			dataIndex: 'ctid',
			ellipsis: true, // 是否支持缩略
			sorter: (a, b) => a.ctid - b.ctid,
			align: 'center',
		},
		{
			title: '场馆名称',
			dataIndex: 'name',
			search: true, //是显示搜索表单
			align: 'center',
		},
		{
			title: '场馆联系电话',
			dataIndex: 'phone',
			search: false,
			align: 'center',
			sorter: (a, b) => a.phone - b.phone,
		},
		{
			title: '场馆类型',
			dataIndex: 'type',
			search: true,
			align: 'center',
			filters: false,
			onFilter: true,
            valueType:'select',// select 下拉框 checkbox 多选框 radio 单选框 switch 单选多选
            valueEnum:{
                1: { text: '篮球',  },
                2: { text: '足球',  },
                3: { text: '羽毛球',  },
                4: { text: '网球',  },
                5: { text: '乒乓球',  },
            },
            // 当filters: false,则拿到rec.type;列的筛选菜单项会消失,但是查询模块的多选框不消失
            // valueEnum(rec) {
            //     
            //     // const { type } = rec;
            // },
			//渲染值
			//参数1：type的值，参数2：行的内容属于对象
			render(_, record) {
                // console.log('record',record);
				const { type } = record;
				let typeArr = typeof type === 'string' ? type.split(',') : []// ["1", "2", "3"]
				const typeArrOne = []
				let _typestr = ''
				for (const i of typeArr) {
					if (i == 1) _typestr = "篮球"
					if (i == 2) _typestr = "足球"
					if (i == 3) _typestr = "羽毛球"
					if (i == 4) _typestr = "网球"
                    if (i == 5) _typestr = "乒乓球"
					typeArrOne.push(_typestr)
				}
				return (
					<div>{typeArrOne.join('、')}</div>
				)
			}
		},
		{
			title: '营业时间',
			dataIndex: 'time',
			ellipsis: true,
			search: false,
			align: 'center',
		},
		{
			title: '收费标准',
			dataIndex: 'retes',
			ellipsis: true,
			search: false,
			align: 'center',
			sorter: (a, b) => a.retes - b.retes,
		},
		{
			title: '场馆简介',
			dataIndex: 'sdInfo',
			ellipsis: true,
			search: false,
			align: 'center',
		},
		{
			title: '场馆地址',
			dataIndex: 'siteAddress',
			ellipsis: true,
			search: false,
			hideInTable: true,  // 隐藏此列
			align: 'center',
		},
		{
			title: '操作',
			valueType: 'option',
			align: 'center',
			//text:未知 record:行内容 san:第几行,从0开始 action:未知
			render: (text, record, san, action) => [
				<a onClick={() => {
					
					// 判断网页渲染的场馆类型是否属于字符串，是进行转数组
					// 用于多选下拉框，在弹窗界面正常显示羽毛球，乒乓球等多个内容
					if (typeof record.type == 'string') record.type = record.type.split(',');
					// 图片
					setPlan( record.plan);

					// 不允许数据库plan，coverPhoto为null
					if(record.plan === null ){
						setPlan('')
					} else {
						setPlan( record.plan);
					};
					if(record.coverPhoto === null ){
						setGetCover('')
					} else{
						setGetCover( record.coverPhoto);
					}
					// 营业时间
					let timeStr = record.time.split(' ')
					setStartTime(timeStr[0])
					setEndTime(timeStr[2])

					// 把表单数据传入弹窗
					//setFieldsValue设置表单的值(form表单)
					editFrom.current.setFieldsValue(record);
					setShowEditModal(true);
				}}>
					编辑
				</a>,
				<Popconfirm
					title="是否删除？"
					okText="是"
					cancelText="否"
					onConfirm={async () => {
						console.log('record.ctid',record.ctid)
						const resTow = await axios.post('http://127.0.0.1:7001/admin/sdUser/destroy', {
							ctid: record.ctid,
						})
						//拿接口返回来的状态(success)值true或者false
						const { success } = resTow.data;
						if (success) {
							message.success('删除成功');
							actionRef.current.reload();
							return true;
						} else {
							message.success('删除失败');
							return false
						}
					}}
				>
					<a>删除</a>
				</Popconfirm>,
				<DrawerForm
                    // DrawerForm没有modalProps={{onCancel: () => {}}}取消时触发
					width="800px"
					title="全部数据"
					trigger={
						<a type="primary" > 更多 </a>
					}
                    onFinish={async () => {
                        // 确认按钮 触发关闭弹窗
                        return true;
                      }}
					onVisibleChange={() => {
						actionRef.current.reload();
					}}
				>
					<Descriptions
                        // 有边框
						bordered
						// 2列数据
						column={1}
					>
                        <Descriptions.Item label="场馆编号">
							<Field text={record.ctid} valueType="digit" />
						</Descriptions.Item>
						<Descriptions.Item label="场馆名称">
							<Field text={record.name} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="收费标准">
							<Field text={record.retes} valueType="text" />
						</Descriptions.Item>
                        <Descriptions.Item label="场馆简介"
                        	//包含列的数量 实际占了3列
							span={1}
                        >
							<Field text={record.sdInfo} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="场馆类型">
							<Field 
                                text={record.type} 
                                valueType="type" 
                                render={(type,b)=> {
                                    let typeArr = typeof type === 'string' ? type.split(',') : []// ["1", "2", "3"]
                                    const typeArrOne = []
                                    let _typestr = ''
                                    for (const i of typeArr) {
                                        if (i == 1) _typestr = "篮球"
                                        if (i == 2) _typestr = "足球"
                                        if (i == 3) _typestr = "羽毛球"
                                        if (i == 4) _typestr = "网球"
                                        if (i == 5) _typestr = "乒乓球"
                                        typeArrOne.push(_typestr)
                                    }
                                    return (
                                        <div>{typeArrOne.join('、')}</div>
                                    )
                                }}
                            />
						</Descriptions.Item>
                        <Descriptions.Item label="场馆联系电话">
							<Field text={record.phone} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="营业时间">
							<Field 
								// text={dayjs(record.time).format('YYYY-MM-DD')} 
								
								text={record.time} 
								valueType="text" 
								// render={(time,record) =>{
								// 	let _time = dayjs(time).format('YYYY-MM-DD');
								// 	return (
								// 		<div>{_time}</div>
								// 	)
								// }}
							/>
						</Descriptions.Item>
						<Descriptions.Item label="包场类型">
							<Field 
								text={record.bcType} 
								valueType="text"
								render={(bcType,record) =>{
									let _bcType = ''
									if (bcType == 1) _bcType = "半场"
									if (bcType == 2) _bcType = "全场"
									return (
										<div>{_bcType}</div>
									)
								}} 
							/>
						</Descriptions.Item>
						<Descriptions.Item label="场馆运营商编号">
							<Field text={record.mid} valueType="text" />
						</Descriptions.Item>
                        <Descriptions.Item label="场馆地址">
							<Field text={record.siteAddress} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="场馆封面图">
          					<Field text={record.coverPhoto} valueType="image"/>
        				</Descriptions.Item>
						<Descriptions.Item label="场馆平面图">
          					<Field text={record.plan} valueType="image"/>
        				</Descriptions.Item>
					</Descriptions>
				</DrawerForm>,
			],
		},
	];

	const jobType = [
		{
			value: '1',
			label: '篮球',
		},
		{
			value: '2',
			label: '足球',
		},
		{
			value: '3',
			label: '羽毛球',
		},
		{
			value: '4',
			label: '网球',
		},
        {
			value: '5',
			label: '乒乓球',
		},
	];
	const bcType = [
		{
			value: "1",
			label: '半场',
		},
		{
			value: "2",
			label: '全场',
		},
	]
	return (
		<PageContainer>
			<ProTable
				// 渲染表单数据第一行
				columns={columns}
				// 弹窗刷新页面
				actionRef={actionRef}
				// 搜索表单
				search={{
					// 标签的宽度
					labelWidth: 'auto',
				}}
				// 默认一页显示多少数据
				pagination={{ pageSize: 20 }}
				// 转化 moment 格式数据为特定类型，false 不做转化
				dateFormatter="number"
				// 列表头部主标题
				headerTitle="场馆管理表格"
				//EditableProTable - 可编辑表格
				rowKey="ctid"
				request={async (params) => {
					// params用于查询
					const { pageSize, current, ctid, name, type, mid } = params;
					const postData = {};
					if (ctid) postData.ctid = ctid;
					if (name) postData.name = name;
                    // if (type) postData.type = type;
					let storage = window.localStorage;
					postData.mid = storage.mid;
					if (type) postData.type = type.toString();
					// 发起请求,请求所有数据
					const resOne = await findCourt({
						page: current,
						limit: pageSize,
						...postData
					})
					//获取data里面的res数据
					const { success, res } = resOne;
					const total = res.count;
					const data = res.rows;
					// 格式化返回数据
					return {
						total,
						data,
						success
					}
				}}
				toolBarRender={() => [
					<ModalForm
						title="添加场馆"
						trigger={
							<Button type="primary">
								<PlusOutlined /> 添加场馆
							</Button>
						}
						modalProps={{
							onCancel: () => console.log('取消'),
						}}
						onVisibleChange={() => {
							actionRef.current.reload();
						}}
						onFinish={async (values) => {
							let typeArr = values.type.sort().toString()
							console.log('values.time',values.time)
							
							const dataTime = values.time[0]+" 至 "+values.time[1]

							const resCreate = await createCourt({
								name: values.name,
								sdInfo: values.sdInfo,
								type: typeArr,
								phone: values.phone,
								siteAddress: values.siteAddress,
								retes: values.retes,
								plan: uploadImg.toString(),
								bcType:values.bcType,
								mid:values.mid,
								time:dataTime,
								coverPhoto:coverPhoto.toString(),
							})
							const { success } = resCreate;
							if (success) {
								message.success('提交成功');
								return true;
							} else {
								message.success('提交失败');
								return false
							}
						}}
					>
						<ProForm.Group>
							<Upload
							action="http://127.0.0.1:7001/common/upload"
							listType="picture-card"
							maxCount={1}
							onChange={
								async (val) => {
									console.log('我是添加图片的val',val)
										let res = []
										for(const item of val.fileList){
											if(item.response) res.push(item.response.url)
										}
										setUploadImg(res)
								}
							}
							>
								{'+ 场馆平面图'}
							</Upload>
						</ProForm.Group>
						<ProForm.Group>
							<Upload
								action="http://127.0.0.1:7001/common/upload"
								listType="picture-card"
								maxCount={1}
								onChange={
									async (val) => {
										// console.log('我是添加图片的val',val)
											let res = []
											for(const item of val.fileList){
												if(item.response) res.push(item.response.url)
											}
											setCoverPhoto(res)
									}
								}
							>
								{'+ 场馆封面'}
							</Upload>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="name" label="场馆名称" tooltip="最长为 24 位" placeholder="请输入名称" rules={[{ required: true, message: '必填' }]}/>
							<ProFormText width="md" name="retes" label="收费标准" placeholder="请输入场馆收费标准" rules={[{ required: true, message: '必填' }]}/>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="phone" label="场馆联系电话" placeholder="请输入场馆联系电话" rules={[{ required: true, message: '必填' }]}/>
							<ProFormSelect width="md" name="bcType" label="包场类型" options={bcType} placeholder="请选择包场类型" />
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="mid" label="场馆运营商编号" placeholder="请输入场馆运营商编号" rules={[{ required: true, message: '必填' }]}/>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormTimePicker.RangePicker name="time" label="营业时间" 
								format="HH:mm"
								initialValue={[moment('9:00:00', 'HH:mm:ss'),moment('19:00:00', 'HH:mm:ss')]}
							/>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormSelect width="xl" name='type' label="场馆类型" mode="multiple" options={jobType} rules={[{ required: true, message: '必填' }]}/>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormTextArea  width="xl" name="sdInfo" label="场馆简介" placeholder="请输入场馆简介" rules={[{ required: true, message: '必填' }]}/>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="xl" name="siteAddress" label="场馆地址" placeholder="请输入场馆地址" rules={[{ required: true, message: '必填' }]}/>
						</ProForm.Group>
					</ModalForm>
				]}
			/>
			{/* ProTable */}
			{/* 编辑 */}
			<ModalForm
				title="修改场馆"
				//弹窗是否打开
				visible={showEditModal}
				//通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
				formRef={editFrom}
				modalProps={{
					//取消窗口时触发
					onCancel: () => {
						setShowEditModal(false)
					}
				}}
				// visible (窗口)改变时触发，需要弹窗return true;
				onVisibleChange={() => {
					// 刷新
					actionRef.current.reload();
				}}
				onFinish={async (values) => {
					// 把类型数组转换为字符串放入数据库
					let typeArr = values.type.sort().toString()
					// 判断是否有图片
					if(plan === null ) setPlan(' ')
					if(getCover === null ) setGetCover('')
					// 营业时间
					const dataTime = values.timell[0]+" 至 "+values.timell[1]
					// 修改请求
					const resUpdate = await updateCourt({
						ctid: values.ctid,
						name: values.name,
						sdInfo: values.sdInfo,
						type: typeArr,
						phone: values.phone,
						siteAddress: values.siteAddress,
						retes: values.retes,
						plan: plan.toString(),
						coverPhoto:getCover.toString(),
						bcType:values.bcType,
						mid:values.mid,
						time:dataTime,
					})
					const { success } = resUpdate;
					if (success) {
						message.success('提交成功');
						// 关闭窗口
						setShowEditModal(false)
						return true;
					} else {
						message.success('提交失败');
						return false
					}
				}}
			>
				<ProForm.Group>
					<Upload
						action="http://127.0.0.1:7001/common/upload"
						listType="picture-card"
						fileList={edFileList}
						maxCount={1}
						// 删除图片
						onRemove={
							(asd)=>{
								setPlan('')
							}
						}
						onChange={
							async (val) => {
								const { fileList} = val;
								setEdFileList([...fileList])

								// let resArr = [plan]
								for(const item of fileList){
									if(item.response){
										// res.push(item.response.url)
										console.log('我是修改图片的item.response.url',item.response.url)
										setPlan(item.response.url)
										// if(item.response) resArr.push(item.response.url)
									}
								}
								// setEdList(resArr)
							}
						}
					>
						{'+ 场馆平面图'}
					</Upload>
				</ProForm.Group>
				<ProForm.Group>
					<Upload
						action="http://127.0.0.1:7001/common/upload"
						listType="picture-card"
						fileList={showCover}
						maxCount={1}
						onChange={
							async (cover) => {
								const { fileList} = cover;
								setShowCover([...fileList])
								for(const item of fileList){
									if(item.response){
										setGetCover(item.response.url)
									}
								}
							}
						}
					>
						{'+ 场馆封面'}
					</Upload>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="ctid" label="当前场馆编号" disabled tooltip="最长为 24 位" />
					<ProFormText width="md" name="name" label="场馆名称" tooltip="最长为 24 位" placeholder="请输入场馆名称" rules={[{ required: true, message: '必填' }]}/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="retes" label="收费标准" placeholder="请输入场馆收费标准" rules={[{ required: true, message: '必填' }]}/>
					<ProFormText width="md" name="phone" label="场馆联系电话" placeholder="请输入场馆联系电话" rules={[{ required: true, message: '必填' }]}/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect width="md" name="bcType" label="包场类型" options={bcType} placeholder="请选择包场类型" />
					<ProFormText width="md" name="mid" label="场馆运营商编号" placeholder="请输入场馆运营商编号" rules={[{ required: true, message: '必填' }]}/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormTimePicker.RangePicker 
						name="timell" 
						label="营业时间" 
						format="HH:mm"
						initialValue={[moment('00:00:00', 'HH:mm:ss'),moment('00:00:00', 'HH:mm:ss')]}
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormTextArea  width="xl" name="sdInfo" label="场馆简介" placeholder="请输入场馆简介" rules={[{ required: true, message: '必填' }]}/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect width="xl" name='type' label="场馆类型" mode="multiple" options={jobType} rules={[{ required: true, message: '必填' }]}/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="xl" name="siteAddress" label="场馆地址" placeholder="请输入场馆地址" bordered='true' rules={[{ required: true, message: '必填' }]}/>
				</ProForm.Group>
			</ModalForm>
		</PageContainer>
        
	)
}

export default SdUser;
