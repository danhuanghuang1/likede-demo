<template>
  <div>
    <UploadExcel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employess'
export default {
  name: 'HrsaasIndex',

  data() {
    return {}
  },
  // header  ['手机号', '姓名', '入职日期', '转正日期', '工号']
  // results  [{ '入职日期': 43678, '姓名': '高大山', '工号': 20089, '手机号': 13041131879, '转正日期': 43678 }]

  // 后端接口要的数据：[{ 'timeOfEntry': 43678, 'username': '高大山', 'workNumber': 20089, 'mobile': 13041131879, 'correctionTime': 43678 }]

  // 实现批量新增员工，将拿到的格式重新格式化，key关键词不一致
  methods: {
    async handleSuccess({ header, results }) {
      //   前面是现有数据的名字，后面是要更改的数据名字
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }

      const arr = []
      results.forEach((item) => {
        // console.log(item) // { '入职日期': 43678, '姓名': '高大山', '工号': 20089, '手机号': 13041131879, '转正日期': 43678 }
        const userinfo = {}
        //  Object.keys(item) // ['入职日期', '姓名', '工号','手机号',  ]
        Object.keys(item).forEach((key) => {
          // key 中文
          // userRelations[key] 英文
          // userinfo.timeOfEntry
          // key 对应的值 item[key]
          //   增加新属性，
          // 将更改的项放进空对象里面
          userinfo[userRelations[key]] = item[key]
        })
        arr.push(userinfo)
      })
      await importEmployee(arr)
      this.$message.success('导入成功')
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped></style>
