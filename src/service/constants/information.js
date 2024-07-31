// import { post } from '../request'
/**
 * @description 获取企业基本信息
 */
export const getCompanyInfo = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('getCompanyInfo模拟数据', params)
      const data = {
        companyId: '168xxxxxxxx',
        companyCode: 'c000000033',
        mallMenuGroupId: '111xxxx',
        companyShortName: 'xxx科技有限公司',
        operateTypeIndex: 30,
        operateTypeIndexName: '展厅',
        provinceId: 456130,
        cityId: 460754,
        areaId: 460756,
        streetId: 460800,
        addr: 'xxx街道xxx号xxx总部大厦A座',
        companyName: 'xxx科技有限公司',
        contactName: '张三',
        contactMobile: '13333333333',
        contactEmail: 'xxxx@qq.com',
        companyType: 20,
        companyTypeName: '企业',
        businessLicenseType: 10,
        businessLicenseUrl: 'https://aliyuncdn.antdv.com/vue.png',
        certificateType: 10,
        certificateFrontUrl:
          'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        certificateReverseUrl:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        legalPersonName: '张三',
        certificateNumber: '421011199073042222',
        certificateValidTimeStart: '2023.09.01',
        certificateValidTimeEnd: '2023.09.30',
        isCertificateValidPerpetual: 10,
        legalPersonMobile: '18111111111',
        auditStatus: 20,
        auditStatusName: '审核通过',
        status: 10,
        statusName: '已激活',
        authStatus: 1,
        authStatusName: '已认证',
        updateSystemUserId: '222xxx33xxx',
        updateSystemUserName: '更新人名字',
        updateSystemTime: 1693993029,
        createSystemUserId: '3333xxxx3222',
        createSystemUserName: '超级管理员',
        createTime: 1691062710,
        createType: 20,
        businessTypeList: [],
        socialCreditIdentifier: '9144030x33x2dd71H',
        operateProvinceId: 456130,
        operateCityId: 460754,
        operateAreaId: 460756,
        operateStreetId: 460800,
        operateAddr: 'xxx街道xxx社区xxx街道xxx栋xxx层xxx单元xxx号'
      }
      resolve({
        code: 1,
        data: data
      })
    }, 1000)
    // return post('/api/getCompanyInfo', params)
  })
}

/**
 * @description 上传图片
 */
export const uploadImg = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('uploadImg模拟数据', params)
      const data =
        'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
      resolve({
        code: 1,
        data: data,
        msg: '上传成功'
      })
    }, 1500)
  })
  // return post('/api/uploadImg', params)
}
