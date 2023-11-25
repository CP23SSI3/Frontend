import * as yup from 'yup'

yup.setLocale({
  // mixed: {
  //   required: 'โปรดระบุ ${path}'
  // },
  string: {
    email: 'email ไม่ถูกต้อง',
    min: 'กรุณากรอกข้อมูลอย่างน้อย ${min} ตัวอักษร',
    max: 'เกิน ${max} ตัวอักษร'
  },
  number: {
    positive: 'กรุณากรอกเลขจำนวนเต็มบวก',
    integer: 'กรุณากรอกเลขจำนวนเต็ม'
  }
})

export default yup
