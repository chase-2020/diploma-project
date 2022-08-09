import React, { useState, useRef ,useEffect} from 'react';
import { Button, Tag, Space, Menu, message, Descriptions, Avatar, Popconfirm,Select } from 'antd';
import { PlusOutlined,  } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormSelect,
	DrawerForm,
	ProFormDatePicker,
	ProFormTextArea,
	ProFormUploadButton,
} from '@ant-design/pro-form';
import styles from './index.less';

import request from 'umi-request';
import axios from 'axios'
import moment from 'moment';
import Field from '@ant-design/pro-field';
import dayjs from 'dayjs'
import {findCoach,updateCoach,createCoach,destroyCoach} from '../../services/ant-design-pro/api'

function Coach() {
	const actionRef = useRef();
	// 创建一个表单指向 目的是为了得到一个 表单实例
	const editFrom = useRef(null);
	// 弹出状态，默认隐藏窗口false
	const [showEditModal, setShowEditModal] = useState(false)

	const [coachPhoto,setCoachPhoto] = useState([])

	const [cgList, setcgList] = useState();
	useEffect(() => {
		(async () => {
		  const _res = await axios.post('http://127.0.0.1:7001/admin/merchantAdmin/find');
		  const { success, res } = _res.data;
		  if (success) {
			const { rows } = res;
			const _temarr = [];
			for (const item of rows) {
			  _temarr.push({
				value: item.mid,
				label: item.name,
			  });
	
			}
			setcgList(_temarr);
		  }
		})();
	  }, []);
	const columns = [
		{
			title: '教练编号',
			dataIndex: 'coachId',
			ellipsis: true, // 是否支持缩略
			search: true,  //不显示搜索表单
			align: 'center',
		},
		{
			title: '场馆运营商ID',
			dataIndex: 'mid',
			ellipsis: true, // 是否支持缩略
			search: false,  //不显示搜索表单
			align: 'center',
		},
		// {
		// 	title: '教练头像',
		// 	dataIndex: 'coachPhoto',
		// 	ellipsis: true,
		// 	search: false,
		// 	hideInTable: true,
		// },
		{
			title: '教练姓名',
			dataIndex: 'coachName',
			search: true,
			align: 'center',
		},
		{
			title: '教练性别',
			dataIndex: 'coachSex',
			ellipsis: true,
			search: false,
			align: 'center',
			filters: true,
			onFilter: true,
            valueType:'select',
            valueEnum:{
				0: { text: '男', status: 'Success' },
				1: { text: '女', status: 'Success' },
            },
			render(_, record) {
				const { coachSex } = record;
				let _coachSex = ''
				if (coachSex == 0) _coachSex = "男"
				if (coachSex == 1) _coachSex = "女"
				return (
					<div>{_coachSex}</div>
				)
			},

		},
		{
			title: '教练类型',
			dataIndex: 'coachType',
			ellipsis: true,
			search: false,
			align: 'center',
			filters: true,
			onFilter: true,
            valueType:'select',
            valueEnum:{
				0: { text: '馆内教练', status: 'Success' },
				1: { text: '私人教练', status: 'Success' },
            },
			render(_, record) {
				const { coachType } = record;
				let _coachType = ''
				if (coachType == 0) _coachType = "馆内教练"
				if (coachType == 1) _coachType = "私人教练"
				return (
					<div>{_coachType}</div>
				)
			},
		},
		{
			title: '教练电话',
			dataIndex: 'coachPhone',
			copyable: true,
			search: true,
			align: 'center',
		},
		// {
		// 	title: '教练微信',
		// 	dataIndex: 'wxOpenId',
		// 	copyable: true,
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '教练邮箱',
		// 	dataIndex: 'emil',
		// 	copyable: true,
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '教练QQ',
		// 	dataIndex: 'coachQq',
		// 	copyable: true,
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '教练擅长的运动',
		// 	dataIndex: 'coachSports',
		// 	ellipsis: true,
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		{
			title: '教练个人简介',
			dataIndex: 'coachIntro',
			copyable: true,
			ellipsis: true,
			search: false,
			align: 'center',
			hideInTable: true,
		},
		// {
		// 	title: '课程价格',
		// 	dataIndex: 'coursePrice',
		// 	// width:'100px',
		// 	search: false,
		// 	align: 'center',
		// },
		// {
		// 	title: '课程时长',
		// 	dataIndex: 'courseDuration',
		// 	search: false,
		// 	align: 'center',
		// },
		// {
		// 	title: '训练地址',
		// 	dataIndex: 'trainAddress',
		// 	copyable: true,
		// 	ellipsis: true,
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '证书',
		// 	dataIndex: 'zhengShu',
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '等级',
		// 	dataIndex: 'dengJi',
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '身高',
		// 	dataIndex: 'hight',
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '体重',
		// 	dataIndex: 'weight',
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '教练个人地址',
		// 	dataIndex: 'personAddress',
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '生日',
		// 	dataIndex: 'birthday',
		// 	search: false,
		// 	align: 'center',
		// 	render(_, record) {
		// 		const { birthday } = record;
		// 		let _birthday = dayjs(birthday).format('YYYY-MM-DD');
		// 		return (
		// 			<div>{_birthday}</div>
		// 		)
		// 	},
		// },
		// {
		// 	title: '创建时间',
		// 	dataIndex: 'createdAt',
		// 	search: false,
		// 	align: 'center',
		// 	hideInTable: true,
		// },
		// {
		// 	title: '更新时间',
		// 	dataIndex: 'updatedAt',
		// 	search: false,
		// 	align: 'center',
		// },
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
						const resTow = await destroyCoach({
							coachId: record.coachId,
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
						<Descriptions.Item label="教练编号">
							<Field text={record.coachId} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="场馆运营商ID">
							<Field text={record.mid} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练头像">
							<Field text={record.coachPhoto} valueType="avatar" />
						</Descriptions.Item>
						<Descriptions.Item label="教练姓名">
							<Field text={record.coachName} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练性别">
							<Field 
								text={record.coachSex}
								valueType="text" 
								render={(coachSex,record) =>{
									let _coachSex = ''
									if (coachSex == 0) _coachSex = "男"
									if (coachSex == 1) _coachSex = "女"
									return (
										<div>{_coachSex}</div>
									)
								}}
							/>
						</Descriptions.Item>
						<Descriptions.Item label="教练类型">
							<Field 
								text={record.coachType} 
								valueType="text"
								render={(coachType,record) =>{
									let _coachType = ''
									if (coachType == 0) _coachType = "馆内教练"
									if (coachType == 1) _coachType = "私人教练"
									return (
										<div>{_coachType}</div>
									)
								}}
							/>
						</Descriptions.Item>
						<Descriptions.Item label="教练电话">
							<Field text={record.coachPhone} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练微信">
							<Field text={record.wxOpenId} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练邮箱">
							<Field text={record.emil} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练QQ">
							<Field text={record.coachQq} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练擅长的运动">
							<Field text={record.coachSports} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练个人简介">
							<Field text={record.coachIntro} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="课程价格">
							<Field text={record.coursePrice} valueType="money" />
						</Descriptions.Item>
						<Descriptions.Item label="课程时长">
							<Field text={record.courseDuration} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="训练地址">
							<Field text={record.trainAddress} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="证书">
							<Field text={record.zhengShu} valueType="image" />
						</Descriptions.Item>
						<Descriptions.Item label="等级">
							<Field text={record.dengJi} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="身高">
							<Field text={record.hight} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="体重">
							<Field text={record.weight} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练个人地址">
							<Field text={record.personAddress} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="生日">
							<Field text={record.birthday} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="创建时间">
							<Field text={record.createdAt} valueType="dateTime" />
						</Descriptions.Item>
						<Descriptions.Item label="更新时间">
							<Field text={record.updatedAt} valueType="dateTime" />
						</Descriptions.Item>
					</Descriptions>
				</DrawerForm>,
			],
		},
	];

	const coachType = [
		{
			value: "0",
			label: '馆内教练',
		},
		{
			value: "1",
			label: '私人教练',
		},
	];

	const sexType = [
		{
			value: "0",
			label: '男',
		},
		{
			value: "1",
			label: '女',
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
				rowKey="coachId"
				request={async (params) => {
					//根据搜索
					const { pageSize, current, coachName, coachType, coachPhone, wxOpenId, coachQq, coursePrice } = params;
					//查询对象属性值
					const postData = {}
					if (coachName) postData.coachName = coachName;
					if (coachType) postData.coachType = coachType;
					if (coachPhone) postData.coachPhone = coachPhone;
					if (wxOpenId) postData.wxOpenId = wxOpenId;
					if (coachQq) postData.coachQq = coachQq;
					if (coursePrice) postData.coursePrice = coursePrice;
					const resOne = await findCoach({
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
						success
					}
				}}
				toolBarRender={() => [
					<ModalForm
						title="添加教练"
						trigger={
							<Button type="primary">
								<PlusOutlined /> 添加教练
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
							const dataTime = dayjs(values.birthday).valueOf();
							console.log('coachPhoto.toString()',coachPhoto.toString())

							const res1 = await createCoach({
								//字段名不为空
								coachName: values.coachName,
								coachType: values.coachType,
								coachPhone: values.coachPhone,
								wxOpenId: values.wxOpenId,
								coachSports: values.coachSports,
								password: values.password,
								//字段名
								mid:values.mid,
								coachSex: values.coachSex,
								coachQq: values.coachQq,
								coursePrice: values.coursePrice,
								courseDuration: values.courseDuration,
								coachPhoto: coachPhoto.toString(),
								emil: values.emil,
								trainAddress: values.trainAddress,
								zhengShu: values.zhengShu,
								dengJi: values.dengJi,
								hight: values.hight,
								weight: values.weight,
								personAddress: values.personAddress,
								birthday: dataTime,
							})
							const { success, data } = res1;
							// console.log('aaaaa',success)
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
							<ProFormUploadButton
								name="coachPhoto"
								label="教练头像"
								max={1}
								rules={[{ required: true, message: '必填' }]}
								data={ (file)=>{
									return {
										file:file,
										type:abc
									}
								}}
								fieldProps={{
									name: 'file',
									listType: 'picture-card',
								}}
								action="http://127.0.0.1:7001/common/upload"
								onChange={
									async (val) => {
										let res = []
										for(const item of val.fileList){
											if(item.response) res.push(item.response.url)
										}
										setCoachPhoto(res)
										console.log("res",res)
									}
								}
							/>
						</ProForm.Group>
						<div>
							<ProForm.Group>
								<ProFormText width="md" name="coachName" label="教练姓名" placeholder="请输入姓名" tooltip="最长为 24 位" />
								<ProFormSelect width="md" name='coachSex' label="教练性别" options={sexType} />
							</ProForm.Group>
							<ProForm.Group>
								<ProFormSelect width="md" name="coachType" label="教练类型" options={coachType} />
								<ProFormText width="md" name="coachPhone" label="教练电话" placeholder="请输入电话" />
							</ProForm.Group>
							{/* <ProForm.Group>
								<ProFormText width="md" name="wxOpenId" label="教练微信" placeholder="请输入微信" />
								<ProFormText width="md" name="coachQq" label="教练QQ" placeholder="请输入QQ" />
							</ProForm.Group>
							<ProForm.Group>
								<ProFormText width="md" name="coachSports" label="教练擅长的运动" placeholder="请输入擅长的运动" />
								<ProFormText width="md" name="emil" label="教练邮箱" placeholder="请输入教练邮箱" />
							</ProForm.Group>
							<ProForm.Group>
								<ProFormText width="xl" name="coachIntro" label="教练个人简介" placeholder="请输入个人简介" />
							</ProForm.Group>
							<ProForm.Group>
								<ProFormText width="md" name="coursePrice" label="课程价格" placeholder="请输入课程价格" />
								<ProFormText width="md" name="courseDuration" label="课程时长" placeholder="请输入课程时长址" />
							</ProForm.Group>
							<ProForm.Group>
								<ProFormText width="xl" name="trainAddress" label="训练地址" placeholder="请输入训练地址" />
							</ProForm.Group>
							<ProForm.Group>
								<ProFormText width="md" name="zhengShu" label="证书" placeholder="请输入你的证书" />
								<ProFormText width="md" name="dengJi" label="等级" placeholder="请输入你的证书等级" />
							</ProForm.Group> */}
							{/* <ProForm.Group>
								<ProFormText width="md" name="hight" label="身高" placeholder="请输入身高" />
								<ProFormText width="md" name="weight" label="体重" placeholder="请输入体重" />
							</ProForm.Group> */}
							<ProForm.Group>
								<ProFormSelect width="md" name="mid" label="场馆运营商" placeholder="请选择场馆运营商" options={cgList}/>
								<ProFormText width="md" name="password" label="登录密码" placeholder="请输入教练登录密码" />
								{/* <Select
									name="mid"
								    label="运营商"
									placeholder="请输入运营商"
									showSearch
								
									style={{ width: 330 }}
									defaultActiveFirstOption={false}
									showArrow={false}
									filterOption={false}
								
									notFoundContent={null}
								>
									{options}
								</Select> */}
							</ProForm.Group>
						
							{/* <ProForm.Group>
								<ProFormText width="xl" name="personAddress" label="教练个人地址" placeholder="请输入教练个人地址" />
							</ProForm.Group>
							<ProForm.Group>
								<ProFormDatePicker width="md" name="birthday" label="生日" placeholder="请输入你的生日" />
							</ProForm.Group> */}
						</div>
					</ModalForm>
				]}
			/>
			<ModalForm
				title="修改场馆"
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
					const data = dayjs(values.birthday).valueOf();
					console.log("b",data)


					const resUpdate = await updateCoach({
						coachId: values.coachId,

						//字段名不为空
						coachName: values.coachName,
						coachType: values.coachType,
						coachPhone: values.coachPhone,
						wxOpenId: values.wxOpenId,
						coachSports: values.coachSports,
						coachIntro: values.coachIntro,
						//字段名
						coachSex: values.coachSex,
						coachQq: values.coachQq,
						coursePrice: values.coursePrice,
						courseDuration: values.courseDuration,
						// coachPhoto: values.coachPhoto,
						emil: values.emil,
						trainAddress: values.trainAddress,
						zhengShu: values.zhengShu,
						dengJi: values.dengJi,
						hight: values.hight,
						weight: values.weight,
						personAddress: values.personAddress,
						birthday: data,
						updatedAt: Date.now(),
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
					<ProFormText width="md" name="coachId" label="当前教练编号" disabled tooltip="最长为 24 位" />
					<ProFormText width="md" name="coachName" label="教练姓名" tooltip="最长为 24 位" placeholder="请输入教练姓名" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="coachPhone" label="教练电话" placeholder="请输入教练电话" />
					<ProFormSelect width="md" name="coachSex" label="教练性别" options={sexType} placeholder="请选择教练性别" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect width="md" name='coachType' label="教练类型" options={coachType} placeholder="请选择教练类型" />
					<ProFormText width="md" name="wxOpenId" label="教练微信" placeholder="请输入教练微信" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="coachQq" label="教练QQ" placeholder="请输入教练QQ" />
					<ProFormText width="md" name="emil" label="教练邮箱" placeholder="请输入教练邮箱" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="coursePrice" label="课程价格" placeholder="请输入课程价格" />
					<ProFormText width="md" name="courseDuration" label="课程时长" placeholder="请输入课程时长址" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="coachSports" label="教练擅长的运动" placeholder="请输入教练擅长的运动" />
					<ProFormText width="md" name="zhengShu" label="证书" placeholder="请输入你的证书" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="dengJi" label="等级" placeholder="请输入你的证书等级" />
					<ProFormText width="md" name="hight" label="身高" placeholder="请输入身高" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="md" name="weight" label="体重" placeholder="请输入体重" />
					<ProFormDatePicker width="md" name="birthday" label="生日" placeholder="请输入你的生日" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormTextArea width="xl" name="coachIntro" label="教练个人简介" placeholder="请输入教练个人简介" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="xl" name="trainAddress" label="训练地址" placeholder="请输入训练地址" />
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText width="xl" name="personAddress" label="教练个人地址" placeholder="请输入教练个人地址" />
				</ProForm.Group>
			</ModalForm>
		</PageContainer>
	)
}

export default Coach;
        