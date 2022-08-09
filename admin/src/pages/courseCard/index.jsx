import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Popconfirm, Descriptions, Upload, } from 'antd';
import { PlusOutlined,  } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormSelect,
	DrawerForm,
    ProFormDateTimePicker,
} from '@ant-design/pro-form';
import dayjs from 'dayjs'
import moment from 'moment';
import Field from '@ant-design/pro-field';
import {cardfindAll,cardCreate,cardUpdate,cardDelete} from '@/services/ant-design-pro/api'
/* 
    ourseCard
    vipIp 会员卡编号
    vipNumber 会员卡号
    endTime 会员卡到期时间
    vipType 会员卡类型（1：年卡，2：月卡，3：季卡，4，周卡，5：次卡，6：半年卡)
    vipIntegral 会员卡积分
    vipStae 会员卡状态（1:可用，2：不可用)
    vipQian 会员卡折后价格
    vipMoney 会员卡价格
    vipImg 会员卡图片
    vipDays 会员卡有效天数
    vipCiShu 会员卡可使用次数
*/
var asd = console.log.bind(document)

function CourseCard() {
    const  [ showCi,setShowCi] = useState(0)
    // 弹窗刷新页面
    const actionRef = useRef();
    // 创建一个表单指向 目的是为了得到一个 表单实例
    const editFrom = useRef(null);
    // 弹出状态，默认隐藏窗口false
    const  [ showEditModal,setShowEditModal] = useState(false)

	// 添加场馆封面，接收url
	const [coverPhoto,setCoverPhoto] = useState([])

	// 获取场馆封面
	const [getCover,setGetCover]  = useState([])

	// 显示场馆封面图
	const [showCover,setShowCover] = useState([])
	useEffect(()=>{
		setShowCover( [{url:getCover}] )
	},[getCover])

    const columns= [
 
        {
            title: '会员卡编号',
            dataIndex: 'vipIp',
            copyable: true, // 是否支持复制
            ellipsis: true, // 是否支持缩略
            search: true,  //显示搜索表单
            align: 'center',
            sorter: (a, b) => a.vipIp - b.vipIp,
        },
        {
            title: '会员卡号',
            dataIndex: 'vipNumber',
            search: true, //是否显示搜索表单，传入对象时为搜索表单的配置
            align: 'center',
            sorter: (a, b) => a.vipNumber - b.vipNumber,
        },
        {
            title: '会员卡类型',
            dataIndex: 'vipType',
            align: 'center',
            search: true,  //显示搜索表单
            ellipsis: true, // 是否支持缩略
            filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
            onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选

            valueEnum:{
                1: { text: '年卡', },
                2: { text: '月卡', },
                3: { text: '季卡', },
                4: { text: '周卡', },
                5: { text: '次卡',  },
                6: { text: '半年卡', },
            },
            render(_,record){
                const { vipType } = record;
                let _typestr = ''
                if(vipType==1) _typestr="年卡"
                if(vipType==2) _typestr="月卡"
                if(vipType==3) _typestr="季卡"
                if(vipType==4) _typestr="周卡"
                if(vipType==5) _typestr="次卡"
                if(vipType==6) _typestr="半年卡"
                return ( 
                <div>{_typestr}</div>
                )
            }
        },
        {
            title: '会员卡状态',
            dataIndex: 'vipStae',
            align: 'center',
            ellipsis: true, // 是否支持缩略
            search: true,  //不显示搜索表单
            filters: true,
            onFilter: true,
            valueEnum:{
                1: { text: '可用', status: 'Success' },
                2: { text: '不可用', status: 'Error' },
            },
            render(_,record){
                const { vipStae } = record;
                let _typestr = ''
                if(vipStae==1) _typestr="可用"
                if(vipStae==2) _typestr="不可用"
                
                return ( 
                <div>{_typestr}</div>
                )
            }
        },
        {
            title: '会员卡到期时间',
            dataIndex: 'endTime',
            align: 'center',
            sorter: (a, b) => a.endTime - b.endTime,
            search: false,  //显示搜索表单
            ellipsis: true, // 是否支持缩略
            render(_, record) {
                const { endTime } = record;
 
                let _birthday = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
                return (
                    <div>{_birthday}</div>
                )
            },
        },
        {
            title: '会员卡积分',
            dataIndex: 'vipIntegral',
            align: 'center',
            ellipsis: true, // 是否支持缩略
            search: true,  //不显示搜索表单
            sorter: (a, b) => a.vipIntegral - b.vipIntegral,
        
        },

        {
            title: '会员卡折后价格',
            dataIndex: 'vipQian',
            align: 'center',
            ellipsis: true, // 是否支持缩略
            search: false,  //不显示搜索表单
            sorter: (a, b) => a.vipQian - b.vipQian,
        },
        {
            title: '会员卡价格',
            dataIndex: 'vipMoney',
            align: 'center',
            ellipsis: true, // 是否支持缩略
            search: true,  //不显示搜索表单
            sorter: (a, b) => a.vipMoney - b.vipMoney,
        },
        {
            title: '会员卡有效天数',
            dataIndex: 'vipDays',
            align: 'center',
            ellipsis: true, // 是否支持缩略
            search: false,  //不显示搜索表单
            sorter: (a, b) => a.vipDays - b.vipDays,
        },
        {
            title: '会员卡可使用次数',
            dataIndex: 'vipCiShu',
            align: 'center',
            ellipsis: true, // 是否支持缩略
            search: false,  //不显示搜索表单
            sorter: (a, b) => a.vipCiShu - b.vipCiShu,
        },
        {
            title: '操作',
            valueType: 'option',
            align: 'center',
            //text:未知 record:行内容 san:第几行,从0开始 action:未知
            render: (text, record, san, action) => [
                <a onClick={() => {
                    setShowEditModal(true);

                    if(record.vipImg === null ){
						setGetCover('')
					} else{
						setGetCover( record.vipImg);
					}
                    // 把表单数据传入弹窗
                    //setFieldsValue设置表单的值(form表单)
                    editFrom.current.setFieldsValue(record)
                }}>
                    编辑
                </a>,
                <Popconfirm
                    title="是否删除数据？"
                    okText="是"
                    cancelText="否"
                    onConfirm={async () => {
                        const resTow = await cardDelete( {
                            vipIp: record.vipIp,
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
                    <a>删除</a>
                </Popconfirm>,
                <DrawerForm
                    // DrawerForm没有modalProps={{onCancel: () => {}}}取消时触发
                    width="800px"
                    title="全部数据"
                    trigger={
                        <a type="primary" >
                            查看
                        </a>
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
                        <Descriptions.Item label="会员卡编号">
                            <Field text={record.vipIp} valueType="digit" />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡号">
                            <Field text={record.vipNumber} valueType="text" />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡到期时间">
                            <Field 
                                text={record.endTime} 
                                valueType="text" 
                                render={(Time,b)=> {
                                    let _birthday = dayjs(Time).format('YYYY-MM-DD HH:mm:ss');
                                    return (
                                        <div>{_birthday}</div>
                                    )
                                }}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡类型">
                            <Field 
                                text={record.vipType} 
                                valueType="vipType" 
                                render={(vipType,b)=> {
                                    let _typestr = ''
                                    if (vipType == 1) _typestr = "年卡"
                                    if (vipType == 2) _typestr = "月卡"
                                    if (vipType == 3) _typestr = "季卡"
                                    if (vipType == 4) _typestr = "周卡"
                                    if (vipType == 5) _typestr = "次卡"
                                    if (vipType == 6) _typestr = "半年卡"
                                    return (
                                        <div>{_typestr}</div>
                                    )
                                }}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡积分">
                            <Field text={record.vipIntegral} valueType="text" />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡折后价格">
                            <Field text={record.vipQian} valueType="money" />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡价格">
                            <Field text={record.vipMoney} valueType="money" />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员状态">
                            <Field 
                                text={record.vipStae} 
                                valueType="spendItem" 
                                render={(vip,b)=> {
                                    let _typestr = ''
                                    if (vip == 1) _typestr = "可用"
                                    if (vip == 2) _typestr = "不可用"
                                    return (
                                        <div>{_typestr}</div>
                                    )
                                }}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡图片">
                            <Field text={record.vipImg} valueType="image" />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡有效天数">
                            <Field text={record.vipDays} valueType="text" />
                        </Descriptions.Item>
                        <Descriptions.Item label="会员卡可使用次数">
                            <Field text={record.vipCiShu} valueType="text" />
                        </Descriptions.Item>

                    </Descriptions>
                </DrawerForm>,
            ],
        },
  
    ];
    const jobState = [
        {
            value: 1,
            label: '可用',
        },
        {
            value: 2,
            label: '不可用'
        }
    ];
    const jobType = [
        {
            value: 1,
            label: '年卡',
        },
        {
            value: 2,
            label: '月卡',
        },
        {
            value: 3,
            label: '季卡',
        },
        {
            value: 4,
            label: '周卡',
        },
        {
            value: 5,
            label: '次卡',
        },
        {
            value: 6,
            label: '半年卡',
        },
    ];

    return (
        <PageContainer>
            <ProTable
                // 渲染表单数据第一行
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
                headerTitle="会员卡管理表格"
                //行的 key，一般是行 id
                rowKey="vipId"
                request={async (params) => {
                    //根据搜索
                    const { pageSize,current,vipIp,vipIntegral,vipNumber,vipType,vipMoney,vipStae}  = params;
                    //查询对象属性值
                    const postData = {}
                    if(vipIp) postData.vipIp = vipIp;
                    if(vipIntegral) postData.vipIntegral = vipIntegral;
                    if(vipNumber) postData.vipNumber = vipNumber
                    if(vipType) postData.vipType = vipType
                    if(vipMoney) postData.vipMoney = vipMoney
                    if(vipStae) postData.vipStae = vipStae
                    const resOne = await cardfindAll({
                        page: current,
                        limit:pageSize,
                        ...postData
                    })
                    //res接口有多少条数据
                    const { success,rows,count } = resOne.res;
                    const total = count;
                    const data = rows;
                    
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
                        title="添加会员卡信息"
                        trigger={
                        <Button type="primary">
                            <PlusOutlined />
                            添加会员卡
                        </Button>
                        }
                        modalProps={{
                            onCancel: () => console.log('run'),
                        }}
                        onVisibleChange={() => {
                            // 刷新
                            actionRef.current.reload();
                        }}
                        onFinish={async (values) => {
                            // const dataTime = dayjs(values.endTime).valueOf();
                            const res1 = await  cardCreate({
                                // endTime: dataTime,
                                vipStae: values.vipStae,
                                vipIntegral: values.vipIntegral,
                                vipType: values.vipType,
                                vipQian: values.vipQian,
                                vipMoney: values.vipMoney,
                                vipImg: coverPhoto.toString(),
                                // vipDays: values.vipDays,
                                vipCiShu: values.vipCiShu,
                                
                            })
                            if(res1.success==true){
                                message.success(res1.info);
                                return true
                            }
                            else {
                                message.warning(res1.errorMessage);
                                return false
                            }
                        }}
                    >
                        <ProForm.Group>
							<Upload
								action="http://127.0.0.1:7001/common/upload"
								listType="picture-card"
								maxCount={1}
                                name="vipImg"
								onChange={
									async (val) => {
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
                            <ProFormSelect width="md" name='vipType' label="会员卡类型"  options={jobType} onChange={(vipType,b)=>{
                                if( vipType ===5 ) setShowCi(vipType)
                            }}/>
                            <ProFormSelect width="md" name="vipStae" label="会员卡的状态" options={jobState} />
                        </ProForm.Group>

                        <ProForm.Group>
                            <ProFormText width="md" name="vipMoney" label="会员卡价格" placeholder="请输入会员卡价格" />
                            <ProFormText width="md" name="vipQian" label="会员卡折后价格" placeholder="请输入会员卡折后价格" />
                        </ProForm.Group>
                        <ProForm.Group>
                            {/* <ProFormText width="md" name="vipDays" label="会员卡有效天数" placeholder="请输入会员卡有效天数" /> */}
                            {showCi === 5 ? <ProFormText width="md" name="vipCiShu" label="会员卡可使用次数" placeholder="请输入会员卡可使用次数" /> : ''}
                            {/* <ProFormText width="md" name="vipCiShu" label="会员卡可使用次数" placeholder="请输入会员卡可使用次数" /> */}
                        </ProForm.Group>
                        <ProForm.Group>
                            {/* <ProFormDateTimePicker width="md" name="endTime" label="会员卡到期时间" placeholder="请输入会员卡到期时间" /> */}
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText width="md" name="vipIntegral" label="会员卡积分" placeholder="请输入会员卡积分" />
                        </ProForm.Group>
                    </ModalForm>
                ]}
            />
            <ModalForm
                title="修改商品订单信息"
                //弹窗是否打开
                visible={showEditModal}
                //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
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
                    const dataTime = dayjs(values.endTime).valueOf();
                    const resUpdate = await  cardUpdate({
                        vipIp:values.vipIp,
                        vipNumber: values.vipNumber,
                        // endTime: dataTime,
                        vipStae: values.vipStae,
                        vipIntegral: values.vipIntegral,
                        vipType: values.vipType,
                        vipQian: values.vipQian,
                        vipMoney: values.vipMoney,
                        vipImg: getCover.toString(),
                        // vipDays: values.vipDays,
                        vipCiShu: values.vipCiShu,
                    })
                    
                    const { success} = resUpdate;
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
					<Upload
						action="http://127.0.0.1:7001/common/upload"
						listType="picture-card"
						fileList={showCover}
                        name="vipImg"
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
						{'+ 会员卡图片'}
					</Upload>
				</ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="vipIp" label="会员卡编号" disabled placeholder="请输入会员卡编号" />
                    <ProFormText width="md" name="vipNumber" label="会员卡号" disabled placeholder="请输入会员卡号" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormSelect width="md" name='vipType' label="会员卡类型"  options={jobType} />
                    <ProFormSelect width="md" name="vipStae" label="会员卡的状态" options={jobState} />
                </ProForm.Group>
                <ProForm.Group>
                    {/* <ProFormDateTimePicker width="md" name="endTime" label="会员卡到期时间" placeholder="请输入会员卡到期时间" /> */}
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="vipIntegral" label="会员卡积分" placeholder="请输入会员卡积分" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="vipMoney" label="会员卡价格" placeholder="请输入会员卡价格" />
                    <ProFormText width="md" name="vipQian" label="会员卡折后价格" placeholder="请输入会员卡折后价格" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="vipCiShu" label="会员卡可使用次数" placeholder="请输入会员卡可使用次数" />
                </ProForm.Group>
            </ModalForm>
        </PageContainer>
    )
}

export default CourseCard;
