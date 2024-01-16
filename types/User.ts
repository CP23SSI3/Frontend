export type User = {
  createdDate: Date
  email: string
  firstname: string
  lastname: string
  lastActive: Date
  lastUpdate: Date
  password: string
  phoneNumber: string
  role: string
  userId: string
  username: string
}

// {
//   "status": 200,
//   "message": "The user's list is successfully sended.",
//   "data": {
//       "number": 0,
//       "size": 10,
//       "totalPages": 1,
//       "totalElements": 3,
//       "content": [
//           {
//               "address": {
//                   "addressId": "0e17bf21-b0bc-41e3-90f3-000c65707ddc",
//                   "area": "ติดรฟฟ ช่องนนทรี",
//                   "city": "กรุงเทพ",
//                   "country": "ประเทศไทย",
//                   "district": "ยานนาวา",
//                   "latitude": 13.69631100,
//                   "longitude": 100.54631600,
//                   "postalCode": "10120",
//                   "subDistrict": "ช่องนนทรี"
//               },
//               "company": {
//                   "address": {
//                       "addressId": "9346a466-4a82-4037-ab00-72ba24fa50bf",
//                       "area": "17 ถนนจันทน์",
//                       "city": "กรุงเทพ",
//                       "country": "ประเทศไทย",
//                       "district": "สาทร",
//                       "latitude": 13.70904330,
//                       "longitude": 100.51716750,
//                       "postalCode": "10120",
//                       "subDistrict": "ทุ่งวัดดอน"
//                   },
//                   "compDesc": "This is a compDesc as an example. Hope we will be able to make a move soon",
//                   "compId": "8e20782f-2807-4f13-a11e-0fb9ff955488",
//                   "compLogoKey": "https://www.google.com",
//                   "compName": "Test company",
//                   "compUrl": "https://www.google.com",
//                   "createdDate": "2023-10-04T13:30:00",
//                   "defaultWelfare": "Lorem for the welfare for this company, This is the example script only",
//                   "lastActive": "2023-10-04T13:30:00",
//                   "lastUpdate": "2023-10-04T13:30:00"
//               },
//               "createdDate": "2023-10-04T13:30:00",
//               "email": "comp@gmail.com",
//               "firstname": "compfirstname",
//               "lastname": "complastname",
//               "lastActive": "2023-10-04T13:30:00",
//               "lastUpdate": "2023-10-04T13:30:00",
//               "password": "comppassword",
//               "phoneNumber": "0123456789",
//               "role": "COMPANY",
//               "userId": "8e20782f-2807-4f13-a11e-0fb9ff955488",
//               "username": "testcompany"
//           },
//           {
//               "address": {
//                   "addressId": "fc1e7058-b373-4abd-aad0-8140f9658652",
//                   "area": "57 หมู่ 123 ซอย 5 ",
//                   "city": "กรุงเทพ",
//                   "country": "ประเทศไทย",
//                   "district": "ตลิ่งชัน",
//                   "latitude": 13.78852300,
//                   "longitude": 100.44582200,
//                   "postalCode": "10170",
//                   "subDistrict": "ตลิ่งชัน"
//               },
//               "company": null,
//               "createdDate": "2023-10-04T13:30:00",
//               "email": "admin@gmail.com",
//               "firstname": "adminfirstname",
//               "lastname": "adminlastname",
//               "lastActive": "2023-10-04T13:30:00",
//               "lastUpdate": "2023-10-04T13:30:00",
//               "password": "adminpassword",
//               "phoneNumber": "0123456789",
//               "role": "ADMIN",
//               "userId": "9c2e4bd8-a897-4bce-9a63-5267283d6e30",
//               "username": "testadmin"
//           },
//           {
//               "address": {
//                   "addressId": "df292024-0858-4590-af5f-f92fd950d1df",
//                   "area": "357/12 ตึกแถว",
//                   "city": "กรุงเทพ",
//                   "country": "ประเทศไทย",
//                   "district": "บางขุนเทียน",
//                   "latitude": 13.61833700,
//                   "longitude": 100.40139200,
//                   "postalCode": "10150",
//                   "subDistrict": "ทุแสมดำ"
//               },
//               "company": null,
//               "createdDate": "2023-10-04T13:30:00",
//               "email": "user@gmail.com",
//               "firstname": "userfirstname",
//               "lastname": "userlastname",
//               "lastActive": "2023-10-04T13:30:00",
//               "lastUpdate": "2023-10-04T13:30:00",
//               "password": "userpassword",
//               "phoneNumber": "0123456789",
//               "role": "USER",
//               "userId": "c6703236-53ec-45a7-ba7d-efed13fcf1ef",
//               "username": "testuser"
//           }
//       ]
//   }
// }
