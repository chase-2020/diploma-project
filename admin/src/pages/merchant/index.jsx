import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Popconfirm, Descriptions,Upload, } from 'antd';
import { PlusOutlined,  } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ModalForm,
	ProFormText,
	DrawerForm,
} from '@ant-design/pro-form';
import styles from './index.less';
import request from 'umi-request';
import moment from 'moment';
import Field from '@ant-design/pro-field';
import dayjs from 'dayjs'

import {boss, bossCreate,bossUpdate,bossDestroy} from '../../services/ant-design-pro/api'

function SdUser() {

	// 弹窗刷新页面
	const actionRef = useRef();
	// 创建一个表单指向 目的是为了得到一个 表单实例
	const editFrom = useRef(null);

	// 编辑 弹出状态，默认隐藏窗口false
	const [showEditModal, setShowEditModal] = useState(false)

	// 添加运营商封面，接收url
	const [coverPhoto,setCoverPhoto] = useState([])

	// 获取运营商封面
	const [getCover,setGetCover]  = useState([])

	// 显示运营商封面图
	const [pictureAddress,setpictureAddress] = useState([])
	useEffect(()=>{
		setpictureAddress( [{url:getCover}] )
	},[getCover])

	const columns = [
		{
			title: '商家编号',
			dataIndex: 'mid',
			ellipsis: true, // 是否支持缩略
			sorter: (a, b) => a.mid - b.mid,
			align: 'center',
		},
		{
			title: '场馆运营商编号',
			dataIndex: 'mNum',
			ellipsis: true, // 是否支持缩略
			sorter: (a, b) => a.mNum - b.mNum,
			align: 'center',
		},
		{
			title: '运营商名称',
			dataIndex: 'name',
			search: true, //是显示搜索表单
			align: 'center',
		},
		{
			title: '账号',
			dataIndex: 'ID',
			ellipsis: true,
			search: false,
			align: 'center',
		},
		{
			title: '运营商联系电话',
			dataIndex: 'phone',
			search: false,
			align: 'center',
			sorter: (a, b) => a.phone - b.phone,
		},
		{
			title: '运营商地址',
			dataIndex: 'operatorAddress',
			ellipsis: true,
			search: false,
			hideInTable: true,  // 隐藏此列
			align: 'center',
		},
		{
			title: '操作',
			valueType: 'option',
			align: 'center',
			render: (text, record, san, action) => [
				<a onClick={() => {
					setShowEditModal(true);

					if(record.pictureAddress === null ){
						setGetCover('')
					} else{
						setGetCover( record.pictureAddress);
					}
					editFrom.current.setFieldsValue(record);
				}}>
					编辑
				</a>,
				<Popconfirm
					title="是否删除？"
					okText="是"
					cancelText="否"
					onConfirm={async () => {
						console.log('record.mid',record.mid)

						const resTow = await bossDestroy({
							mid: record.mid,
						})

						const { success } = resTow;
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
                        <Descriptions.Item label="商家编号">
							<Field text={record.mid} valueType="digit" />
						</Descriptions.Item>
						
						<Descriptions.Item label="场馆运营商编号">
							<Field text={record.mNum} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="运营商名称">
							<Field text={record.name} valueType="text" />
						</Descriptions.Item>
                        <Descriptions.Item label="运营商联系电话">
							<Field text={record.phone} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="账号">
							<Field text={record.ID} valueType="text" />
						</Descriptions.Item>
                        <Descriptions.Item label="运营商地址">
							<Field text={record.operatorAddress} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="运营商封面图">
          					<Field text={record.pictureAddress} valueType="image"/>
        				</Descriptions.Item>
					</Descriptions>
				</DrawerForm>,
			],
		},
	];
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
				headerTitle="运营商管理表格"
				//EditableProTable - 可编辑表格
				rowKey="mid"
				request={async (params) => {
					// params用于查询
					const { pageSize, current, mid, name, mNum} = params;
					const postData = {};
					if (mid) postData.mid = mid;
					if (name) postData.name = name;
					if (mNum) postData.mNum = mNum;
					const resOne = await boss({
						page: current,
						limit: pageSize,
						...postData
					})
					//获取data里面的res数据

					const { success, rows, count} = resOne.res;
					const total = count;
					const data = rows;
					// 格式化返回数据

					return {
						total,
						data,
						success
					}
				}}
				toolBarRender={() => [
					<ModalForm
						title="添加运营商"
						trigger={
							<Button type="primary">
								<PlusOutlined /> 添加运营商
							</Button>
						}
						modalProps={{
							onCancel: () => console.log('取消'),
						}}
						onVisibleChange={() => {
							actionRef.current.reload();
						}}
						onFinish={async (values) => {

							// const resCreate = await axios.post('http://127.0.0.1:7001/admin/sdUser/create', {
							// 	name: values.name,
							// 	phone: values.phone,
							// 	operatorAddress: values.operatorAddress,
							// 	ID:ID,
							// 	coverPhoto:coverPhoto.toString(),
							// })

							console.log('make request')
							const resCreate = await	bossCreate({
								name: values.name,
								phone: values.phone,
								operatorAddress: values.operatorAddress,
								ID:values.ID,
								pictureAddress:coverPhoto.toString(),
								mNum:values.mNum,

							})
			
							console.log(resCreate)
							if(resCreate.success==true){
								message.success(resCreate.info);
								console.log('123',123)
								return true
							} 
							else {
								message.warning(resCreate.errorMessage);
								console.log(resCreate.info)
								console.log('123',123)
								return false
							}

							// const { success } = resCreate;
							// console.log('success',success)
							// if (success) {
							// 	message.success(resCreate.info);
							// 	return true;
							// } else {
							// 	message.success(resCreate.info);
							// 	return false
							// }
							
						}}
					>
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
							{'+ 运营商封面'}
						</Upload>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="name" label="运营商名称" tooltip="最长为 24 位" placeholder="请输入名称" rules={[{ required: true, message: '必填' }]}/>
							<ProFormText width="md" name="phone" label="运营商联系电话" placeholder="请输入运营商联系电话" rules={[{ required: true, message: '必填' }]}/>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="ID" label="账号" placeholder="请输入运营商ID(数字)" rules={[{ required: true, message: '必填' }]}/>
							<ProFormText width="md" name="mNum" label="账号" placeholder="请输入场馆运营商编号" rules={[{ required: true, message: '必填' }]}/>

						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="xl" name="operatorAddress" label="运营商地址" placeholder="请输入运营商地址" rules={[{ required: true, message: '必填' }]}/>
						</ProForm.Group>
					</ModalForm>
				]}
			/>
			{/* ProTable */}
			{/* 编辑 */}
			<ModalForm
				title="修改运营商"
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
					console.log('getCover',getCover)
					const resUpdate = await bossUpdate({
						mid: values.mid,
						name: values.name,
						phone: values.phone,
						operatorAddress: values.operatorAddress,
						pictureAddress:getCover.toString(),
						ID:values.ID,
						mNum:values.mNum,
					})

					const { success } = resUpdate;
					if (success) {
						message.success('提交成功');
						// 关闭窗口
						setShowEditModal(false)
						// 触发（onVisibleChange）刷新
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
						fileList={pictureAddress}
						maxCount={1}
						onRemove={
							(asd)=>{
								setGetCover('')
								console.log('我是修改图片的asd',asd)
							}
						}
						onChange={
							async (val) => {
								// console.log('我是修改图片的val',val)
								const { fileList} = val;
								setpictureAddress([...fileList])
								// console.log('我是修改图片的resArr前-----',resArr)
								for(const item of fileList){
									if(item.response){
										console.log('我是修改图片的item.response.url',item.response.url)
										setGetCover(item.response.url)
									}
								}
							}
						}
					>
						{'+ 运营商封面'}
					</Upload>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="mid" label="当前商家编号" disabled tooltip="最长为 24 位" />
					<ProFormText width="md" name="mNum" label="当前场馆运营商编号" tooltip="最长为 24 位" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="phone" label="运营商联系电话" placeholder="请输入运营商联系电话" rules={[{ required: true, message: '必填' }]}/>
					<ProFormText width="md" name="ID" label="账号" placeholder="请输入账号" rules={[{ required: true, message: '必填' }]} />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="xl" name="operatorAddress" label="运营商地址" placeholder="请输入运营商地址" bordered='true' rules={[{ required: true, message: '必填' }]}/>
				</ProForm.Group>
			</ModalForm>
		</PageContainer>
        
	)
}

export default SdUser;