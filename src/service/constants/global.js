// import { post } from '../request'
/**
 * @description 获取省份
 */
export const getAllParentId = (params = {}) => {
  // return post('/system/company-save-gold/getAllParentId', params)
  console.log('获取省份', params)
  return new Promise((resolve) => {
    const res = {
      code: 1,
      data: [
        {
          areaId: 1,
          parentAreaId: 0,
          name: '北京市',
          code: '110000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'B',
          allPinyin: 'BEIJINGSHI'
        },
        {
          areaId: 7838,
          parentAreaId: 0,
          name: '天津市',
          code: '120000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'T',
          allPinyin: 'TIANJINSHI'
        },
        {
          areaId: 13755,
          parentAreaId: 0,
          name: '河北省',
          code: '130000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HEBEISHENG'
        },
        {
          areaId: 70304,
          parentAreaId: 0,
          name: '山西省',
          code: '140000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHANXISHENG'
        },
        {
          areaId: 93679,
          parentAreaId: 0,
          name: '内蒙古自治区',
          code: '150000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'N',
          allPinyin: 'NEIMENGGUZIZHIQU'
        },
        {
          areaId: 109551,
          parentAreaId: 0,
          name: '辽宁省',
          code: '210000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'L',
          allPinyin: 'LIAONINGSHENG'
        },
        {
          areaId: 127593,
          parentAreaId: 0,
          name: '吉林省',
          code: '220000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'J',
          allPinyin: 'JILINSHENG'
        },
        {
          areaId: 140555,
          parentAreaId: 0,
          name: '黑龙江省',
          code: '230000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HEILONGJIANGSHENG'
        },
        {
          areaId: 156358,
          parentAreaId: 0,
          name: '上海市',
          code: '310000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHANGHAISHI'
        },
        {
          areaId: 163006,
          parentAreaId: 0,
          name: '江苏省',
          code: '320000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'J',
          allPinyin: 'JIANGSUSHENG'
        },
        {
          areaId: 186514,
          parentAreaId: 0,
          name: '浙江省',
          code: '330000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'Z',
          allPinyin: 'ZHEJIANGSHENG'
        },
        {
          areaId: 213486,
          parentAreaId: 0,
          name: '安徽省',
          code: '340000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'A',
          allPinyin: 'ANHUISHENG'
        },
        {
          areaId: 233603,
          parentAreaId: 0,
          name: '福建省',
          code: '350000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'F',
          allPinyin: 'FUJIANSHENG'
        },
        {
          areaId: 252317,
          parentAreaId: 0,
          name: '江西省',
          code: '360000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'J',
          allPinyin: 'JIANGXISHENG'
        },
        {
          areaId: 276166,
          parentAreaId: 0,
          name: '山东省',
          code: '370000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHANDONGSHENG'
        },
        {
          areaId: 340284,
          parentAreaId: 0,
          name: '河南省',
          code: '410000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HENANSHENG'
        },
        {
          areaId: 395434,
          parentAreaId: 0,
          name: '湖北省',
          code: '420000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HUBEISHENG'
        },
        {
          areaId: 424438,
          parentAreaId: 0,
          name: '湖南省',
          code: '430000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HUNANSHENG'
        },
        {
          areaId: 456130,
          parentAreaId: 0,
          name: '广东省',
          code: '440000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'G',
          allPinyin: 'GUANGDONGSHENG'
        },
        {
          areaId: 484849,
          parentAreaId: 0,
          name: '广西壮族自治区',
          code: '450000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'G',
          allPinyin: 'GUANGXIZHUANGZUZIZHIQU'
        },
        {
          areaId: 502920,
          parentAreaId: 0,
          name: '海南省',
          code: '460000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HAINANSHENG'
        },
        {
          areaId: 506487,
          parentAreaId: 0,
          name: '重庆市',
          code: '500000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'Z',
          allPinyin: 'ZHONGQINGSHI'
        },
        {
          areaId: 518811,
          parentAreaId: 0,
          name: '四川省',
          code: '510000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SICHUANSHENG'
        },
        {
          areaId: 556539,
          parentAreaId: 0,
          name: '贵州省',
          code: '520000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'G',
          allPinyin: 'GUIZHOUSHENG'
        },
        {
          areaId: 576088,
          parentAreaId: 0,
          name: '云南省',
          code: '530000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'Y',
          allPinyin: 'YUNNANSHENG'
        },
        {
          areaId: 592552,
          parentAreaId: 0,
          name: '西藏自治区',
          code: '540000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'X',
          allPinyin: 'XIZANGZIZHIQU'
        },
        {
          areaId: 598913,
          parentAreaId: 0,
          name: '陕西省',
          code: '610000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHANXISHENG'
        },
        {
          areaId: 620647,
          parentAreaId: 0,
          name: '甘肃省',
          code: '620000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'G',
          allPinyin: 'GANSUSHENG'
        },
        {
          areaId: 639848,
          parentAreaId: 0,
          name: '青海省',
          code: '630000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'Q',
          allPinyin: 'QINGHAISHENG'
        },
        {
          areaId: 645040,
          parentAreaId: 0,
          name: '宁夏回族自治区',
          code: '640000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'N',
          allPinyin: 'NINGXIAHUIZUZIZHIQU'
        },
        {
          areaId: 648242,
          parentAreaId: 0,
          name: '新疆维吾尔自治区',
          code: '650000000000',
          level: 1,
          isEnable: 10,
          initialPinyin: 'X',
          allPinyin: 'XINJIANGWEIWUERZIZHIQU'
        }
      ]
    }
    resolve(res)
  })
}
/**
 * @description 获取下级城市区域
 */
export const getCityByParentId = (parentId = '', params = {}) => {
  console.log('parentId', parentId, params)
  // const url = `/system/company-save-gold/getCityByParentId?parentId=${parentId}`
  // return post(url, params)
  return new Promise((resolve) => {
    const res = {
      code: 1,
      msg: '成功',
      data: [
        {
          areaId: 456131,
          parentAreaId: 456130,
          name: '广州市',
          code: '440100000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'G',
          allPinyin: 'GUANGZHOUSHI'
        },
        {
          areaId: 459164,
          parentAreaId: 456130,
          name: '韶关市',
          code: '440200000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHAOGUANSHI'
        },
        {
          areaId: 460754,
          parentAreaId: 456130,
          name: '深圳市',
          code: '440300000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHENZHENSHI'
        },
        {
          areaId: 461629,
          parentAreaId: 456130,
          name: '珠海市',
          code: '440400000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'Z',
          allPinyin: 'ZHUHAISHI'
        },
        {
          areaId: 462006,
          parentAreaId: 456130,
          name: '汕头市',
          code: '440500000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHANTOUSHI'
        },
        {
          areaId: 463173,
          parentAreaId: 456130,
          name: '佛山市',
          code: '440600000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'F',
          allPinyin: 'FOSHANSHI'
        },
        {
          areaId: 464038,
          parentAreaId: 456130,
          name: '江门市',
          code: '440700000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'J',
          allPinyin: 'JIANGMENSHI'
        },
        {
          areaId: 465469,
          parentAreaId: 456130,
          name: '湛江市',
          code: '440800000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'Z',
          allPinyin: 'ZHANJIANGSHI'
        },
        {
          areaId: 467599,
          parentAreaId: 456130,
          name: '茂名市',
          code: '440900000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'M',
          allPinyin: 'MAOMINGSHI'
        },
        {
          areaId: 469650,
          parentAreaId: 456130,
          name: '肇庆市',
          code: '441200000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'Z',
          allPinyin: 'ZHAOQINGSHI'
        },
        {
          areaId: 471317,
          parentAreaId: 456130,
          name: '惠州市',
          code: '441300000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HUIZHOUSHI'
        },
        {
          areaId: 472765,
          parentAreaId: 456130,
          name: '梅州市',
          code: '441400000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'M',
          allPinyin: 'MEIZHOUSHI'
        },
        {
          areaId: 475163,
          parentAreaId: 456130,
          name: '汕尾市',
          code: '441500000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'S',
          allPinyin: 'SHANWEISHI'
        },
        {
          areaId: 476139,
          parentAreaId: 456130,
          name: '河源市',
          code: '441600000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'H',
          allPinyin: 'HEYUANSHI'
        },
        {
          areaId: 477699,
          parentAreaId: 456130,
          name: '阳江市',
          code: '441700000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'Y',
          allPinyin: 'YANGJIANGSHI'
        },
        {
          areaId: 478645,
          parentAreaId: 456130,
          name: '清远市',
          code: '441800000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'Q',
          allPinyin: 'QINGYUANSHI'
        },
        {
          areaId: 479981,
          parentAreaId: 456130,
          name: '东莞市',
          code: '441900000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'D',
          allPinyin: 'DONGGUANSHI'
        },
        {
          areaId: 480627,
          parentAreaId: 456130,
          name: '中山市',
          code: '442000000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'Z',
          allPinyin: 'ZHONGSHANSHI'
        },
        {
          areaId: 480937,
          parentAreaId: 456130,
          name: '潮州市',
          code: '445100000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'C',
          allPinyin: 'CHAOZHOUSHI'
        },
        {
          areaId: 482025,
          parentAreaId: 456130,
          name: '揭阳市',
          code: '445200000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'J',
          allPinyin: 'JIEYANGSHI'
        },
        {
          areaId: 483791,
          parentAreaId: 456130,
          name: '云浮市',
          code: '445300000000',
          level: 2,
          isEnable: 10,
          initialPinyin: 'Y',
          allPinyin: 'YUNFUSHI'
        }
      ],
      traceId: '2ca5c9d9a6134786878543ffe895a8cf'
    }
    resolve(res)
  })
}
