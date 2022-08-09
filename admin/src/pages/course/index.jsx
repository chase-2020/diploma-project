import React, { useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Tag, Space, Menu, message,Descriptions,Popconfirm } from 'antd';
import { PlusOutlined,EditOutlined } from '@ant-design/icons';
import request from 'umi-request';
import axios from 'axios'
import dayjs from "dayjs"

import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  DrawerForm,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { useState } from 'react';
import Field from '@ant-design/pro-field';


function Course() {

  // 弹窗刷新页面
  const actionRef = useRef();
  // 创建一个表单指向 目的是为了得到一个 表单实例
  const editFrom = useRef(null);
  const editFromOne = useRef(null);
  // 弹出状态，默认隐藏窗口false
  const  [ showEditModal,setShowEditModal] = useState(false)

  const columns= [
 
    {
      title: '课程编号',
      dataIndex: 'courseId',
      copyable: true, // 是否支持复制
      ellipsis: true, // 是否支持缩略
      // 第二行不允许编辑,index !== 0;
      //text:取得相对应dataIndex的sdid该行值, record:行内容, index:行下标，从0开始
      editable: (text, record, index) => {
        console.log('index',index)
        console.log('record',record)
        console.log('text',text)
        return index !== index;
      },
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      copyable: true, // 是否支持复制
      search: false, //是否显示搜索表单，传入对象时为搜索表单的配置
    },
    {
      title: '教练姓名',
      dataIndex: 'coachName',
      ellipsis: true, // 是否支持缩略
      search: true,  //显示搜索表单
    },
    {
      title: '授课类型',
      dataIndex: 'type',
      search: false,  //不显示搜索表单
      filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType:'select',
      valueEnum:{
        0: { text: '一对一', status: 'Default' },
        1: { text: '一对多', status: 'Processing' },
      },
      render(_,record){
        const { type } = record;
        let _typestr = ''
        if(type==0) _typestr="一对一"
        if(type==1) _typestr="一对多"
        return ( 
          <div>{_typestr}</div>
        )
      }
    },
    {
      title: '授课场地',
      dataIndex: 'serverPlace',
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
      
    },
    {
      title: '课程类型',
      dataIndex: 'courseType',
      ellipsis: true, // 是否支持缩略
      search: true,  //显示搜索表单
      filters: true, 
      onFilter: true,
      valueType:'select',
      valueEnum:{
        1: { text: '足球', status: 'Default' },
        2: { text: '篮球', status: 'Processing' },
        3: { text: '排球', status: 'Success' },
        4: { text: '网球', status: 'Error' },
        5: { text: '乒乓球', status: 'Error' },
        6: { text: '桌球', status: 'Error' },
        7: { text: '羽毛球', status: 'Error' },
      },
      render(_,record){
        const { courseType } = record;
        let _courseTypestr = ''
        if(courseType==1)_courseTypestr="足球"
        if(courseType==2)_courseTypestr="篮球"
        if(courseType==3)_courseTypestr="排球"
        if(courseType==4)_courseTypestr="网球"
        if(courseType==5)_courseTypestr="乒乓球"
        if(courseType==6)_courseTypestr="桌球"
        if(courseType==7)_courseTypestr="羽毛球"
        return ( 
          <div>{_courseTypestr}</div>
        )
      }
    },
    {
      title: '课程价格',
      dataIndex: 'price',
      search: false,  //不显示搜索表单
    },

    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
          <Button onClick={  ()=>  {  
            setShowEditModal(true); 
            
            record.startTime = dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss')
            
            
            editFrom.current.setFieldsValue(record) 
            
          } }>编辑</Button>, 

          <Popconfirm
					title="确定要删除吗？"
					okText="是"
					cancelText="否"
					onConfirm={async () => {
						const resTow = await axios.post('http://127.0.0.1:7001/admin/course/destroy', {
							courseId: record.courseId,
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
						<Descriptions.Item label="课程编号">
							<Field text={record.courseId} valueType="digit" />
						</Descriptions.Item>
            <Descriptions.Item label="课程名称">
							<Field text={record.courseName} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="教练姓名">
							<Field text={record.coachName} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="授课类型">
							<Field 
								text={record.type}
								valueType="text" 
								render={(type,record) =>{
									let _type = ''
									if (type == 0) _type = "一对一"
									if (type == 1) _type = "一对多"
									return (
										<div>{_type}</div>
									)
								}}
							/>
						</Descriptions.Item>
						<Descriptions.Item label="课程类型">
							<Field 
								text={record.courseType} 
								valueType="text"
								render={(courseType,record) =>{
									let _courseType = ''
									if (courseType == 1) _courseType = "足球"
									if (courseType == 2) _courseType = "篮球"
                  if (courseType == 3) _courseType = "排球"
									if (courseType == 4) _courseType = "网球"
                  if (courseType == 5) _courseType = "乒乓球"
									if (courseType == 6) _courseType = "桌球"
                  if (courseType == 7) _courseType = "游泳"
									return (
										<div>{_courseType}</div>
									)
								}}
							/>
						</Descriptions.Item>
						<Descriptions.Item label="授课场地">
							<Field text={record.serverPlace} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="课程价格">
							<Field text={record.price} valueType="money" />
						</Descriptions.Item>
						<Descriptions.Item label="教练电话">
							<Field text={record.coachPhone} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="课程开办方">
            <Field 
								text={record.sponsor}
								valueType="text" 
								render={(sponsor,record) =>{
									let _sponsor = ''
									if (sponsor == 1) _sponsor = "场馆课程"
									if (sponsor == 2) _sponsor = "私人教练课程"
									return (
										<div>{_sponsor}</div>
									)
								}}
							/>
						</Descriptions.Item>
						<Descriptions.Item label="教练编号">
							<Field text={record.coachId} valueType="digit" />
						</Descriptions.Item>
						<Descriptions.Item label="课程可约时间">
							<Field text={record.appointmenTime} valueType="dateTime" />
						</Descriptions.Item>
						<Descriptions.Item label="课程所属场馆编号">
							<Field text={record.sdid} valueType="digit" />
						</Descriptions.Item>
						<Descriptions.Item label="课程开始时间">
							<Field text={record.startTime} valueType="dateTime" />
						</Descriptions.Item>
						<Descriptions.Item label="课程结束时间">
							<Field text={record.endTime} valueType="dateTime" />
						</Descriptions.Item>
            <Descriptions.Item label="课程最少开课人数">
							<Field text={record.courseMinNumber} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="课程可预约的人数">
							<Field text={record.courseMaxNumber} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="课程已预约人数">
							<Field text={record.ReservedNumber} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="课程简介">
							<Field text={record.courseIntroduction} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="课程须知">
							<Field text={record.courseNotice} valueType="text" />
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

  const jobType = [
    {
      value: "0",
      label: '一对一',
    },
    {
      value: "1",
      label: '一对多',
    },
  ];

  const jobType1 = [
    {
      value: "1",
      label: '足球',
    },
    {
      value: "2",
      label: '篮球',
    },
    {
      value: "3",
      label: '排球',
    },
    {
      value: "4",
      label: '网球',
    },
    {
      value: "5",
      label: '乒乓球',
    },
    {
      value: "6",
      label: '桌球',
    },
    {
      value: "7",
      label: '羽毛球',
    },
  ];

  const jobType2 = [
    {
      value: "1",
      label: '场馆课程',
    },
    {
      value: "2",
      label: '私教课程',
    },
  ];

    return (
        <PageContainer>
             <ProTable
                  columns={columns}

                  // 弹窗刷新页面
				          actionRef={actionRef}

                  //搜索表单
                  search={{
                    //标签的宽度
                    labelWidth: 'auto',
                  }} 

                  /* 默认一页显示多少数据 */
                  pagination={{
                    pageSize: 20,
                  }}

                  /* 转化 moment 格式数据为特定类型，false 不做转化 */
                  dateFormatter="string"

                  /* 列表头部主标题 */
                  headerTitle="课程管理表格"

                  //行的 key，一般是行 id
                  rowKey="courseId"
                  
                  //EditableProTable - 可编辑表格
                //   editable={{
                //     type: 'multiple',
                //     //3个参数:行ID，行内容，行内容，undefined
                //     onSave: async (rowKey, data) => {
                //         console.log('修改',rowKey);
                //         await axios.post('http://127.0.0.1:7001/admin/course/update',{
                //         courseId:data.courseId,
                //         courseName:data.courseName,
                //         coachId:data.coachId,
                //         type:data.type,
                //         price:data.price,
                //         serverPlace:data.serverPlace,
                //     })
                //     },
                //     //3个参数:行ID，行内容，undefined    
                //     onDelete: async (rowId,rowData) => {
                //       const resTow = await axios.post('http://127.0.0.1:7001/admin/course/destroy',{
                //         courseId:rowData.courseId,
                //       })
                //       //拿接口返回来的状态(success)值true或者false
                //       const { success} = resTow.data;
                //       if(success){
                //         message.success('删除成功');
                //         return true;
                //       } else {
                //         message.success('删除失败');
                //         return false
                //       }
                //     }, 

                // }}
                request={async (params) => {
                        console.log('params',params)
                        const { pageSize,current,courseId,courseType,coachName}  = params;

                        const postData = {}
                        if(courseId) postData.courseId = courseId;
                        if(courseType) postData.courseType = courseType;
                        if(coachName) postData.coachName = coachName;
                        const resOne = await axios.post('http://127.0.0.1:7001/admin/course/findAll',{
                          page: current,
                          limit:pageSize,
                          ...postData

                        })
                        //res接口有多少条数据
                        console.log(resOne)
                        console.log(resOne.data)
                        const { success,res } = resOne.data;
                        const total = res.count;
                        const data = res.rows;
                        
                        return {
                          total,
                          data,
                          success
                        }
                }}

                form={{
                  // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                  syncToUrl: (values, type) => {
                    if (type === 'get') {
                      return {
                        ...values,
                        created_at: [values.startTime, values.endTime],
                      };
                    }
                    return values;
                  },
                }}

                toolBarRender={ () => [
                                  <ModalForm
                                        title="添加课程"

                                        trigger={
                                          <Button type="primary">
                                                  <PlusOutlined />
                                                  添加课程
                                          </Button>
                                        }

                                        //弹窗刷新
                                        onVisibleChange={() => {
                                          actionRef.current.reload();
                                        }}

                                        modalProps={{
                                          onCancel: () => console.log('run'),  
                                        }}

                                        onFinish={async (values) => {
                                              const res1 = await  axios.post('http://127.0.0.1:7001/admin/course/create',{
                                                    courseName: values.courseName,
                                                    courseIntroduction: values.courseIntroduction,
                                                    type: values.type,
                                                    courseType: values.courseType,
                                                    coachPhone: values.coachPhone,
                                                    serverPlace: values.serverPlace,
                                                    coachName:values.coachName,
                                                    price:values.price,
                                                    sponsor:values.sponsor,
                                                    appointmenTime:values.appointmenTime,
                                                    startTime:values.startTime,
                                                    endTime:values.endTime,
                                                    courseMaxNumber:values.courseMaxNumber,
                                                    ReservedNumber:values.ReservedNumber,
                                                    courseIntroduction:values.courseIntroduction,
                                                    courseNotice:values.courseNotice,
                                                    sdid:values.sdid,
                                                    courseMinNumber:values.courseMinNumber,
                                              })
                                              const { success,data} = res1.data;
                                              if(success){
                                                message.success('提交成功');
                                                return true;
                                              } else {
                                                message.success('提交失败');
                                                return false
                                              }
                                        }}
                                  >
                                                      <ProForm.Group>
                                                            <ProFormText
                                                                    width="md"
                                                                    name="courseName"
                                                                    label="课程名称"
                                                                    tooltip="最长为 24 位"
                                                                    placeholder="请输入名称"
                                                            />
                                                            <ProFormSelect width="md" name='courseType' label="课程类型"  options={jobType1} />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormText width="md" name="coachName" label="教练姓名" placeholder="请输入教练姓名" />
                                                            <ProFormText width="md" name="coachPhone" label="教练联系电话" placeholder="请输入教练联系电话" />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormSelect width="md" name='type' label="授课类型"  options={jobType} />
                                                            <ProFormText width="md" name="courseIntroduction" label="课程简介" placeholder="请输入课程简介" />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormText width="md" name="serverPlace" label="授课场地" placeholder="请输入授课场地" />
                                                            <ProFormText width="md" name="price" label="课程定价" placeholder="请输入金额" />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormSelect width="md" name="sponsor" label="课程开办方" options={jobType2} />
                                                            <ProFormDateTimePicker width="md" name="appointmenTime" label="课程可约时间" placeholder="请选择时间" />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormDateTimePicker width="md" name="startTime" label="课程开始时间" placeholder="请选择时间" />
                                                            <ProFormDateTimePicker width="md" name="endTime" label="课程结束时间" placeholder="请选择时间" />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormText width="md" name='courseMaxNumber' label="课程可预约的人数"  placeholder="请输入人数" />
                                                            <ProFormText width="md" name='ReservedNumber' label="课程已预约人数"  placeholder="请输入人数" />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormText width="md" name='courseIntroduction' label="课程简介"  placeholder="请输入内容" />
                                                            <ProFormText width="md" name='courseNotice' label="课程须知"  placeholder="请输入内容" />
                                                      </ProForm.Group>
                                                      <ProForm.Group>
                                                            <ProFormText width="md" name='sdid' label="课程所属场馆编号"  placeholder="请输入编号" />
                                                            <ProFormText width="md" name='courseMinNumber' label="课程最少开课人数"  placeholder="请输入人数" />
                                                      </ProForm.Group>
                                  </ModalForm>
                ]}
            />

                      <ModalForm
                                title="修改课程信息"
                                //弹窗是否打开
                                visible={showEditModal}
                                //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
                                formRef={editFrom}
                                modalProps={{
                                  //取消窗口时触发
                                  onCancel: () => setShowEditModal(false)
                                }}

                                  //弹窗刷新
                                  onVisibleChange={() => {
                                    actionRef.current.reload();
                                  }}

                                onFinish={async (values) => {
                                  // values.startTime = values.startTime.getTime()
                                  // console.log(values.startTime)
                                      // console.log('values',values)
                                      // console.log('values.sdid111',values.sdid)
                                      values.startTime = dayjs(values.startTime).valueOf()

                                      const resUpdate = await  axios.post('http://127.0.0.1:7001/admin/course/update',{
                                            courseId:values.courseId,
                                            courseName:values.courseName,
                                            type:values.type,
                                            courseType:values.courseType,
                                            serverPlace:values.serverPlace,
                                            coachPhone:values.coachPhone,
                                            price:values.price,
                                            coachName:values.coachName,
                                            appointmenTime:values.appointmenTime,
                                            sdid:values.sdid,
                                            startTime:values.startTime,
                                            endTime:values.endTime,
                                            courseMaxNumber:values.courseMaxNumber,
                                            ReservedNumber:values.ReservedNumber,
                                            courseIntroduction:values.courseIntroduction,
                                            courseNotice:values.courseNotice,
                                            courseMinNumber:values.courseMinNumber,
                                            courseImage:values.courseImage,
                                            sponsor:values.sponsor,
                                      })
                                      // console.log('values.sdid222',values.sdid)
                                      const { success,data} = resUpdate.data;
                                      if(success){
                                        message.success('修改成功');
                                        //关闭窗口
                                        setShowEditModal(false)
                                        return true;
                                      } else {
                                        message.success('修改失败');
                                        return false
                                      }
                                }}
                            >
                                        <ProForm.Group>
                                              <ProFormText width="md" name="courseId" label="课程编号" disabled tooltip="最长为 24 位"  />
                                              <ProFormText width="md" name="courseName" label="课程名称" tooltip="最长为 24 位" placeholder="请输入课程名称" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormSelect width="md" name="type" label="授课类型" placeholder="请输入活动类型" options={jobType} />
                                              <ProFormSelect width="md" name="courseType" label="课程类型" placeholder="请输入课程类型" options={jobType1} />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormText width="md" name='coachName' label="教练姓名"  placeholder="请输入教练姓名" />
                                              <ProFormText width="md" name="coachPhone" label="教练联系电话" placeholder="请输入教练联系电话" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormText width="md" name='price' label="课程价格"  placeholder="请输入价格" />
                                              <ProFormText width="md" name='serverPlace' label="授课场地"  placeholder="请输入授课地址" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormDateTimePicker width="md" name='appointmenTime' label="课程可约时间"  placeholder="请输入时间" />
                                              <ProFormText width="md" name='sdid' label="课程所属场馆编号"  placeholder="请输入编号" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormDateTimePicker width="md" name='startTime' label="课程开始时间"  placeholder="请输入时间" />
                                              <ProFormDateTimePicker width="md" name='endTime' label="课程结束时间"  placeholder="请输入时间" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormText width="md" name='courseMaxNumber' label="课程可预约的人数"  placeholder="请输入人数" />
                                              <ProFormText width="md" name='ReservedNumber' label="课程已预约人数"  placeholder="请输入人数" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormText width="md" name='courseIntroduction' label="课程简介"  placeholder="请输入内容" />
                                              <ProFormText width="md" name='courseNotice' label="课程须知"  placeholder="请输入内容" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormText width="md" name='courseMinNumber' label="课程最少开课人数"  placeholder="请输入内容" />
                                              <ProFormText width="md" name='courseImage' label="课程相关图片"  placeholder="请输入内容" />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                              <ProFormSelect width="md" name='sponsor' label="课程开办方"  options={jobType2} />
                                        </ProForm.Group>
                                        {/* <ProForm.Group>
                                              <ProFormDateTimePicker width="md" name='startTime2' label="课程开始时间"  placeholder="请输入时间" />
                                              <ProFormText width="md" name='endTime1' label="课程结束时间"  placeholder="请输入时间" />
                                        </ProForm.Group> */}
                      </ModalForm>

        </PageContainer>
    )
}


export default Course;

