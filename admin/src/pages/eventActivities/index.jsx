import React, { useState, useRef ,useEffect} from 'react';
import { Button, message, Descriptions, Popconfirm } from 'antd';
import { PlusOutlined, } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormSelect,
	DrawerForm,
} from '@ant-design/pro-form';

import Field from '@ant-design/pro-field';
import dayjs from 'dayjs'
import { eventActivitiesAll,evenTcreate,evenUpdate,evenDestroy,eventFindAll } from '@/services/ant-design-pro/api'
var asd = console.log.bind(document)
function Coach() {
	const actionRef = useRef();
	// 创建一个表单指向 目的是为了得到一个 表单实例
	const editFrom = useRef(null);
	// 弹出状态，默认隐藏窗口false
	const [showEditModal, setShowEditModal] = useState(false)

	// 下拉查询赛事活动名称
	const [venueType, setVenueType] = useState();
	useEffect(() => {
		(async () => {
			const _res = await eventFindAll();
			const { success, res } = _res;
			if (success) {
				const { rows } = res;
				let obj = {}
				for (const item of rows) {
					obj[item.actId]={text:item.theme}
				}
				asd('obj',obj)
				setVenueType(obj);
			}
		})();
	}, []);

	// 下拉修改赛事活动名称
	const [xuigai, setXuigai] = useState();
	useEffect(() => {
		(async () => {
			const _res = await eventFindAll();
			const { success, res } = _res;
			if (success) {
				const { rows } = res;
				let arr = []
				for (const item of rows) {
					arr.push({value:item.actId,label:item.theme})
				}
				asd('arr',arr)
				setXuigai(arr);
			}
		})();
	}, []);

	const columns = [
		{
			title: '登记id',
			dataIndex: 'rid',
			ellipsis: true, // 是否支持缩略
			search: false,  //显示搜索表单
			align: 'center',
			sorter: (a, b) => a.rid - b.rid,
		},
		{
			title: '登记编号',
			dataIndex: 'djNum',
			ellipsis: true,
			search: true,
			align: 'center',
		},
		{
			title: '赛事活动名称',
			dataIndex: 'actid',
			search: true,
			align: 'center',
			filters: true,
			onFilter: true,
			valueType:'select',
            valueEnum:venueType,
		},
		{
			title: '报名用户id1',
			dataIndex: 'uid',
			ellipsis: true,
			search: true,
			align: 'center',
		},
		{
			title: '姓名',
			dataIndex: 'name',
			ellipsis: true,
			search: true,
			align: 'center',
		},
		{
			title: '联系电话',
			dataIndex: 'phone',
			ellipsis: true,
			search: true,
			align: 'center',
			sorter: (a, b) => a.phone - b.phone,
		},
		{
			title: '身份证号',
			dataIndex: 'ID',
			search: true,
			align: 'center',
		},
		{
			title: '通讯地址',
			dataIndex: 'address',
			search: false,
			align: 'center',
		},
		{
			title: '身体健康情况',
			dataIndex: 'healthy',
			search: false,
			align: 'center',
		},
		{
			title: '报名状态',
			dataIndex: 'registrationStatus',
			search: false,
			align: 'center',
			filters: true,
			onFilter: true,
			valueType:'select',
            valueEnum:{
				1: { text: '报名成功' },
				2: { text: '审核不通过' },
				3: { text: '已取消' },
				4: { text: '审核中' },

            },
		},
		{
			title: '操作',
			valueType: 'option',
			align: 'center',
			render: (text, record, _, action) => [
				<a onClick={() => { setShowEditModal(true); 
					record.birthday = dayjs(record.birthday).format('YYYY-MM-DD')
					editFrom.current.setFieldsValue(record)
				 }}>编辑</a>,
				<Popconfirm
					title="是否删除？"
					okText="是"
					cancelText="否"
					onConfirm={async () => {
						const resTow = await evenDestroy({
							djNum: record.djNum,
						})
						//拿接口返回来的状态(success)值true或者false
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
					<a href="#">删除</a>
				</Popconfirm>,
				<DrawerForm
					width="800px"
					title="全部数据"
					trigger={
						<a type="primary"> 更多 </a>
					}
					onFinish={async () => {
                        return true;
                    }}
					onVisibleChange={() => {
						actionRef.current.reload();
					}}
				>
					<Descriptions
						bordered
						// 2列数据
						column={1}
					>
						<Descriptions.Item label="登记id">
							<Field text={record.rid} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="登记编号">
							<Field text={record.djNum} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="赛事活动名称">
							<Field  text={record.actid} valueType="text" 
									render={(Status,record) =>{
										let _Status = ''
										for (const item of xuigai) {
											if (Status == item.value) _Status = item.label
										}
										return (
											<div>{_Status}</div>
										)
									}}
							/>
						</Descriptions.Item>
						<Descriptions.Item label="报名用户id1">
							<Field text={record.uid} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="姓名">
							<Field text={record.name}valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="联系电话">
							<Field text={record.phone} valueType="text"/>
						</Descriptions.Item>
						<Descriptions.Item label="身份证号">
							<Field text={record.ID} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="通讯地址">
							<Field text={record.address} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="身体健康情况">
							<Field text={record.healthy} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="报名状态">
							<Field  text={record.registrationStatus} valueType="text" 
									render={(Status,record) =>{
										let _Status = ''
										if (Status == 1) _Status = "报名成功"
										if (Status == 2) _Status = "审核不通过"
										if (Status == 3) _Status = "已取消"
										if (Status == 4) _Status = "审核中"
										return (
											<div>{_Status}</div>
										)
									}}
							/>
						</Descriptions.Item>
					</Descriptions>
				</DrawerForm>,
			],
		},
	];

	const joinType = [
		{
			value: 1,
			label: '报名成功',
		},
		{
			value: 2,
			label: '审核不通过',
		},
		{
			value: 3,
			label: '已取消',
		},
		{
			value: 4,
			label: '审核中',
		},
		
	]
	return (
		<PageContainer>
			<ProTable
				actionRef={actionRef}
				columns={columns}
				search={{
					labelWidth: 'auto',
				}}
				/* 默认一页显示多少数据 */
				pagination={{
					pageSize: 20,
				}}
				/* 转化 moment 格式数据为特定类型，false 不做转化 */
				dateFormatter="string"
				/* 列表头部主标题 */
				headerTitle="教练信息"
				//行的 key，一般是行 id
				rowKey="rid"
				request={async (params) => {
					//根据搜索
					const { pageSize, current, djNum, actid, uid, name, phone, ID } = params;
					//查询对象属性值
					const postData = {}
					if (djNum) postData.djNum = djNum;
					if (actid) postData.actid = actid;
					if (uid) postData.uid = uid;
					if (name) postData.name = name;
					if (phone) postData.phone = phone;
					if (ID) postData.ID = ID;
					const resOne = await eventActivitiesAll({
						page: current,
						limit: pageSize,
						...postData
					})
					console.log(resOne)
					//res接口有多少条数据
					const { success, res } = resOne;
					const total = res.count;
					const data = res.rows;
					return {
						total,
						data,
						success,
					}
				}}
				toolBarRender={() => [
					<ModalForm
						title="添加报名信息"
						trigger={
							<Button type="primary">
								<PlusOutlined /> 添加报名信息
							</Button>
						}
						modalProps={{
							onCancel: () => console.log('取消'),
						}}
						onVisibleChange={() => {
							// 刷新
							actionRef.current.reload();
						}}
						onFinish={async (values) => {

							const res1 = await evenTcreate({
								djNum: values.djNum,
								actid: values.actid,
								uid: values.uid,
								name: values.name,
								phone: values.phone,
								ID: values.ID,
								address: values.address,
								healthy: values.healthy,
								registrationStatus: values.registrationStatus,
							})
							const { success } = res1;
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
							<ProFormText width="md" name="rid" label="登记id"/>
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="djNum" label="登记编号" placeholder="请输入登记编号" />
							<ProFormText width="md" name="uid" label="报名用户id" placeholder="请输入报名用户id1" />
						</ProForm.Group>
						<ProForm.Group>
							<ProFormSelect width="md" name="actid" label="赛事活动名称" placeholder="请输入赛事活动名称" options={xuigai} />
							<ProFormText width="md" name="name" label="姓名" placeholder="请输入姓名" />
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="phone" label="联系电话" placeholder="请输入联系电话" />
							<ProFormText width="md" name="ID" label="身份证号" placeholder="请输入身份证号" />
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="md" name="healthy" label="身体健康情况" placeholder="请输入身体健康情况" />
							<ProFormSelect width="md" name='registrationStatus' label="报名状态" options={joinType} />
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText width="xl" name="address" label="通讯地址" placeholder="请输入通讯地址" />
						</ProForm.Group>
					</ModalForm>
				]}
			/>
			<ModalForm
				title="修改报名信息"
				visible={showEditModal}
				formRef={editFrom}
				modalProps={{
					//取消窗口时触发
					onCancel: () => setShowEditModal(false)
				}}
				onVisibleChange={() => {
					// 刷新
					actionRef.current.reload();
				}}
				onFinish={async (values) => {
					const resUpdate = await evenUpdate({
						rid: values.rid,

						djNum: values.djNum,
						actid: values.actid,
						uid: values.uid,
						name: values.name,
						phone: values.phone,
						ID: values.ID,
						address: values.address,
						healthy: values.healthy,
						registrationStatus: values.registrationStatus,
					})
					const { success } = resUpdate;
					if (success) {
						message.success('提交成功');
						//关闭窗口
						setShowEditModal(false)
						// 刷新
						actionRef.current.reload();
					} else {
						message.success('提交失败');
						return false
					}
				}}
			>
				<ProForm.Group>
					<ProFormText width="md" name="rid" disabled label="登记id"/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="djNum" label="登记编号" disabled placeholder="请输入登记编号" />
					<ProFormText width="md" name="uid" label="报名用户id" disabled placeholder="请输入报名用户id1" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect width="md" name="actid" label="赛事活动名称" disabled placeholder="请输入赛事活动名称" options={xuigai} />
					<ProFormText width="md" name="name" label="姓名" placeholder="请输入姓名" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="phone" label="联系电话" placeholder="请输入联系电话" />
					<ProFormText width="md" name="ID" label="身份证号" placeholder="请输入身份证号" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="healthy" label="身体健康情况" placeholder="请输入身体健康情况" />
					<ProFormSelect width="md" name='registrationStatus' label="报名状态" options={joinType} />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="xl" name="address" label="通讯地址" placeholder="请输入通讯地址" />
				</ProForm.Group>
			</ModalForm>
		</PageContainer>
	)
}

export default Coach;
        